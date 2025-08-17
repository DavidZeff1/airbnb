import { Booking } from "../../property/types/types";
import { useState } from "react";
import SignUpModal from "./SignUpModal";
import { useSession } from "next-auth/react";

export default function BookingStepsContainer({
  booking,
}: {
  booking: Booking;
}) {
  const [isModalClicked, SetIsModalClicked] = useState(false);
  const { data: session } = useSession();
  return (
    <div className="col-span-8 flex flex-col gap-10 rounded-3xl pt-10 pr-10 ">
      <div className=" rounded-3xl p-5 flex flex-col border-2 border-gray-200 shadow-xl">
        <div className="font-semibold text-xl py-3">1. Choose When To Pay</div>
        <div className="py-3 border-b-2 border-gray-300">{`Pay $ ${booking.total_price} now`}</div>
        <div className="py-3 border-b-2 border-gray-300 ">
          Pay part now, part later
        </div>
        <div
          onClick={() => SetIsModalClicked((prev) => !prev)}
          className=" bg-gray-800 rounded-2xl text-white w-fit px-6 py-3 mt-3 self-end hover:cursor-pointer hover:bg-gray-700"
        >
          Next
        </div>
        {isModalClicked &&
          (session ? (
            <>
              <SignUpModal SetIsModalClicked={SetIsModalClicked} />
              <div>{`${session.user?.email} ${session.user?.image} ${session.user?.name}`}</div>
            </>
          ) : (
            <SignUpModal SetIsModalClicked={SetIsModalClicked} />
          ))}
      </div>
      <div className=" rounded-3xl p-5 flex flex-col border-2 border-gray-200 shadow-xl">
        <div className="font-semibold text-xl py-3">2. Add Payment Method</div>
      </div>
      <div className=" rounded-3xl p-5 flex flex-col border-2 border-gray-200 shadow-xl">
        <div className="font-semibold text-xl py-3">3. Review your request</div>
      </div>
    </div>
  );
}
