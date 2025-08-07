import sql from "@/app/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";

const citySchema = z.object({
  city_id: z.number(),
  city_name: z.string(),
  description: z.string().nullable(),
  country_id: z.number(),
  country_name: z.string(),
  image_url: z.string(),
});

const citiesSchema = z.array(citySchema);

export async function GET() {
  if (!sql) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  try {
    const rawCities = await sql`
      SELECT 
        c.id as city_id,
        c.name as city_name,
        c.description,
        countries.id as country_id,
        countries.name as country_name,
        ci.image_url
      FROM cities c 
      JOIN countries ON c.country_id = countries.id
      JOIN city_images ci ON c.id = ci.city_id
    `;

    const cities = citiesSchema.parse(rawCities);
    return NextResponse.json(cities);
  } catch (error) {
    console.error("Database query error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data format", details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
