import Image from "next/image";

type CardProps = {
  id: number;
  imgUrl: string;
  decription: string;
  city: string;
  country: string;
  costPerNight: number;
  hostId: number;
  hostName: string;
};

export default function Card({
  imgUrl,
  decription,
  city,
  costPerNight,
}: CardProps) {
  return (
    <div className="flex flex-col w-70 h-80 p-3">
      <div className="grow relative h-fit ">
        <Image src={imgUrl} alt="house image" fill className="rounded-3xl" />
      </div>
      <div className="w-full text-xs font-semibold text-gray-500">
        {`Room in ${city}`}
      </div>
      <div className="w-full text-xs text-gray-500">
        <p>{decription}</p>
      </div>
      <div className="w-full text-xs text-gray-500">
        <p>Aug 23 - 28</p>
      </div>
      <div className="w-full text-xs text-gray-500">
        <p> {`$ ${costPerNight} for 5 nights`}</p>
      </div>
    </div>
  );
}
