import DropDownCard from "./DropDownCard";

const dropDownData = [
  {
    imageSrc: "/icons/nav.png",
    title: "Nearby",
    description: "Find places nearby",
    city: null,
    country: null,
  },
  {
    imageSrc: "/icons/nav.png",
    title: "Paris",
    description: "Known for the Eiffel Tower, world-class art museums.",
    city: "Paris",
    country: "France",
  },
  {
    imageSrc: "/icons/nav.png",
    title: "New York City",
    description:
      "Famous for Times Square, Broadway, and the Statue of Liberty.",
    city: "New York",
    country: "USA",
  },
  {
    imageSrc: "/icons/nav.png",
    title: "Tokyo",
    description:
      "Renowned for its futuristic skyline, sushi, and vibrant culture.",
    city: "Tokyo",
    country: "Japan",
  },
  {
    imageSrc: "/icons/nav.png",
    title: "Rome",
    description:
      "Home to the Colosseum, Vatican City, and ancient Roman history.",
    city: "Rome",
    country: "Italy",
  },
  {
    imageSrc: "/icons/nav.png",
    title: "London",
    description: "Known for Big Ben, the British Museum, and royal heritage.",
    city: "London",
    country: "United Kingdom",
  },
  {
    imageSrc: "/icons/nav.png",
    title: "Barcelona",
    description: "Famous for Gaudí architecture, beaches, and Catalan culture.",
    city: "Barcelona",
    country: "Spain",
  },
  {
    imageSrc: "/icons/nav.png",
    title: "Bangkok",
    description:
      "Known for ornate temples, street food, and vibrant nightlife.",
    city: "Bangkok",
    country: "Thailand",
  },
];

export default function DropDown() {
  return (
    <div className="absolute bg-white h-110 w-90 left-0 top-23 text-left rounded-3xl z-10 flex flex-col justify-start gap-2 p-4 border-2 border-gray-200 shadow-lg overflow-y-auto">
      <div className="text-xs">
        <p>Suggested Destinations</p>
      </div>
      {dropDownData.map((item, index) => (
        <DropDownCard
          key={index}
          imageSrc={item.imageSrc}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}
