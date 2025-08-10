import Header from "@/app/ui/landingPage/header";
import Footer from "@/app/ui/landingPage/Footer";
import PropertyBody from "./ui/PropertyBody";
import { Suspense } from "react";

export default function property() {
  return (
    <>
      <Header />
      <Suspense>
        <PropertyBody />
      </Suspense>
      <Footer />;
    </>
  );
}
