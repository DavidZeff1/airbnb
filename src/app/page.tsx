import Header from "@/app/ui/landingPage/header";
import CardSlide from "@/app/ui/landingPage/cardSlide";
import Footer from "@/app/ui/landingPage/Footer";
import { cities } from "@/app/data/citiesData";

export default function Home() {
  return (
    <>
      <Header />
      {cities.map((city, index) => {
        return <CardSlide key={index} {...city} />;
      })}
      <Footer />
    </>
  );
}
