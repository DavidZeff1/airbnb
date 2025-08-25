import { NextResponse } from "next/server";
import sql from "@/app/lib/db";

export async function GET() {
  const propertyTypes = await sql`SELECT * FROM property_types`;
  return NextResponse.json(propertyTypes);
}
