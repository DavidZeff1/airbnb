import Calendar from "./CalendarProperty";
import { PropertyData, Booking } from "../types/types";
import { SetStateAction, Dispatch } from "react";
export default function CalendarSection({
  propertyData,
  booking,
  setBooking,
}: {
  propertyData?: PropertyData | null;
  booking?: Booking | null;
  setBooking?: Dispatch<SetStateAction<Booking | null>>;
}) {
  if (!propertyData || !booking || !setBooking) {
    return null;
  }
  const { check_in_date, check_out_date } = booking;

  return (
    <div className="grid grid-cols-12 gap-5 my-6 py-5">
      <div className="col-span-full">
        <div className="font-semibold text-2xl">{`${calculateDaysBetweenTwoDates(
          check_in_date,
          check_out_date
        )} Nights in ${propertyData.property?.city_name}`}</div>
        <div>{`${check_in_date?.toDateString()} - ${check_out_date?.toDateString()}`}</div>
      </div>

      <div className="col-span-6 rounded-3xl overflow-hidden">
        <Calendar
          monthType={"start"}
          booking={booking}
          setBooking={setBooking}
        />
      </div>
      <div className="col-span-6 rounded-3xl overflow-hidden">
        <Calendar monthType={"end"} booking={booking} setBooking={setBooking} />
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
