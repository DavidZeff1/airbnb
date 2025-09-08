//calendar dropdown component - UPDATED FOR RESPONSIVENESS
import Calendar from "./Calendar";

export default function CalendarDropDown() {
  return (
    <div className="absolute left-0 right-0 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 bg-white top-16 lg:top-20 text-left rounded-3xl z-20 p-4 border-2 border-gray-200 shadow-lg mx-4 lg:mx-0 lg:w-auto">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <Calendar monthType="start" />
        </div>
        <div className="flex-1 min-w-0">
          <Calendar monthType="end" />
        </div>
      </div>
    </div>
  );
}
