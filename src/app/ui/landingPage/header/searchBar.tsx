"use client";
import clsx from "clsx";
import Image from "next/image";
import DropDown from "./DropDown";
import CalendarDropDown from "@/app/ui/landingPage/header/calendarDropdown";
import { useState } from "react";

export default function SearchBar() {
  const [isSearchBarDropdownOpen, setIsSearchBarDropdownOpen] = useState(false);
  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false);
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);

  const toggleSearchBarDropdown = () => {
    setIsCalendarDropdownOpen(false);
    setIsGuestsDropdownOpen(false);

    setIsSearchBarDropdownOpen((prevState) => !prevState);
  };

  const toggleCalendarDropdown = () => {
    setIsSearchBarDropdownOpen(false);
    setIsGuestsDropdownOpen(false);

    setIsCalendarDropdownOpen((prevState) => !prevState);
  };

  const toggleGuestsDropdown = () => {
    setIsSearchBarDropdownOpen(false);
    setIsCalendarDropdownOpen(false);

    setIsGuestsDropdownOpen((prevState) => !prevState);
  };

  const anyClicked =
    isSearchBarDropdownOpen || isCalendarDropdownOpen || isGuestsDropdownOpen;

  return (
    <div
      className={clsx(
        "grid grid-cols-[2fr_1fr_1fr_2fr] h-20 w-auto rounded-full border-2 border-gray-200 shadow",
        anyClicked ? "bg-gray-100" : "bg-white"
      )}
    >
      <div className="relative">
        <div
          onClick={toggleSearchBarDropdown}
          className={clsx(
            "absolute inset-0 p-4 h-auto w-auto cursor-pointer hover:bg-gray-200 rounded-full flex flex-col items-start",
            isSearchBarDropdownOpen && "bg-white"
          )}
        >
          <label className="text-xs font-semibold">Where</label>
          <input
            type="text"
            placeholder="Search Destinations"
            className="text-base text-gray-800 focus:outline-none focus:ring-0"
          />
        </div>
        {isSearchBarDropdownOpen && <DropDown />}
      </div>

      <div className="relative">
        <button
          onClick={toggleCalendarDropdown}
          className={clsx(
            "absolute inset-0 p-4 h-auto w-auto cursor-pointer hover:bg-gray-200 rounded-full flex flex-col items-start",
            isCalendarDropdownOpen && "bg-white"
          )}
        >
          <div>
            <p className="text-xs font-semibold">Check In</p>
          </div>
          <div>
            <p className="text-base font-light text-gray-500">Add Dates</p>
          </div>
        </button>
        {isCalendarDropdownOpen && <CalendarDropDown />}
      </div>

      <div className="relative">
        <button className="absolute inset-0 p-4 h-auto w-auto cursor-pointer hover:bg-gray-200 rounded-full flex flex-col items-start">
          <div>
            <p className="text-xs font-semibold">Check Out</p>
          </div>
          <div>
            <p className="text-base font-light text-gray-500">Add Dates</p>
          </div>
        </button>
      </div>

      <div className="relative">
        <div
          className={clsx(
            "absolute inset-0 p-4 h-auto w-auto cursor-pointer hover:bg-gray-200 has-[button:hover]:bg-transparent rounded-full flex flex-col items-start group",
            isGuestsDropdownOpen && "bg-white"
          )}
        >
          <div>
            <p className="text-xs font-semibold">Who</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-base font-light text-gray-500">Add Guests</p>
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-300 h-10 w-10 cursor-pointer hover:bg-blue-500 rounded-full flex items-center justify-center">
            <Image
              src="/icons/search.png"
              alt="Search Icon"
              width={20}
              height={20}
              className="filter invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
