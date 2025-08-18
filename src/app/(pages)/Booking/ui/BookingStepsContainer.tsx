"use client";
import { Booking } from "../../property/types/types";
import { useState } from "react";
import WhenToPayCard from "./WhenToPayCard";

export default function BookingStepsContainer({
  booking,
}: {
  booking: Booking;
}) {
  const [isModalClicked, SetIsModalClicked] = useState(false);
  const handleCheckout = async () => {
    const items = [
      {
        name: `Booking for property ${booking.property_id}`,
        price: booking.total_price,
        quantity: 1,
      },
    ];

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div className="col-span-8 flex flex-col gap-10 rounded-3xl pt-10 pr-10 ">
      <WhenToPayCard
        booking={booking}
        SetIsModalClicked={SetIsModalClicked}
        isModalClicked={isModalClicked}
      />
      <div className=" rounded-3xl p-5 flex flex-col border-2 border-gray-200 shadow-xl">
        <div className="font-semibold text-xl py-3">2. Add Payment Method</div>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Checkout
        </button>
      </div>
      <div className=" rounded-3xl p-5 flex flex-col border-2 border-gray-200 shadow-xl">
        <div className="font-semibold text-xl py-3">3. Review your request</div>
      </div>
    </div>
  );
}
