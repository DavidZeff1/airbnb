import { FaUtensils, FaWifi, FaBath, FaTv } from "react-icons/fa";
export default function AmmenitiesSection() {
  return (
    <div className="grid grid-cols-2 gap-5 border-b-1 border-gray-300 py-5 my-6">
      <h2 className="col-span-2 font-semibold text-xl">
        What This Place Offers
      </h2>

      <div className="flex items-center gap-4">
        <FaUtensils />
        <p>Kitchen</p>
      </div>
      <div className="flex items-center gap-4">
        <FaWifi />
        <p>Wifi</p>
      </div>
      <div className="flex items-center gap-4">
        <FaBath />
        <p>Bath</p>
      </div>
      <div className="flex items-center gap-4">
        <FaTv />
        <p>Tv</p>
      </div>
    </div>
  );
}
