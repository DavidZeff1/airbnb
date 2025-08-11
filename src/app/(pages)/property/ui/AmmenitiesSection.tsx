import Image from "next/image";
import { Amenity } from "../types/types";
export default function AmmenitiesSection({
  amenities,
}: {
  amenities?: Amenity[];
}) {
  if (!amenities || amenities.length === 0) {
    return null;
  }
  return (
    <div className="grid grid-cols-2 gap-5 border-b-1 border-gray-300 py-5 my-6">
      <h2 className="col-span-2 font-semibold text-xl">
        What This Place Offers
      </h2>
      {amenities.map((amenity, index) => {
        return (
          <div key={index} className="flex items-center gap-4">
            <div className=" self-center h-5 w-5 relative">
              <Image
                src={amenity.icon || "/images/fallback.jpg"}
                alt={`${amenity.name}`}
                fill
              />
            </div>
            <p>{`${amenity.name}`}</p>
          </div>
        );
      })}
    </div>
  );
}
