import { useRouter } from "next/navigation";
import { PropertyData, Booking } from "../types/types";
import { Dispatch, SetStateAction } from "react";

export default function FormSection({
  propertyData,
  booking,
  setBooking,
}: {
  propertyData?: PropertyData | null;
  booking?: Booking | null;
  setBooking?: Dispatch<SetStateAction<Booking | null>>;
}) {
  const router = useRouter();
  if (!booking?.check_in_date && !booking?.check_out_date) {
    return null;
  }

  const daysBetweenCheckInCheckOut: number | undefined =
    calculateDaysBetweenTwoDates(
      booking?.check_in_date,
      booking?.check_out_date
    );

  const handleProceedToCheckOut = () => {
    if (!booking) return;

    // Method 1: Using query parameters
    const queryParams = new URLSearchParams({
      check_in_date: booking.check_in_date?.toISOString() || "",
      check_out_date: booking.check_out_date?.toISOString() || "",
      guest_id: booking.guest_id?.toString() || "",
      property_id: booking.property_id?.toString() || "",
      total_price: booking.total_price?.toString() || "",
    });

    router.push(`/Booking?${queryParams.toString()}`);
  };
  return (
    <div className="col-span-4 rounded-3xl h-100 sticky top-0 shadow-lg grid grid-cols-12 grid-rows-6 gap-3 p-4 border-2 border-gray-100 ">
      <div className="font-semibold text-2xl row-span-1 col-span-12 overflow-hidden">
        {`${
          booking?.check_in_date &&
          booking?.check_out_date &&
          propertyData?.property?.base_price &&
          daysBetweenCheckInCheckOut
            ? `$ ${
                daysBetweenCheckInCheckOut * propertyData?.property?.base_price
              } For ${daysBetweenCheckInCheckOut} Nights`
            : `Add Dates For Prices`
        }`}
      </div>
      <div className="col-span-12 row-span-2 grid grid-cols-12 grid-rows-2 rounded-3xl border-2 border-gray-300">
        <div className="col-span-6 row-span-1 pt-1 pl-2 border-b-2 border-r-2 border-gray-300 overflow-hidden">
          <strong className="font-sm">Check-In</strong>
          <br />
          <p>{`${
            booking?.check_in_date
              ? booking?.check_in_date.toDateString()
              : `Add Dates`
          }`}</p>
        </div>
        <div className="col-span-6 row-span-1 pt-1 pl-2 border-b-2  border-gray-300 overflow-hidden">
          <strong className="font-sm">Check-Out</strong>
          <br />
          <p>{`${
            booking?.check_out_date
              ? booking?.check_out_date.toDateString()
              : `Add Dates`
          }`}</p>
        </div>
        <div className="col-span-12 row-span-1 pt-1 pl-2  border-gray-300 overflow-hidden">
          <strong className="font-sm">Guests</strong>
          <br />
          <p>Add Guests</p>
        </div>
      </div>
      <div
        onClick={handleProceedToCheckOut}
        className="col-span-12 row-span-1  bg-gradient-to-r from-red-300 to-red-500  rounded-3xl  relative hover:cursor-pointer hover:from-red-400 hover:to-red-600"
      >
        <p
          className="absolute w-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-center
         "
        >
          Proceed To Checkout
        </p>
      </div>
      <div className="col-span-12 row-span-2  grid grid-cols-12 grid-rows-12 gap-3">
        <div className="col-span-8 row-span-3 justify-self-start ">
          {`${daysBetweenCheckInCheckOut} nights x $ ${propertyData?.property?.base_price}`}
        </div>
        <div className="col-span-4 row-span-3 justify-self-end">{`$ ${
          propertyData?.property?.base_price &&
          daysBetweenCheckInCheckOut &&
          daysBetweenCheckInCheckOut * propertyData?.property?.base_price
        }`}</div>
        <div className="col-span-8 row-span-3 justify-self-start">Total</div>
        <div className="col-span-4 row-span-3 justify-self-end">
          {`$ ${
            propertyData?.property?.base_price &&
            daysBetweenCheckInCheckOut &&
            daysBetweenCheckInCheckOut * propertyData?.property?.base_price
          }`}
        </div>
      </div>
    </div>
  );
}

function calculateDaysBetweenTwoDates(
  preDate: Date | null,
  postDate: Date | null
): number | undefined {
  let daysBetweenTwoDates: number | undefined = undefined;
  const dayInMillis = 1000 * 60 * 60 * 24;
  const check_out_dateInMillis: number | undefined = postDate?.getTime();
  const check_in_dateInMillis: number | undefined = preDate?.getTime();
  const diff: number | undefined =
    check_out_dateInMillis && check_in_dateInMillis
      ? check_out_dateInMillis - check_in_dateInMillis
      : undefined;

  if (diff != undefined) {
    daysBetweenTwoDates = diff / dayInMillis;
  }
  return daysBetweenTwoDates;
}
