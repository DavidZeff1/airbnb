import Image from "next/image";
import { Booking, fullPropertyData } from "../../property/types/types";
import { useEffect, useState } from "react";

export default function BookingSummaryCardContainer({
  booking,
}: {
  booking: Booking;
}) {
  const [property, setProperty] = useState<fullPropertyData>();
  useEffect(() => {
    fetch(`/api/getPropertyLight?id=${booking.property_id}`).then(
      (response) => {
        response.json().then((data) => {
          setProperty(data[0]);
        });
      }
    );
  }, [booking.property_id]);
  return (
    <div className="col-span-4  rounded-3xl pt-10 ">
      <div className=" h-fit rounded-3xl flex flex-col border-2 border-gray-200 gap-5 p-5 shadow-xl">
        <div className=" flex gap-5">
          <Image
            width={150}
            height={150}
            src={"/images/HomesPics/home1.jpg"}
            alt="pic of house"
            className="rounded-2xl"
          />

          <div className="font-semibold text-xl self-center">
            {property?.title}
          </div>
        </div>

        <div className="  border-b-2 border-gray-300 pb-5">
          <div className="font-semibold">Trip details</div>
          <div className="">{`${booking.check_in_date?.toDateString()} – ${booking.check_out_date?.toDateString()}`}</div>
        </div>
        <div className="  border-b-2 border-gray-300 pb-5">
          <div className="font-semibold">Price details</div>
          <div className="">{`${booking.amount_of_nights} nights x $ ${property?.base_price}`}</div>
          <div className="">{`$ ${booking.total_price}`}</div>
        </div>
        <div className="">
          <div className="font-semibold">Total</div>
          <div className="">{`$ ${booking.total_price}`}</div>
        </div>
      </div>
    </div>
  );
}
