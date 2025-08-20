import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="relative block h-30 w-50 hover:cursor-pointer">
      <Image
        src="/logos/PlacePalLogo.png"
        alt="Logo"
        fill
        className="object-contain"
      />
    </Link>
  );
}
