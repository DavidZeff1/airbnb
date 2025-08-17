import Image from "next/image";
import { SetStateAction, Dispatch } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function SignUpModal({
  SetIsModalClicked,
}: {
  SetIsModalClicked: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();

  const handleSignIn = async (provider: string) => {
    await signIn(provider, { redirect: false });
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  return (
    <>
      <div
        onClick={() => SetIsModalClicked(false)}
        className="fixed bg-gray-200 opacity-50 top-0 left-0 w-full h-full z-10"
      ></div>
      <div className="fixed flex flex-col bg-white z-20 rounded-3xl min-h-60 w-125 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-5 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div
            onClick={() => SetIsModalClicked(false)}
            className="font-semibold cursor-pointer hover:bg-gray-100 rounded-full h-7 w-7 text-center flex items-center justify-center"
          >
            ×
          </div>
          <div className="text-center font-semibold">
            {session ? "Welcome!" : "Log in or sign up to book"}
          </div>
          <div className="w-7"></div> {/* Spacer for centering */}
        </div>

        <SignUpLinks
          SignIn={handleSignIn}
          SignOut={handleSignOut}
          session={session}
        />
      </div>
    </>
  );
}

const links = ["facebook", "google", "github"];

const SignUpLinks = ({
  SignIn,
  SignOut,
  session,
}: {
  SignIn: (provider: string) => void;
  SignOut: () => void;
  session: Session | null;
}) => (
  <div className="flex justify-between">
    {links.map((link, index) => {
      return (
        <div
          key={index + link}
          onClick={() => {
            if (!session) {
              SignIn(link);
            } else {
              SignOut();
            }
          }}
          className="cursor-pointer rounded-xl h-15 w-30 border border-gray-800 relative border-1 border-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Image
            src={`/icons/${link}.png`}
            alt={`Sign in with ${link}`}
            width={25}
            height={25}
            className="rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          />
        </div>
      );
    })}
  </div>
);
