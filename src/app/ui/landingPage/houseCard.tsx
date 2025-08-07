import Image from "next/image";

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
    <div className="bg-white h-auto w-60 rounded-lg flex-shrink-0 flex flex-col justify-between gap-3">
      <div className="relative w-full grow hover:cursor-pointer">
        <Image src={image_url} alt="house image" fill className="rounded-3xl" />
      </div>
      <div className="w-full text-xs">{title}</div>
      <div className="w-full text-xs font-light text-gray-500">
        {`$${base_price} Per Night`}
      </div>
    </div>
  );
}
