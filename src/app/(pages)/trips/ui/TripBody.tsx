"use client";

import Card from "@/app/(pages)/trips/ui/Card";
import TripSkeletons from "./skeletons/TripSkeletons";

type Property = {
  property_id: number;
  property_title: string;
  property_latitude: string;
  property_longitude: string;
  property_price: string;
  property_image_url: string;
};

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

export default function TripBody() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `/api/GetPropertiesForTripSearch?${searchParams.toString()}`;

    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProperties(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isLoading) {
    return <TripSkeletons />;
  }

  return (
    <>
      <div className="flex h-screen">
        <PropertiesContainer
          searchParams={searchParams}
          properties={properties}
        />
        <MapContainer properties={properties} />
      </div>
    </>
  );
}

function MapContainer({ properties }: { properties: Property[] }) {
  return (
    <div className="w-4/10 rounded-lg m-4 h-screen overflow-hidden">
      <div className="bg-blue-100 rounded-lg m-4 h-4/6">
        <MapComponent
          properties={properties.map((property) => ({
            property_id: property.property_id,
            property_price: property.property_price,
            property_latitude: property.property_latitude,
            property_longitude: property.property_longitude,
          }))}
        />
      </div>
    </div>
  );
}

function PropertiesContainer({
  searchParams,
  properties,
}: {
  searchParams: URLSearchParams;
  properties: Property[];
}) {
  return (
    <div className="w-6/10 overflow-y-auto p-4 scrollbar-hide">
      <h2 className="pl-8">
        {`Properties For Rent In ${searchParams.get("destination")}`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {properties.map((property) => (
          <Card
            key={property.property_id}
            property_id={property.property_id}
            property_image_url={property.property_image_url}
            property_title={property.property_title}
            property_price={property.property_price}
          />
        ))}
      </div>
    </div>
  );
}
