import Image from "next/image";

export default function SignInMessage() {
  return (
    <>
      <div className="fixed top-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-green-100 p-3 rounded-lg shadow-md">
        <Image
          src={`/icons/checked.png`}
          alt="check mark"
          width={20}
          height={20}
        />
        <div>Successfully Signed in</div>
      </div>
    </>
  );
}
