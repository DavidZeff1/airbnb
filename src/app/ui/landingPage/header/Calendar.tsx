//calendar component - UPDATED FOR RESPONSIVENESS
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
      SetCurrentM(11);
      setCurrentYear(currentYear - 1);
    } else {
      SetCurrentM(currentMon - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMon === 11) {
      SetCurrentM(0);
      setCurrentYear(currentYear + 1);
    } else {
      SetCurrentM(currentMon + 1);
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-3 lg:p-4 w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className="w-8 h-8 hover:bg-gray-200 cursor-pointer flex items-center justify-center rounded-full transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3 className="text-sm lg:text-base font-semibold">
          {months[currentMon]} {currentYear}
        </h3>
        <button
          onClick={handleNextMonth}
          className="w-8 h-8 hover:bg-gray-200 cursor-pointer flex items-center justify-center rounded-full transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weeksday.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-semibold text-gray-600 py-2"
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: days }, (_, index) => {
          const thisDate = new Date(
            currentYear,
            currentMon,
            startIndex + index
          );
          const today = new Date();

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
            <button
              onClick={() => {
                if (!isBehindCurrentDate) {
                  if (monthType === "start") {
                    setStartTripDate(thisDate);
                  } else {
                    setEndTripDate(thisDate);
                  }
                }
              }}
              key={index}
              disabled={isBehindCurrentDate}
              className={clsx(
                "w-8 h-8 lg:w-10 lg:h-10 text-xs lg:text-sm font-medium rounded-full flex items-center justify-center transition-all",
                // Base styles
                !isInCurrentMonth && "text-gray-300",
                isInCurrentMonth &&
                  isBehindCurrentDate &&
                  "text-gray-400 cursor-not-allowed",
                isInCurrentMonth &&
                  !isBehindCurrentDate &&
                  "text-gray-800 hover:bg-gray-200 cursor-pointer",
                // Selected styles
                (isStart || isEnd) &&
                  "bg-blue-500 text-white hover:bg-blue-600",
                isBetween && "bg-blue-100 text-blue-800"
              )}
            >
              {thisDate.getDate()}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center text-xs font-medium text-gray-600 mt-4 pt-3 border-t border-gray-200">
        Choose {monthType} date
      </div>
    </div>
  );
}
