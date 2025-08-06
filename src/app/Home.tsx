import { cities } from "./data/citiesData";
import CardSlide from "./ui/landingPage/cardSlide";
import Footer from "./ui/landingPage/Footer";
import Header from "./ui/landingPage/header";

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
