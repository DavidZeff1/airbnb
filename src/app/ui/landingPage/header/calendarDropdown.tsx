import Calendar from "./Calendar";
import { TripDateProvider } from "../Context/TripDateContext";

export default function CalendarDropDown() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  return (
    <div className="absolute right-0 left-30 -translate-x-1/2 bg-white h-120 w-180 top-23 text-left rounded-3xl z-10  p-4 border-2 border-gray-200 shadow-lg flex justify-center gap-3">
      <TripDateProvider>
        <Calendar currentMonth={currentMonth} monthType="start" />
        <Calendar currentMonth={currentMonth} monthType="end" />
      </TripDateProvider>
    </div>
  );
}
