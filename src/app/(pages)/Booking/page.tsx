"use client";
import Logo from "@/app/ui/landingPage/header/logo";
import Link from "next/link";
import Footer from "@/app/ui/landingPage/Footer";
import MainBookingBody from "./ui/MainBookingBody";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import LogOutButton from "./ui/LogOutButton";
import SignInMessage from "./ui/SignInMessage";
import SignOutMessage from "./ui/SignOutMessage";

export default function Booking() {
  const { data: session } = useSession();
  const prevSession = useRef<typeof session>(null);

  const [showLoggedInMessage, setShowLoggedInMessage] = useState(false);
  const [showLoggedOutMessage, setShowLoggedOutMessage] = useState(false);

  useEffect(() => {
    if (!prevSession.current && session) {
      setShowLoggedInMessage(true);
      const timer = setTimeout(() => setShowLoggedInMessage(false), 2000);
      return () => clearTimeout(timer);
    }

    if (prevSession.current && !session) {
      setShowLoggedOutMessage(true);
      const timer = setTimeout(() => setShowLoggedOutMessage(false), 2000);
      return () => clearTimeout(timer);
    }

    prevSession.current = session;
  }, [session]);

  return (
    <>
      <header className="bg-gray-100 h-30 p-4 relative">
        <Link href="/" className="cursor-pointer absolute top-0 left-5">
          <Logo />
        </Link>
        {session && <LogOutButton />}
        {showLoggedInMessage && <SignInMessage />}
        {showLoggedOutMessage && <SignOutMessage />}
      </header>
      <Suspense>
        <MainBookingBody />
      </Suspense>
      <Footer />
    </>
  );
}
