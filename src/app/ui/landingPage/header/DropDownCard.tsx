import Image from "next/image";

import { useTrip } from "../Context/TripContext";

type WhereProps = {
  imageSrc: string;
  title: string;
  description: string;
};

export default function DropDownCard({
  imageSrc,
  title,
  description,
}: WhereProps) {
  const { setWhere } = useTrip();

  return (
    <div
      onClick={() => setWhere({ imageSrc, title, description })}
      className="w-full h-20 flex items-center gap-3 hover:bg-gray-100 rounded-3xl "
    >
      <Image
        src={imageSrc}
        alt="Location Icon"
        width={80}
        height={80}
        className="h-full object-cover rounded-3xl"
      />
      <div className="flex-10 h-full translate-y-6 ">
        <p className="text-sm">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
