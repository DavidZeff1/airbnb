import Image from "next/image";

export default function SignOutMessage() {
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-red-100 p-3 rounded-lg shadow-md">
      <Image
        src={`/icons/logout.png`}
        alt="check mark"
        width={20}
        height={20}
      />
      <div>Successfully Signed out</div>
    </div>
  );
}
