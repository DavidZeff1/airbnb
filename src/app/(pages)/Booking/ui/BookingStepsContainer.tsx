import { Booking } from "../../property/types/types";
import { useState, useEffect, useRef } from "react";
import SignUpModal from "./SignUpModal";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function BookingStepsContainer({
  booking,
}: {
  booking: Booking;
}) {
  const [isModalClicked, SetIsModalClicked] = useState(false);
  const { data: session } = useSession();
  const [displaySignIn, SetDisplaySignIn] = useState(false);
  const [displaySignOut, SetDisplaySignOut] = useState(false);

  const prevSessionRef = useRef<typeof session>(null);

  useEffect(() => {
    if (session && !prevSessionRef.current) {
      SetDisplaySignIn(true);
      const timer = setTimeout(() => SetDisplaySignIn(false), 3000);
      return () => clearTimeout(timer);
    }

    if (!session && prevSessionRef.current) {
      SetDisplaySignOut(true);
      const timer = setTimeout(() => SetDisplaySignOut(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [session]);

  //  separate effect: update ref after the logic above runs
  useEffect(() => {
    prevSessionRef.current = session;
  }, [session]);

  return (
    <div className="col-span-8 flex flex-col gap-10 rounded-3xl pt-10 pr-10 ">
      <div className=" rounded-3xl p-5 flex flex-col border-2 border-gray-200 shadow-xl">
        {displaySignIn && <SignInMessage />}
        {displaySignOut && <SignOutMessage />}
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
        {isModalClicked && (
          <SignUpModal SetIsModalClicked={SetIsModalClicked} />
        )}
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

function SignInMessage() {
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-green-100 p-3 rounded-lg shadow-md">
      <Image
        src={`/icons/checked.png`}
        alt="check mark"
        width={20}
        height={20}
      />
      <div>Successfully Signed in</div>
    </div>
  );
}

function SignOutMessage() {
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-red-100 p-3 rounded-lg shadow-md">
      <Image
        src={`/icons/logout.png`}
        alt="check mark"
        width={20}
        height={20}
      />
      <div>Successfully Signed out</div>
    </div>
  );
}
