import Image from "next/image";

export default function TripBody() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-70 h-auto">
        <div className="flex flex-col w-80 h-80 p-3">
          <div className="grow relative h-fit ">
            <Image
              src="/images/HomesPics/home1.jpg"
              alt="house image"
              fill
              className="rounded-3xl"
            />
          </div>
          <div className="w-full text-xs font-semibold text-gray-500">
            Room in Kerem
          </div>{" "}
          <div className="w-full text-xs text-gray-500">
            <p>Stay with chaya Amazing central aprt</p>
          </div>
          <div className="w-full text-xs text-gray-500">
            <p>Aug 23 - 28</p>
          </div>
          <div className="w-full text-xs text-gray-500">
            <p> $500 for 5 nights</p>
          </div>
        </div>
      </div>
    </>
  );
}
