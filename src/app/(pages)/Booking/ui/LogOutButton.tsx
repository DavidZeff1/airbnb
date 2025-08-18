import Image from "next/image";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
  return (
    <div
      onClick={async () => await signOut()}
      className="absolute right-5 top-5 flex gap-3 content-center items-center bg-white rounded-2xl p-3 hover:cursor-pointer hover:bg-gray-200"
    >
      <Image
        src="/icons/logout.png"
        alt="log out icon"
        width={25}
        height={25}
      />
      <div>Log Out</div>
    </div>
  );
}
