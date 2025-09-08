//dropdown component for suggested destinations - UPDATED FOR RESPONSIVENESS
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
    <div className="absolute bg-white left-0 right-0 lg:right-auto lg:w-80 top-[60px] sm:top-16 lg:top-20 text-left rounded-3xl z-20 flex flex-col gap-2 p-3 sm:p-4 border-2 border-gray-200 shadow-lg max-h-96 overflow-y-auto mx-2 sm:mx-4 lg:mx-0">
      <div className="text-xs font-medium text-gray-600 mb-2">
        <p>Suggested Destinations</p>
      </div>
      {cities.length > 0 ? (
        cities.map((city) => (
          <DropDownCard
            key={city.city_id}
            id={city.city_id}
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
