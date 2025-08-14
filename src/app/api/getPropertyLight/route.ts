import sql from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const urlObj = new URL(request.url);
  const id = urlObj.searchParams.get("id");

  const result = await sql`SELECT *
                        FROM properties p
                        WHERE id = ${id} `;
  return NextResponse.json(result);
}
