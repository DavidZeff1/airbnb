"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ReviewSection from "./ReviewSection";
import GallerySection from "./GallerySection";
import CalendarSection from "./CalendarSection";
import AmmenitiesSection from "./AmmenitiesSection";
import FormSection from "./FormSection";
import GallerySkeleton from "./skeletons/GallerySkeleton";
import { useState, useEffect } from "react";
import { PropertyData } from "../types/types";

export default function PropertyBody() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const id = searchParams.get("id");
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);

  useEffect(() => {
    const fetchPropertyData = async (): Promise<void> => {
      const response = await fetch(`/api/GetProperty?id=${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PropertyData = await response.json();
      setPropertyData(data);
      console.log(data);
      setIsLoading(false);
    };

    fetchPropertyData();
  }, [id]);

  return (
    <>
      <div className="mx-45 my-6">
        {isLoading ? (
          <GallerySkeleton />
        ) : (
          <>
            <h1 className="font-semibold text-2xl">{`${propertyData?.property?.title}`}</h1>
            <GallerySection />
            <div className="flex flex-col my-6 gap-6">
              <div className="grid grid-cols-12 my-6 gap-6 border-b-1 border-gray-300 p-6 ">
                <div className="col-span-8 ">
                  <div>
                    <div className="font-semibold">
                      {`Entire condo in ${propertyData?.property?.city_name} , ${propertyData?.property?.country_name}`}
                    </div>
                    <div>
                      {`${propertyData?.property?.bedrooms} bedroom  ${propertyData?.property?.bathrooms} bath`}
                    </div>
                  </div>

                  <div className="border-b-1 border-gray-300 py-5">
                    <div className="flex gap-6 py-3">
                      <div className="rounded-full overflow-hidden self-center h-15 w-15 relative">
                        <Image
                          src={
                            propertyData?.host?.profile_picture ||
                            "/images/fallback.jpg"
                          }
                          alt={`${propertyData?.host?.first_name} profile`}
                          fill
                        />
                      </div>
                      <div>
                        <div className="font-semibold">
                          {`Hosted by ${propertyData?.host?.first_name} ${propertyData?.host?.last_name}`}
                        </div>
                        <div>Superhost 3 years hosting</div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b-1 border-gray-300 py-5">
                    <p>{propertyData?.property?.property_description}</p>
                  </div>

                  <AmmenitiesSection amenities={propertyData?.amenities} />
                  <CalendarSection propertyData={propertyData} />
                </div>
                <FormSection />
              </div>

              <ReviewSection />
            </div>
          </>
        )}
      </div>
    </>
  );
}
