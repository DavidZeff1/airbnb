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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("💰 Session completed:", session.id, session.metadata);
    const property_id = session.metadata?.property_id;
    const guest_id = session.metadata?.guest_id;
    const check_in_date = session.metadata?.check_in_date;
    const check_out_date = session.metadata?.check_out_date;
    const total_price = session.amount_total! / 100;

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
    } catch (dbError) {
      console.error("DB insert failed after payment:", dbError);
    }
  }

  return NextResponse.json({ received: true });
}
