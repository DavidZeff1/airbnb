import Image from "next/image";

import { useTrip } from "../Context/TripContext";

type WhereProps = {
  id: number;
  imageSrc: string;
  title: string;
  country: string;
  description: string;
};

export default function DropDownCard({
  id,
  imageSrc,
  title,
  country,
  description,
}: WhereProps) {
  const { setWhere } = useTrip();

  return (
    <div
      onClick={() => setWhere({ id, imageSrc, title, description })}
      className="w-full h-fit flex items-center gap-3 hover:bg-gray-100 rounded-3xl "
    >
      <Image
        src={imageSrc}
        alt="Location Icon"
        width={80}
        height={80}
        className="h-full object-cover rounded-3xl"
      />
      <div className="">
        <p className="text-sm">{`${title}, ${country}`}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
