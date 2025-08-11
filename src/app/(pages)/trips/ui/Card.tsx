import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Card({
  property_id,
  property_image_url,
  property_title,
  property_price,
}: {
  property_id: number;
  property_image_url: string;
  property_title: string;
  property_price: string;
}) {
  const router = useRouter();

  const HandlePropertyClicked = () => {
    const params = new URLSearchParams({ id: String(property_id) });
    router.push(`/property?${params.toString()}`);
  };
  return (
    <div
      onClick={HandlePropertyClicked}
      className="flex flex-col w-60 h-70 p-3 hover:cursor-pointer"
    >
      <div className="grow relative h-fit mb-2 ">
        <Image
          src={property_image_url}
          alt="house image"
          fill
          className="rounded-3xl"
        />
      </div>
      <div className="w-full text-xs font-semibold text-gray-500 mb-2">
        {`${property_title}`}
      </div>
      <div className="w-full text-xs text-gray-500 mb-2">
        <p> {`$ ${property_price} Per Night`}</p>
      </div>
    </div>
  );
}
