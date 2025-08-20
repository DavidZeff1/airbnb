"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <div className="relative flex justify-center">
      <div className="grid grid-cols-[3fr_3fr_1fr] gap-5 h-10 w-auto">
        <button className="text-sm h-10 w-fit cursor-pointer hover:bg-gray-200 rounded-full">
          Become A Host
        </button>
        {session ? (
          <button
            onClick={() => signOut()}
            className="h-10 w-fit cursor-pointer hover:bg-red-200 bg-red-100 rounded-full flex items-center justify-center gap-3 p-3"
          >
            <Image
              src="/icons/logout.png"
              alt="Language selector"
              width={25}
              height={25}
            />
            <p>Log Out</p>
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="h-10 w-fit cursor-pointer hover:bg-green-200 bg-green-100 rounded-full flex items-center justify-center gap-3 p-3"
          >
            <Image
              src="/icons/log-in.png"
              alt="Language selector"
              width={25}
              height={25}
            />
            <p>Log In</p>
          </button>
        )}

        {!isHamburgerOpen ? (
          <button
            onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
            className="h-10 w-10 cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-full flex items-center justify-center"
          >
            <Image
              src="/icons/hamburger.png"
              alt="Menu"
              width={20}
              height={20}
            />
          </button>
        ) : (
          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center relative">
            <button
              onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              className="h-full w-full hover:bg-gray-300 cursor-pointer rounded-full flex items-center justify-center "
            >
              <Image src="/icons/menu.png" alt="Menu" width={20} height={20} />
            </button>
            <div>
              <ul className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-48 z-10">
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  <a href="/userBookings">My Bookings</a>
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  <a href="/userProfile">Profile</a>
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  <a href="/settings">Settings</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
