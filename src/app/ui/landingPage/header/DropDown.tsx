import DropDownCard from "./DropDownCard";

export default function DropDown() {
  return (
    <div className="absolute bg-white h-110 w-90 left-0 top-23 text-left rounded-3xl z-10 flex flex-col justify-start gap-2 p-4 border-2 border-gray-200 shadow-lg overflow-y-auto">
      <div className="text-xs">
        <p>Suggested Destinations</p>
      </div>

      <DropDownCard />
      <DropDownCard />
      <DropDownCard />
      <DropDownCard />
      <DropDownCard />
      <DropDownCard />
    </div>
  );
}
