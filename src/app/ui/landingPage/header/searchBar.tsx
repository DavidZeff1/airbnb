//search bar component - UPDATED FOR RESPONSIVENESS
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
          className="fixed inset-0 z-[5]"
        ></div>
      )}

      <div
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-3 h-auto lg:h-20 w-full max-w-4xl mx-auto rounded-full border-2 border-gray-200 shadow z-10 relative",
          anyClicked ? "bg-gray-100" : "bg-white"
        )}
      >
        {/* Where Section */}
        <div className="relative">
          <div
            onClick={toggleSearchBarDropdown}
            className={clsx(
              "p-4 h-16 lg:h-auto cursor-pointer hover:bg-gray-200 rounded-t-full lg:rounded-l-full lg:rounded-tr-none flex flex-col justify-center",
              isSearchBarDropdownOpen && "bg-white"
            )}
          >
            <label className="text-xs font-semibold block">Where</label>
            <input
              type="text"
              placeholder={where ? where.title : "Search Destinations"}
              className="text-sm lg:text-base text-gray-800 focus:outline-none focus:ring-0 bg-transparent w-full"
              readOnly
            />
          </div>
          {isSearchBarDropdownOpen && <DropDown />}
        </div>

        {/* When Section */}
        <div className="relative">
          <button
            onClick={toggleCalendarDropdown}
            className={clsx(
              "p-4 h-16 lg:h-auto w-full cursor-pointer hover:bg-gray-200 lg:rounded-none flex flex-col justify-center border-y lg:border-y-0 lg:border-x border-gray-200",
              isCalendarDropdownOpen && "bg-white"
            )}
          >
            <p className="text-xs font-semibold text-left">Check In/Out</p>
            <p className="text-sm lg:text-base font-light text-gray-500 text-left truncate">
              {startTripDate && endTripDate
                ? `${startTripDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })} - ${endTripDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}`
                : "Add Dates"}
            </p>
          </button>
          {isCalendarDropdownOpen && <CalendarDropDown />}
        </div>

        {/* Who Section */}
        <div className="relative">
          <div
            onClick={toggleGuestsDropdown}
            className={clsx(
              "p-4 h-16 lg:h-auto cursor-pointer hover:bg-gray-200 rounded-b-full lg:rounded-r-full lg:rounded-bl-none flex flex-col justify-center group relative",
              isGuestsDropdownOpen && "bg-white"
            )}
          >
            <p className="text-xs font-semibold">Who</p>
            <p className="text-sm lg:text-base font-light text-gray-500 truncate pr-12">
              {who
                ? `${who.adults} Adult${who.adults !== 1 ? "s" : ""}${
                    who.children > 0
                      ? `, ${who.children} Child${
                          who.children !== 1 ? "ren" : ""
                        }`
                      : ""
                  }${
                    who.infants > 0
                      ? `, ${who.infants} Infant${who.infants !== 1 ? "s" : ""}`
                      : ""
                  }`
                : "Add Guests"}
            </p>
            <SearchButton />
          </div>
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
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-400 hover:bg-blue-500 h-8 w-8 lg:h-10 lg:w-10 rounded-full flex items-center justify-center transition-colors z-10 hover:cursor-pointer"
    >
      <Image
        src="/icons/search.png"
        alt="Search Icon"
        width={16}
        height={16}
        className="filter invert lg:w-5 lg:h-5"
      />
    </button>
  );
}
