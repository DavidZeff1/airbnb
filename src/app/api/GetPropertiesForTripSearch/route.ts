import sql from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const result = await sql`
      SELECT 
        p.id property_id, 
        p.title property_title, 
        p.latitude property_latitude, 
        p.longitude property_longitude, 
        p.base_price property_price, 
        pi.image_url property_image_url 
      FROM properties p 
      JOIN towns t ON p.town_id = t.id 
      JOIN cities c ON c.id = t.city_id 
      JOIN property_images pi ON pi.property_id = p.id 
      LEFT JOIN property_blocked_dates pbd ON pbd.property_id = p.id 
      WHERE c.id = ${Number(searchParams.get("destination-id"))} 
      AND p.max_guests > ${Number(searchParams.get("adults"))}
    `;

    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
