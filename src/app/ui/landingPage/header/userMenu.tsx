import Image from "next/image";

export default function UserMenu() {
  return (
    <div className="relative flex justify-center">
      <div className="grid grid-cols-[3fr_1fr_1fr] gap-5 h-10 w-auto">
        <button className="text-sm h-10 w-auto cursor-pointer hover:bg-gray-200 rounded-full">
          Become A Host
        </button>

        <button className="h-10 w-10 cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-full flex items-center justify-center">
          <Image
            src="/icons/internet.png"
            alt="Language selector"
            width={25}
            height={25}
          />
        </button>

        <button className="h-10 w-10 cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-full flex items-center justify-center">
          <Image src="/icons/hamburger.png" alt="Menu" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
