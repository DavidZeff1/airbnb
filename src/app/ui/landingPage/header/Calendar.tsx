import { useTripDate } from "../Context/TripDateContext";
import { useState } from "react";
import clsx from "clsx";
type CalendarProps = {
  currentMonth: number;
  monthType: "start" | "end";
};
export default function Calendar({ currentMonth, monthType }: CalendarProps) {
  const [currentMon, SetCurrentM] = useState(currentMonth);
  const { startTripDate, endTripDate, setStartTripDate, setEndTripDate } =
    useTripDate();

  const currentYear = new Date().getFullYear();
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

  return (
    <div className="bg-gray-100 h-fit w-full grid grid-cols-7 grid-rows-7 gap-2 p-4">
      <div className="col-span-full flex justify-between">
        <p
          onClick={() => SetCurrentM((currentMon - 1 + 12) % 12)}
          className=" h-fit h-fit hover:bg-gray-200 cursor-pointer flex items-center justify-center p-2 hover:bg-gray-200 rounded-full"
        >
          {"<"}
        </p>
        <p className="h-fit h-fit  flex items-center justify-center p-2 ">
          {months[currentMon]}
        </p>
        <p
          onClick={() => SetCurrentM((currentMon + 1) % 12)}
          className="h-fit h-fit  hover:bg-gray-200 cursor-pointer flex items-center justify-center p-2 hover:bg-gray-200 rounded-full"
        >
          {">"}
        </p>
      </div>
      {weeksday.map((day, index) => (
        <div
          key={index}
          className="h-fit h-fit inset-0 text-center text-xs font-semibold text-gray-600"
        >
          {day}
        </div>
      ))}
      {Array.from({ length: days }, (_, index) => {
        const thisDate = new Date(currentYear, currentMon, startIndex + index);

        const isInCurrentMonth = thisDate.getMonth() === currentMon;
        const isStart =
          thisDate.toDateString() === startTripDate.toDateString();
        const isEnd = thisDate.toDateString() === endTripDate.toDateString();
        const isBetween = startTripDate < thisDate && thisDate < endTripDate;

        return (
          <div
            onClick={() => {
              monthType === "start"
                ? setStartTripDate(thisDate)
                : setEndTripDate(thisDate);
            }}
            key={index}
            className={clsx(
              "text-center text-sm font-light p-2 flex items-center justify-center rounded-full cursor-pointer",
              !isInCurrentMonth && "text-gray-400",
              isInCurrentMonth && "text-gray-800 hover:bg-gray-200",
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
