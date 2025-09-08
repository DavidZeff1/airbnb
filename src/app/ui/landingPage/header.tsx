import Logo from "@/app/ui/landingPage/header/logo";
import SearchBar from "@/app/ui/landingPage/header/searchBar";
import UserMenu from "@/app/ui/landingPage/header/userMenu";
import { TripProvider } from "./Context/TripContext";

export default function Header() {
  return (
    <header className="bg-gray-100 grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] h-50 p-4 items-center">
      <div className="hidden md:block">
        <Logo />
      </div>
      <TripProvider>
        <SearchBar />
      </TripProvider>
      <div className="hidden md:block">
        <UserMenu />
      </div>
    </header>
  );
}
