import DropDownCard from "./DropDownCard";

export default function DropDown() {
  return (
    <div
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      className="absolute bg-white h-110 w-90  top-23 text-left rounded-3xl z-10 flex flex-col justify-start gap-2 p-4 border-2 border-gray-200 shadow-lg overflow-y-auto"
    >
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
