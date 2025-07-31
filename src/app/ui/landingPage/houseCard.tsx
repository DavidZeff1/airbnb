import Image from "next/image";

import { HouseCardProps } from "@/app/interfaces";

export default function HouseCard({
  city,
  date,
  price,
  imageUrl,
}: HouseCardProps) {
  return (
    <div className="bg-white h-auto w-70 rounded-lg flex-shrink-0 flex flex-col justify-between gap-1">
      <div className="relative w-full grow-7 hover:cursor-pointer">
        <Image src={imageUrl} alt="house image" fill className="rounded-3xl" />
      </div>
      <div className="w-full text-xs">{`Apartment in ${city}`}</div>
      <div className="w-full text-xs font-light text-gray-500">{date}</div>
      <div className="w-full text-xs font-light text-gray-500">{price}</div>
    </div>
  );
}
