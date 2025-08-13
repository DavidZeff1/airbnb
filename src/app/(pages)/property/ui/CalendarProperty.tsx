"use client";
import { useState } from "react";
import clsx from "clsx";
import { Booking } from "../types/types";
import { Dispatch, SetStateAction } from "react";

export default function Calendar({
  monthType,
  booking,
  setBooking,
}: {
  monthType: string;
  booking?: Booking | null;
  setBooking?: Dispatch<SetStateAction<Booking | null>>;
}) {
  const [currentMon, setCurrentMon] = useState<number>(
    booking?.check_in_date?.getMonth() ?? new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    booking?.check_out_date?.getFullYear() ?? new Date().getFullYear()
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
      setCurrentMon(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMon(currentMon - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMon === 11) {
      setCurrentMon(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMon(currentMon + 1);
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
        const IsCurrentMonth = thisDate.getMonth() == currentMon;
        const isBetweenCheckInCheckOut =
          booking?.check_in_date &&
          booking?.check_out_date &&
          booking.check_in_date.getTime() <= thisDate.getTime() &&
          thisDate.getTime() <= booking.check_out_date.getTime();

        const isCheckInDate =
          booking?.check_in_date &&
          booking.check_in_date.getTime() == thisDate.getTime();
        const isCheckOutDate =
          booking?.check_out_date &&
          booking.check_out_date.getTime() == thisDate.getTime();

        return (
          <div
            onClick={() => {
              if (setBooking) {
                if (monthType === "start") {
                  setBooking((prev) =>
                    prev ? { ...prev, check_in_date: thisDate } : null
                  );
                } else {
                  setBooking((prev) =>
                    prev ? { ...prev, check_out_date: thisDate } : null
                  );
                }
              }
            }}
            key={index}
            className={clsx(
              IsCurrentMonth &&
                "text-center text-sm font-normal hover:cursor-pointer p-2 flex items-center justify-center rounded-full",
              !IsCurrentMonth &&
                "text-center text-sm font-light hover:cursor-not-allowed p-2 flex items-center justify-center rounded-full",
              isBetweenCheckInCheckOut &&
                "text-center bg-blue-100 text-sm font-light hover:cursor-not-allowed p-2 flex items-center justify-center rounded-full",
              (isCheckOutDate || isCheckInDate) &&
                "text-center text-white bg-blue-300 text-sm font-light hover:cursor-not-allowed p-2 flex items-center justify-center rounded-full"
            )}
          >
            {thisDate.getDate()}
          </div>
        );
      })}

      <div className="col-span-full text-center text-xs font-semibold text-gray-600">
        {`Choose ${monthType
          .charAt(0)
          .toUpperCase()
          .concat(monthType.substring(1))} Date`}
      </div>
    </div>
  );
}
