import Calendar from "./Calendar";

export default function CalendarDropDown() {
  return (
    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white text-left rounded-3xl z-20 p-6 border-2 border-gray-200 shadow-xl w-[90vw] max-w-4xl">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-[300px]">
          <Calendar monthType="start" />
        </div>
        <div className="flex-1 min-w-[300px]">
          <Calendar monthType="end" />
        </div>
      </div>
    </div>
  );
}
