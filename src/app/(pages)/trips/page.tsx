import Header from "@/app/ui/landingPage/header";
import Footer from "@/app/ui/landingPage/Footer";
import TripBody from "./ui/TripBody";
import { Suspense } from "react";
export default function Trips() {
  return (
    <>
      <Header />
      <Suspense>
        <TripBody />
      </Suspense>

      <Footer />
    </>
  );
}
