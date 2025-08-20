export interface Booking {
  id: number;
  property_id: number;
  guest_id: number;
  check_in_date: string; // ISO date string from database
  check_out_date: string; // ISO date string from database
  total_price: string; // Decimal comes as string from database
  status: string | null;
  created_at: string | null; // ISO timestamp string
  updated_at: string | null; // ISO timestamp string
  payment_status: string | null;
  payment_intent_id: string | null;
  host_payout_amount: string | null; // Decimal comes as string from database
  host_payout_status: string | null;
  image_url: string | null;
}
