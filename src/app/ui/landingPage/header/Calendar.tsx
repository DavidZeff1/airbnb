import { useTrip } from "../Context/TripContext";
import { useState } from "react";
import clsx from "clsx";

type CalendarProps = {
  monthType: "start" | "end";
};

export default function Calendar({ monthType }: CalendarProps) {
  const { startTripDate, endTripDate, setStartTripDate, setEndTripDate } =
    useTrip();

  const [currentMon, SetCurrentM] = useState(
    startTripDate ? startTripDate.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    startTripDate ? startTripDate.getFullYear() : new Date().getFullYear()
  );

  const firstDayOfCurrentMonth = new Date(currentYear, currentMon, 1);
  const days = 42;
  const weeksday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const FirstDayOfCurrentMonthDayOfWeek = firstDayOfCurrentMonth.getDay();
  const startIndex = 1 - FirstDayOfCurrentMonthDayOfWeek;

  const handlePreviousMonth = () => {
    if (currentMon === 0) {
      SetCurrentM(11); // December
      setCurrentYear(currentYear - 1);
    } else {
      SetCurrentM(currentMon - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMon === 11) {
      SetCurrentM(0); // January
      setCurrentYear(currentYear + 1);
    } else {
      SetCurrentM(currentMon + 1);
    }
  };

  return (
    <div className="bg-gray-100 h-fit w-full grid grid-cols-7 grid-rows-7 gap-2 p-4">
      <div className="col-span-full flex justify-between">
        <p
          onClick={handlePreviousMonth}
          className="h-fit hover:bg-gray-200 cursor-pointer flex items-center justify-center p-2 rounded-full"
        >
          {"<"}
        </p>
        <p className="h-fit flex items-center justify-center p-2">
          {months[currentMon] + " " + currentYear}
        </p>
        <p
          onClick={handleNextMonth}
          className="h-fit hover:bg-gray-200 cursor-pointer flex items-center justify-center p-2 rounded-full"
        >
          {">"}
        </p>
      </div>
      {weeksday.map((day, index) => (
        <div
          key={index}
          className="h-fit inset-0 text-center text-xs font-semibold text-gray-600"
        >
          {day}
        </div>
      ))}
      {Array.from({ length: days }, (_, index) => {
        const thisDate = new Date(currentYear, currentMon, startIndex + index);
        const today = new Date();

        // Reset time to compare only dates
        const todayDateOnly = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        const thisDateOnly = new Date(
          thisDate.getFullYear(),
          thisDate.getMonth(),
          thisDate.getDate()
        );

        const isInCurrentMonth = thisDate.getMonth() === currentMon;
        const isStart =
          startTripDate !== null &&
          thisDate.toDateString() === startTripDate.toDateString();
        const isEnd =
          endTripDate !== null &&
          thisDate.toDateString() === endTripDate.toDateString();
        const isBetween =
          startTripDate !== null &&
          endTripDate !== null &&
          startTripDate < thisDate &&
          thisDate < endTripDate;
        const isBehindCurrentDate = thisDateOnly < todayDateOnly;

        return (
          <div
            onClick={() => {
              // Don't allow clicking on past dates
              if (!isBehindCurrentDate) {
                monthType === "start"
                  ? setStartTripDate(thisDate)
                  : setEndTripDate(thisDate);
              }
            }}
            key={index}
            className={clsx(
              "text-center text-sm font-light p-2 flex items-center justify-center rounded-full",
              // Base styles for different date types
              !isInCurrentMonth && "text-gray-300", // Dates from other months
              isInCurrentMonth && isBehindCurrentDate && "text-gray-400", // Past dates in current month
              isInCurrentMonth &&
                !isBehindCurrentDate &&
                "text-gray-800 hover:bg-gray-200 cursor-pointer", // Future dates in current month
              isBehindCurrentDate && "cursor-not-allowed", // Past dates not clickable
              // Selected date styles (override above)
              (isStart || isEnd) && "bg-blue-300 text-white",
              isBetween && "bg-blue-100"
            )}
          >
            {thisDate.getDate()}
          </div>
        );
      })}

      <div className="col-span-full text-center text-xs font-semibold text-gray-600">
        {`Choose ${monthType} Date`}
      </div>
    </div>
  );
}
