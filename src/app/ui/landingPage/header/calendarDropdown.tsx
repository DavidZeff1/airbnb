export default function CalendarDropDown() {
  const days = 35;
  const weeksday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  return (
    <div className="absolute right-0 left-30 -translate-x-1/2 bg-white h-150 w-180 top-23 text-left rounded-3xl z-10  p-4 border-2 border-gray-200 shadow-lg overflow-y-auto">
      <div className="bg-gray-100 h-full w--full grid grid-cols-7 grid-rows-6">
        {weeksday.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: days }, (_, index) => (
          <div
            key={index}
            className="text-center text-sm font-light text-gray-800 p-2 hover:bg-gray-200 cursor-pointer"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
