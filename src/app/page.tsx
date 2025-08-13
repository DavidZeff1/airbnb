import Header from "@/app/ui/landingPage/header";
import Footer from "@/app/ui/landingPage/Footer";
import CardSlideContainer from "@/app/ui/landingPage/CardSlideContainer";
import { Suspense } from "react";
import TripSkeletons from "./(pages)/trips/ui/skeletons/TripSkeletons";

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<TripSkeletons />}>
        <CardSlideContainer />
      </Suspense>

      <Footer />
    </>
  );
}
