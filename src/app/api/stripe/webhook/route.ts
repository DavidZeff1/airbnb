import { NextResponse } from "next/server";
import Stripe from "stripe";
import sql from "@/app/lib/db";

console.log("🔥 Webhook POST hit");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") as string;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Webhook error", { status: 400 });
  }

  console.log(`📨 Processing event: ${event.id} (${event.type})`);

  // Enhanced idempotency check - check first, then proceed
  try {
    const alreadyProcessed = await sql`
      SELECT 1 FROM stripe_events WHERE event_id = ${event.id}
    `;

    if (alreadyProcessed.length > 0) {
      console.log("⚠️ Event already processed:", event.id);
      return NextResponse.json({ received: true, status: "already_processed" });
    }

    // Immediately mark as processing to prevent race conditions
    await sql`
      INSERT INTO stripe_events (event_id, created_at) 
      VALUES (${event.id}, NOW())
      ON CONFLICT (event_id) DO NOTHING
    `;

    // Verify insertion worked (in case of race condition)
    const insertCheck = await sql`
      SELECT 1 FROM stripe_events WHERE event_id = ${event.id}
    `;

    if (insertCheck.length === 0) {
      console.log(
        "⚠️ Failed to insert event record, possible race condition:",
        event.id
      );
      return NextResponse.json({ received: true, status: "race_condition" });
    }
  } catch (err) {
    console.error("Error checking/inserting event:", err);
    return new NextResponse("Database error", { status: 500 });
  }

  // Process the actual event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("💰 Session completed:", session.id, session.metadata);

    const property_id = session.metadata?.property_id;
    const guest_id = session.metadata?.guest_id;
    const check_in_date = session.metadata?.check_in_date;
    const check_out_date = session.metadata?.check_out_date;
    const total_price = session.amount_total! / 100;

    // Validate required fields
    if (!property_id || !guest_id || !check_in_date || !check_out_date) {
      console.error("Missing required metadata in session:", session.metadata);
      return NextResponse.json({
        received: true,
        status: "error",
        message: "Missing required metadata",
      });
    }

    try {
      await sql`
        INSERT INTO bookings (
          property_id,
          guest_id,
          check_in_date,
          check_out_date,
          total_price,
          status,
          payment_status,
          created_at,
          updated_at
        ) VALUES (
          ${property_id},
          ${guest_id},
          ${check_in_date},
          ${check_out_date},
          ${total_price},
          'confirmed',
          'paid',
          NOW(),
          NOW()
        )
      `;

      console.log("✅ Booking created successfully for event:", event.id);
    } catch (dbError) {
      console.error("DB insert failed after payment:", dbError);
      // Don't return error - event is already marked as processed
      // This prevents webhook retries for DB issues
    }
  }

  return NextResponse.json({ received: true, status: "processed" });
}
