import Image from "next/image";

export default function DropDownCard() {
  return (
    <div className="w-full h-20 flex items-center gap-3 hover:bg-gray-100 rounded-3xl">
      <Image
        src="/icons/nav.png"
        alt="Location Icon"
        width={80}
        height={80}
        className="h-full object-cover rounded-3xl"
      />
      <div className="flex-10 h-full translate-y-6">
        <p className="text-sm">Nearby</p>
        <p className="text-xs text-gray-500">Find Whats Around You</p>
      </div>
    </div>
  );
}
