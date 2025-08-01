import DropDownCard from "./DropDownCard";
import { useState } from "react";

export default function GuestDropDown() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  return (
    <div className="absolute bg-white h-fit w-90  right-0 top-23 text-left rounded-3xl z-10 flex flex-col justify-start gap-2 p-4 border-2 border-gray-200 shadow-lg overflow-y-auto justify-between">
      <div className="w-full h-20 flex justify-between items-center p-2 border-b-2 border-gray-200">
        <div>
          <p className="text-sm font-semibold">Adults</p>
          <p className="text-xs text-gray-500">Ages 13 or above</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p>-</p>
          <p>{adults}</p>
          <p>+</p>
        </div>
      </div>
      <div className="w-full h-20 flex justify-between items-center p-2 border-b-2 border-gray-200">
        <div>
          <p className="text-sm font-semibold">Children</p>
          <p className="text-xs text-gray-500">Ages 2 - 12</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p>-</p>
          <p>{children}</p>
          <p>+</p>
        </div>
      </div>
      <div className="w-full h-20 flex justify-between items-center p-2 border-b-2 border-gray-200">
        <div>
          <p className="text-sm font-semibold">Children</p>
          <p className="text-xs text-gray-500">Ages 2 - 12</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p>-</p>
          <p>{infants}</p>
          <p>+</p>
        </div>
      </div>
      <br />
    </div>
  );
}
