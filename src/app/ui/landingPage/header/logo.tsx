import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative h-30 w-50 hover:cursor-pointer">
      <Image
        src="/logos/PlacePalLogo.png"
        alt="Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
