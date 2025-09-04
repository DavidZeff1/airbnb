import Image from "next/image";
import { useState, useEffect } from "react";

type Amenity = {
  id: number;
  name: string;
  icon: string;
};

export default function AmenitiesContainer() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [chosenAmenities, setChosenAmenities] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/getAmmenities")
      .then((res) => res.json())
      .then((data) => {
        setAmenities(data);
      })
      .catch((error) => {
        console.error("Error fetching amenities:", error);
      });
  }, []);

  const toggleAmenity = (amenityId: number) => {
    setChosenAmenities((prev) => {
      if (prev.includes(amenityId)) {
        return prev.filter((id) => id !== amenityId);
      } else {
        return [...prev, amenityId];
      }
    });
  };

  return (
    <div className="p-3 border border-gray-100 shadow rounded">
      <h1 className="mb-5">Select Amenities</h1>
      <div className="flex flex-wrap gap-10">
        {amenities.map((amenity) => (
          <AmenityCard
            key={amenity.id}
            amenity={amenity}
            chosenAmenities={chosenAmenities}
            toggleAmenity={toggleAmenity}
          />
        ))}
      </div>
    </div>
  );
}

function AmenityCard({
  amenity,
  chosenAmenities,
  toggleAmenity,
}: {
  amenity: Amenity;
  chosenAmenities: number[];
  toggleAmenity: (id: number) => void;
}) {
  const isSelected = chosenAmenities.includes(amenity.id);

  return (
    <div
      onClick={() => toggleAmenity(amenity.id)}
      className={`flex flex-col items-center cursor-pointer border rounded p-2 hover:shadow-lg w-25 transition ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-black"
      }`}
    >
      <Image
        src={`${amenity.icon || "default.png"}`}
        alt={`${amenity.name} Property Type`}
        width={75}
        height={75}
      />
      <div>
        <h2 className="text-center">{amenity.name}</h2>
      </div>
    </div>
  );
}
