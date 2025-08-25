import Image from "next/image";
import { useState, useEffect } from "react";

type PropertyType = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};

export default function PropertyTypeContainer() {
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [chosenPropertyType, setChosenPropertyType] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetch("/api/getPropertyTypes").then((res) =>
      res.json().then((data) => {
        setPropertyTypes(data);
      })
    );
  }, []);

  return (
    <div className="p-3 border border-gray-100 shadow rounded">
      <h1 className="mb-5">Select Property Type</h1>
      <div className="flex flex-wrap gap-10">
        {propertyTypes.map((propertyType) => (
          <PropertyTypeCard
            key={propertyType.id}
            propertyType={propertyType}
            chosenPropertyType={chosenPropertyType}
            setChosenPropertyType={setChosenPropertyType}
          />
        ))}
      </div>
    </div>
  );
}

function PropertyTypeCard({
  propertyType,
  chosenPropertyType,
  setChosenPropertyType,
}: {
  propertyType: PropertyType;
  chosenPropertyType: number | null;
  setChosenPropertyType: (id: number) => void;
}) {
  const isSelected = chosenPropertyType === propertyType.id;

  return (
    <div
      onClick={() => setChosenPropertyType(propertyType.id)}
      className={`flex flex-col items-center cursor-pointer border rounded p-2 hover:shadow-lg w-25 transition ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-black"
      }`}
    >
      <Image
        src={`/icons/${propertyType.image_url || "default.png"}`}
        alt={`${propertyType.name} Property Type`}
        width={75}
        height={75}
      />
      <div>
        <h2 className="text-center">{propertyType.name}</h2>
      </div>
    </div>
  );
}
