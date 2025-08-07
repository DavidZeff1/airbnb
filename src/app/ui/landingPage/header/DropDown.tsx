import DropDownCard from "./DropDownCard";
import { useEffect, useState } from "react";
import Skeleton from "@/app/ui/skeletons/WhereDropCardSkeleton";
type City = {
  city_id: number;
  city_name: string;
  description: string | null;
  country_id: number;
  country_name: string;
  image_url: string;
};

export default function DropDown() {
  const [cities, setCities] = useState<City[]>([]);
  useEffect(() => {
    fetch("/api/GetCitiesWhereDropdown")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      })
      .catch((err) => {
        console.error("Failed to fetch cities:", err);
      });
  }, []);

  return (
    <div className="absolute bg-white h-110 w-90 left-0 top-23 text-left rounded-3xl z-10 flex flex-col justify-start gap-2 p-4 border-2 border-gray-200 shadow-lg overflow-y-auto">
      <div className="text-xs">
        <p>Suggested Destinations</p>
      </div>
      {cities.length > 0 ? (
        cities.map((city) => (
          <DropDownCard
            key={city.city_id}
            imageSrc={city.image_url}
            title={city.city_name}
            country={city.country_name}
            description={
              city.description || `Beautiful city in ${city.country_name}`
            }
          />
        ))
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
