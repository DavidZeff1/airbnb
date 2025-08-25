import Logo from "@/app/ui/landingPage/header/logo";
import UserMenu from "@/app/ui/landingPage/header/userMenu";
import Footer from "@/app/ui/landingPage/Footer";
import HostRegisterContainer from "./ui/HostRegisterContainer";

export default function BecomeAHostPage() {
  return (
    <>
      <header className="bg-gray-100 grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] h-fit p-4 items-center">
        <div className="hidden md:block">
          <Logo />
        </div>
        <h1 className="text-center text-3xl">Host Registration</h1>
        <div className="hidden md:block">
          <UserMenu />
        </div>
      </header>
      <HostRegisterContainer />
      <Footer />
    </>
  );
}
