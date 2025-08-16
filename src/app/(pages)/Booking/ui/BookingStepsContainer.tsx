import { Booking } from "../../property/types/types";
import { useState } from "react";

export default function BookingStepsContainer({
  booking,
}: {
  booking: Booking;
}) {
  const [isModalClicked, SetIsModalClicked] = useState(false);
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
        {isModalClicked && (
          <>
            <div
              onClick={() => SetIsModalClicked(false)}
              className="fixed bg-gray-200 opacity-50 top-0 left-0 w-full h-full z-10"
            ></div>
            <div className="fixed flex flex-col justify-between bg-blue-100 z-20 rounded-3xl h-40 w-125 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-5">
              <div
                onClick={() => SetIsModalClicked(false)}
                className="bg-gray-100 font-semibold cursor-pointer"
              >
                X
              </div>
              <div className="bg-gray-100 text-center font-semibold">
                Log in or sign up to book
              </div>
              <div className="bg-gray-100 flex justify-between">
                <div className="bg-blue-500 rounded-xl h-15 w-30 border border-gray-800"></div>
                <div className="bg-blue-500 rounded-xl h-15 w-30 border border-gray-800"></div>
                <div className="bg-blue-500 rounded-xl h-15 w-30 border border-gray-800"></div>
              </div>
            </div>
          </>
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
