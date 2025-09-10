import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import sql from "@/app/lib/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.userId;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await req.formData();
    const payloadStr = form.get("payload")?.toString();
    if (!payloadStr) {
      return NextResponse.json({ error: "Missing payload" }, { status: 400 });
    }

    const payload = JSON.parse(payloadStr) as {
      title: string;
      description: string;
      address: string;
      bedrooms: number;
      bathrooms: number;
      max_guests: number;
      base_price: number;
      property_type_id: number;
      amenityIds: number[];
      countryName?: string;
      countryCode?: string;
      cityName?: string;
      townName?: string;
      countryGeonameId?: number;
      cityGeonameId?: number;
      townGeonameId?: number;
    };

    // Validate required fields
    if (!payload.title || !payload.description || !payload.address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!payload.countryName || !payload.cityName || !payload.townName) {
      return NextResponse.json(
        { error: "Location information is required" },
        { status: 400 }
      );
    }

    const images = form.getAll("images") as File[];
    if (!images.length) {
      return NextResponse.json(
        { error: "No images uploaded" },
        { status: 400 }
      );
    }

    // Start database transaction
    await sql`BEGIN`;

    try {
      // 1) Find or create country
      let [country] = await sql`
  SELECT id FROM countries WHERE geoname_id = ${payload.countryGeonameId}
`;

      if (!country) {
        [country] = await sql`
    INSERT INTO countries (name, country_code, geoname_id)
    VALUES (${payload.countryName}, ${payload.countryCode || ""}, ${
          payload.countryGeonameId
        })
    RETURNING id
  `;
      }

      // 2) Find or create city
      let [city] = await sql`
  SELECT id FROM cities WHERE geoname_id = ${payload.cityGeonameId}
`;

      if (!city) {
        [city] = await sql`
    INSERT INTO cities (name, country_id, geoname_id)
    VALUES (${payload.cityName}, ${country.id}, ${payload.cityGeonameId})
    RETURNING id
  `;
      }

      // 3) Find or create town
      let [town] = await sql`
  SELECT id FROM towns WHERE geoname_id = ${payload.townGeonameId}
`;

      if (!town) {
        [town] = await sql`
    INSERT INTO towns (name, city_id, geoname_id)
    VALUES (${payload.townName}, ${city.id}, ${payload.townGeonameId})
    RETURNING id
  `;
      }

      // 4) Upload images to Cloudinary
      async function uploadToCloudinary(file: File): Promise<string> {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return await new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "placepal/properties",
              resource_type: "image",
              transformation: [
                { width: 1200, height: 800, crop: "limit" },
                { quality: "auto:good" },
              ],
            },
            (err, result) => {
              if (err || !result)
                return reject(err || new Error("Upload error"));
              resolve(result.secure_url);
            }
          );
          stream.end(buffer);
        });
      }

      const imageUrls = await Promise.all(images.map(uploadToCloudinary));

      // 5) Update user to host status
      await sql`UPDATE users SET is_host = true WHERE id = ${userId}`;

      // 6) Insert property
      const [property] = await sql`
        INSERT INTO properties (
          host_id, property_type_id, town_id,
          title, description, address,
          bedrooms, bathrooms, max_guests, base_price
        )
        VALUES (
          ${userId}, ${payload.property_type_id}, ${town.id},
          ${payload.title}, ${payload.description}, ${payload.address},
          ${payload.bedrooms}, ${payload.bathrooms},
          ${payload.max_guests}, ${payload.base_price}
        )
        RETURNING id
      `;

      const propertyId = property.id;

      // 7) Insert images
      for (const url of imageUrls) {
        await sql`
          INSERT INTO property_images (property_id, image_url)
          VALUES (${propertyId}, ${url})
        `;
      }

      // 8) Insert amenities if any
      if (payload.amenityIds?.length) {
        for (const amenityId of payload.amenityIds) {
          // Check if amenity exists before inserting
          const [amenityExists] = await sql`
            SELECT id FROM amenities WHERE id = ${amenityId}
          `;

          if (amenityExists) {
            await sql`
              INSERT INTO property_amenities (property_id, amenity_id)
              VALUES (${propertyId}, ${amenityId})
              ON CONFLICT (property_id, amenity_id) DO NOTHING
            `;
          }
        }
      }

      // Commit transaction
      await sql`COMMIT`;

      return NextResponse.json(
        {
          success: true,
          propertyId,
          message: "Property created successfully",
        },
        { status: 201 }
      );
    } catch (error) {
      await sql`ROLLBACK`;
      throw error;
    }
  } catch (err: unknown) {
    console.error("Host register error:", err);
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
