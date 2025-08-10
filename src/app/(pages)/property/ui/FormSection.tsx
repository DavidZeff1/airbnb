export default function FormSection() {
  return (
    <div className="col-span-4 rounded-3xl h-70 sticky top-0 shadow-lg grid grid-cols-12 grid-rows-12 gap-3 p-4 ">
      <div className="font-semibold text-2xl row-span-2 col-span-12 overflow-hidden">
        Add Dates For Prices
      </div>
      <div className="col-span-12 grid grid-cols-12 grid-rows-2 row-span-6 rounded-3xl border-2 border-gray-300">
        <div className="col-span-6 row-span-1 pt-1 pl-2 border-b-2 border-r-2 border-gray-300 overflow-hidden">
          <strong className="font-sm">Check-In</strong>
          <br />
          <p>Add Dates</p>
        </div>
        <div className="col-span-6 row-span-1 pt-1 pl-2 border-b-2  border-gray-300 overflow-hidden">
          <strong className="font-sm">Check-Out</strong>
          <br />
          <p>Add Dates</p>
        </div>
        <div className="col-span-12 row-span-1 pt-1 pl-2  border-gray-300 overflow-hidden">
          <strong className="font-sm">Guests</strong>
          <br />
          <p>Add Guests</p>
        </div>
      </div>
      <div className="col-span-12  bg-gradient-to-r from-red-300 to-red-500 row-span-3 rounded-3xl  relative">
        <p className=" text-white top-1/2 translate-y-1/2  text-center ">
          Submit
        </p>
      </div>
    </div>
  );
}
