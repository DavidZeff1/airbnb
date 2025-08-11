import sql from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Property ID is required" },
      { status: 400 }
    );
  }

  const propertyId = Number(id);

  try {
    const [property, host, blockedDates, reviews, amenities, images] =
      await Promise.all([
        sql`SELECT 
  p.id AS property_id,
  p.host_id,
  p.property_type_id,
  p.town_id,
  p.title,
  p.description AS property_description,
  p.address,
  p.latitude AS property_latitude,
  p.longitude AS property_longitude,
  p.bedrooms,
  p.bathrooms,
  p.max_guests,
  p.base_price,
  p.cleaning_fee,
  p.security_deposit,
  p.is_active,
  p.min_stay_nights,
  p.max_stay_nights,
  p.created_at AS property_created_at,
  p.updated_at AS property_updated_at,
  
  t.id AS town_id_actual,
  t.name AS town_name,
  t.city_id,
  t.created_at AS town_created_at,
  
  c.id AS city_id_actual,
  c.name AS city_name,
  c.country_id,
  c.latitude AS city_latitude,
  c.longitude AS city_longitude,
  c.description AS city_description,
  c.created_at AS city_created_at,
  
  ctry.id AS country_id_actual,
  ctry.name AS country_name,
  ctry.country_code,
  ctry.created_at AS country_created_at
  
FROM properties p
JOIN towns t ON t.id = p.town_id
JOIN cities c ON c.id = t.city_id
JOIN countries ctry ON ctry.id = c.country_id
WHERE p.id = ${propertyId};`,

        sql`SELECT u.id, u.first_name, u.last_name, u.profile_picture 
          FROM users u 
          JOIN properties p ON u.id = p.host_id 
          WHERE p.id = ${propertyId}`,

        sql`SELECT pbd.* FROM property_blocked_dates pbd 
          WHERE pbd.property_id = ${propertyId}`,

        sql`SELECT r.reviewer_id, r.rating, r.title, r.comment, 
                 u.first_name, u.last_name, u.profile_picture
          FROM reviews r  
          JOIN bookings b ON r.booking_id = b.id 
          JOIN properties p ON p.id = b.property_id 
          JOIN users u ON u.id = r.reviewer_id 
          WHERE p.id = ${propertyId} AND r.reviewed_id = p.host_id`,

        sql`SELECT name, icon
FROM property_amenities pa 
JOIN amenities a ON pa.amenity_id = a.id
JOIN properties p ON p.id = pa.property_id
WHERE p.id = ${propertyId}`,

        sql`Select image_url
FROM property_images pi
JOIN properties p ON pi.property_id = p.id
WHERE p.id = ${propertyId}`,
      ]);

    const result = {
      property: property[0] || null,
      host: host[0] || null,
      blockedDates: blockedDates || [],
      reviews: reviews || [],
      amenities: amenities || [],
      images: images || [],
      metadata: {
        totalReviews: reviews?.length || 0,
        averageRating:
          reviews?.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            : 0,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch property data" },
      { status: 500 }
    );
  }
}
