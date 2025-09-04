import sql from "@/app/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const ammenities = await sql`SELECT id, name, icon FROM amenities`;
    return NextResponse.json(ammenities);
  } catch (error) {
    console.error("Error fetching ammenities:", error);
    return NextResponse.json(
      { error: "Failed to fetch ammenities" },
      { status: 500 }
    );
  }
}
