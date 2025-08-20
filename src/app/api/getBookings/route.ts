import sql from "@/app/lib/db";
import { NextResponse } from "next/server";
import {} from "react";
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const bookings = await sql`
  SELECT DISTINCT ON (bookings.id)
    bookings.*,
    property_images.image_url
  FROM bookings 
  JOIN property_images ON bookings.property_id = property_images.property_id
  WHERE guest_id = ${url.searchParams.get("id")}
  ORDER BY bookings.id, property_images.id
`;
    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { message: "No bookings found" },
        { status: 404 }
      );
    }
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
