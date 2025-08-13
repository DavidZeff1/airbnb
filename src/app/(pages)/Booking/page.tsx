import Logo from "@/app/ui/landingPage/header/logo";
import Link from "next/link";
import Footer from "@/app/ui/landingPage/Footer";
import Image from "next/image";
export default function Booking() {
  return (
    <>
      <header className="bg-gray-100 grid grid-cols-1 h-30 p-4 relative ">
        <Link href="/" className="cursor-pointer absolute top-0 left-5">
          <Logo />
        </Link>
      </header>
      <div className="px-30 py-5">
        <h1 className="font-semibold text-2xl py-3 ">Make Booking</h1>
        <div className="grid grid-cols-12 gap-5 h-screen">
          <div className="col-span-8 flex flex-col gap-10 rounded-3xl pt-10 pr-10 ">
            <div className=" rounded-3xl p-5 flex flex-col border-2 border-gray-200 shadow-xl">
              <div className="font-semibold text-xl py-3">
                1. Choose When To Pay
              </div>
              <div className="py-3 border-b-2 border-gray-300">
                Pay ₪787.41 now
              </div>
              <div className="py-3 border-b-2 border-gray-300 ">
                Pay part now, part later
              </div>
              <div className=" bg-gray-800 rounded-2xl text-white w-fit px-6 py-3 mt-3 self-end hover:cursor-pointer hover:bg-gray-700">
                Next
              </div>
            </div>
            <div className=" rounded-3xl p-5 flex flex-col border-2 border-gray-200 shadow-xl">
              <div className="font-semibold text-xl py-3">
                2. Add Payment Method
              </div>
            </div>
            <div className=" rounded-3xl p-5 flex flex-col border-2 border-gray-200 shadow-xl">
              <div className="font-semibold text-xl py-3">
                3. Review your request
              </div>
            </div>
          </div>
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
                  Soko mini suite Tlv
                </div>
              </div>

              <div className="  border-b-2 border-gray-300 pb-5">
                <div className="font-semibold">Trip details</div>
                <div className="">Aug 29 – 31, 2025</div>
              </div>
              <div className="  border-b-2 border-gray-300 pb-5">
                <div className="font-semibold">Price details</div>
                <div className="">2 nights x ₪393.71</div>
                <div className="">₪787.41</div>
              </div>
              <div className="">
                <div className="font-semibold">Total</div>
                <div className="">ILS ₪787.41</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />;
    </>
  );
}
