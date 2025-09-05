"use client";
import { Booking } from "../../property/types/types";
import BookingStepsContainer from "./BookingStepsContainer";
import BookingSummaryCardContainer from "./BookingSummaryCardContainer";
import { useSearchParams } from "next/navigation";

export default function MainBookingBody() {
  const params = useSearchParams();
  const [
    check_in_date,
    check_out_date,
    host_id,
    property_id,
    total_price,
    amount_of_nights,
  ] = params.values();

  const booking: Booking = {
    check_in_date: new Date(check_in_date),
    check_out_date: new Date(check_out_date),
    host_id: Number(host_id),
    property_id: Number(property_id),
    total_price: Number(total_price),
    amount_of_nights: Number(amount_of_nights),
    guest_id: undefined,
  };

  return (
    <div className="px-30 py-5">
      <h1 className="font-semibold text-2xl py-3 ">Create Booking</h1>
      <div className="grid grid-cols-12 gap-5">
        <BookingStepsContainer booking={booking} />
        <BookingSummaryCardContainer booking={booking} />
      </div>
    </div>
  );
}
