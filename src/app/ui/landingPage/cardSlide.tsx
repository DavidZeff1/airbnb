import HouseCard from "@/app/ui/landingPage/houseCard";
import { CityProps } from "@/app/interfaces";
import { houses } from "@/app/data/housesData"; // Assuming you have a housesData file

export default function CardSlide({ name }: CityProps) {
  return (
    <div>
      <div className=" h-75 w-auto mx-20 my-10 flex flex-col">
        <div>
          <p className="font-semibold">{`Popular homes in ${name} ${">"}`}</p>
        </div>
        <div className="flex-grow w-full flex gap-4 justify-start scrollbar-hide overflow-x-auto">
          {houses.map((house, index) => (
            <HouseCard key={index} {...house} />
          ))}
        </div>
      </div>
    </div>
  );
}
