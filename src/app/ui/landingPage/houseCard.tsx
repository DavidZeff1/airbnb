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
    <div className="h-auto w-75 flex-shrink-0">
      <Link
        href={`/property?id=${id}`}
        className="flex flex-col w-full h-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-50  hover:cursor-pointer"
      >
        <Image
          src={image_url || "/placeholder-image.png"}
          alt="Property"
          width={500}
          height={300}
          className="w-full h-60 rounded-lg shadow-md object-cover mb-3"
        />
        <p className="text-xs pb-3">{title}</p>

        <p className="text-xs font-light text-gray-500 pb-3 ">{`$${base_price} Per Night`}</p>
      </Link>
    </div>
  );
}
