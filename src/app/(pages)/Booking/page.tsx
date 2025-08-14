import Logo from "@/app/ui/landingPage/header/logo";
import Link from "next/link";
import Footer from "@/app/ui/landingPage/Footer";
import MainBookingBody from "./ui/MainBookingBody";
import { Suspense } from "react";

export default function Booking() {
  return (
    <>
      <header className="bg-gray-100 grid grid-cols-1 h-30 p-4 relative ">
        <Link href="/" className="cursor-pointer absolute top-0 left-5">
          <Logo />
        </Link>
      </header>
      <Suspense>
        <MainBookingBody />
      </Suspense>
      <Footer />;
    </>
  );
}
