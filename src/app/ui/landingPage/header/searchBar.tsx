"use client";
import clsx from "clsx";
import Image from "next/image";
import DropDown from "./DropDown";
import CalendarDropDown from "@/app/ui/landingPage/header/calendarDropdown";
import GuestDropDown from "@/app/ui/landingPage/header/GuestDropDown";
import { useState, useCallback } from "react";
import { useTrip } from "../Context/TripContext";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const { startTripDate, endTripDate, where, who } = useTrip();
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
    <>
      {anyClicked && (
        <div
          onClick={() => {
            setIsSearchBarDropdownOpen(false);
            setIsCalendarDropdownOpen(false);
            setIsGuestsDropdownOpen(false);
          }}
          className="fixed h-full w-full"
        ></div>
      )}

      <div
        className={clsx(
          "grid grid-cols-1 sm:grid-cols-3 h-auto sm:h-20 w-full rounded-full border-2 border-gray-200 shadow z-10",
          anyClicked ? "bg-gray-100" : "bg-white"
        )}
      >
        {/* Where */}
        <div className="relative">
          <div
            onClick={toggleSearchBarDropdown}
            className={clsx(
              "overflow-hidden absolute inset-0 p-4 h-auto w-auto cursor-pointer hover:bg-gray-200 rounded-full flex flex-col items-start",
              isSearchBarDropdownOpen && "bg-white"
            )}
          >
            <label className="text-xs font-semibold">Where</label>
            <input
              type="text"
              placeholder={where ? where.title : "Search Destinations"}
              className="text-base text-gray-800 focus:outline-none focus:ring-0"
            />
          </div>
          {isSearchBarDropdownOpen && <DropDown />}
        </div>

        {/* Check In/Out */}
        <div className="relative">
          <button
            onClick={toggleCalendarDropdown}
            className={clsx(
              "absolute inset-0 p-4 h-auto w-auto cursor-pointer hover:bg-gray-200 rounded-full flex flex-col items-start overflow-hidden",
              isCalendarDropdownOpen && "bg-white"
            )}
          >
            <p className="text-xs font-semibold">Check In/Out</p>
            <p className="text-base font-light text-gray-500">
              {startTripDate && endTripDate
                ? `${startTripDate.toDateString()} - ${endTripDate.toDateString()}`
                : "Add Dates"}
            </p>
          </button>
          {isCalendarDropdownOpen && <CalendarDropDown />}
        </div>

        {/* Who */}
        <div className="relative">
          <div
            onClick={toggleGuestsDropdown}
            className={clsx(
              "overflow-hidden absolute inset-0 p-4 h-auto w-auto cursor-pointer hover:bg-gray-200 has-[button:hover]:bg-transparent rounded-full flex flex-col items-start group",
              isGuestsDropdownOpen && "bg-white"
            )}
          >
            <p className="text-xs font-semibold">Who</p>
            <div className="flex flex-row items-center gap-2">
              <p className="text-base font-light text-gray-500">
                {who
                  ? `Adlt ${who.adults} Chld ${who.children} Inft ${who.infants}`
                  : "Add Guests"}
              </p>
            </div>
          </div>
          {SearchButton()}
          {isGuestsDropdownOpen && <GuestDropDown />}
        </div>
      </div>
    </>
  );
}

function SearchButton() {
  const { startTripDate, endTripDate, where, who } = useTrip();
  const router = useRouter();

  const searchTrips = useCallback(async () => {
    if (!startTripDate || !endTripDate || !where || !who) {
      alert("Please fill in all required fields");
      return;
    }

    const baseUrl = "/trips";
    const params = new URLSearchParams();

    params.append("startDate", startTripDate.toISOString().split("T")[0]);
    params.append("endDate", endTripDate.toISOString().split("T")[0]);
    params.append("destination", where.title);
    params.append("destination-id", where.id.toString());
    params.append("adults", who.adults.toString());
    params.append("children", who.children.toString());
    params.append("infants", who.infants.toString());

    const searchUrl = `${baseUrl}?${params.toString()}`;
    router.push(searchUrl);
  }, [startTripDate, endTripDate, where, who, router]);

  return (
    <button
      onClick={searchTrips}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-300 h-10 w-10 cursor-pointer hover:bg-blue-500 rounded-full flex items-center justify-center"
    >
      <Image
        src="/icons/search.png"
        alt="Search Icon"
        width={20}
        height={20}
        className="filter invert"
      />
    </button>
  );
}
