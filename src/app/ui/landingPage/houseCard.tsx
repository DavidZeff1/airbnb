"use client";
import Image from "next/image";
import Link from "next/link";

export default function HouseCard({
  id,
  title,
  base_price,
  image_url,
}: {
  id: number;
  title: string;
  base_price: number;
  image_url: string;
}) {
  return (
    <div className="flex-shrink-0 w-56 sm:w-64 md:w-72 lg:w-80">
      <Link
        href={`/property?id=${id}`}
        className="flex flex-col w-full h-full p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:bg-gray-50"
      >
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
            width={500}
            height={300}
            className="w-full h-40 sm:h-48 md:h-60 rounded-lg object-cover mb-2 sm:mb-3"
          />
        ) : (
          <div className="w-full h-40 sm:h-48 md:h-60 rounded-lg bg-gray-200 mb-2 sm:mb-3 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
        <p className="text-sm sm:text-base font-medium truncate">{title}</p>
        <p className="text-xs sm:text-sm text-gray-500">{`$${base_price} Per Night`}</p>
      </Link>
    </div>
  );
}
