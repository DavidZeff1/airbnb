import { SetStateAction, Dispatch } from "react";
import SignUpModal from "./SignUpModal";
import { Booking } from "../../property/types/types";
import { useSession } from "next-auth/react";

export default function WhenToPayCard({
  booking,
  SetIsModalClicked,
  isModalClicked,
}: {
  booking: Booking;
  SetIsModalClicked: Dispatch<SetStateAction<boolean>>;
  isModalClicked: boolean;
}) {
  const { data: session } = useSession();
  return (
    <div className=" rounded-3xl p-5 flex flex-col border-2 border-gray-200 shadow-xl">
      <div className="font-semibold text-xl py-3">1. Choose When To Pay</div>
      {!session && (
        <>
          <div className="py-3 border-b-2 border-gray-300">{`Pay $ ${booking.total_price} now`}</div>

          <div
            onClick={() => SetIsModalClicked((prev) => !prev)}
            className=" bg-gray-800 rounded-2xl text-white w-fit px-6 py-3 mt-3 self-end hover:cursor-pointer hover:bg-gray-700"
          >
            Next
          </div>
        </>
      )}

      {isModalClicked && <SignUpModal SetIsModalClicked={SetIsModalClicked} />}
    </div>
  );
}
