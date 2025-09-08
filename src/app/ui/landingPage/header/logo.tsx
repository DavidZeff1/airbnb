import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="relative block h-10 w-24 sm:h-12 sm:w-32 md:h-16 md:w-40"
    >
      <Image
        src="/logos/PlacePalLogo.png"
        alt="Logo"
        fill
        className="object-contain"
      />
    </Link>
  );
}
