import Logo from "@/app/ui/landingPage/header/logo";
import SearchBar from "@/app/ui/landingPage/header/searchBar";
import UserMenu from "@/app/ui/landingPage/header/userMenu";
import { TripProvider } from "./Context/TripContext";

export default function Header() {
  return (
    <header
      className="bg-gray-100 h-auto p-2 sm:p-3 md:p-4 items-center gap-2 sm:gap-3
      grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr]"
    >
      {/* Logo: hidden on mobile, visible md+ */}
      <div className="hidden md:block justify-self-start">
        <Logo />
      </div>

      <TripProvider>
        {/* Search bar always visible, full-width on mobile */}
        <SearchBar />
      </TripProvider>

      {/* UserMenu: hidden on mobile, visible md+ */}
      <div className="hidden md:block justify-self-end">
        <UserMenu />
      </div>
    </header>
  );
}
