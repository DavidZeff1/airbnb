import HouseCard from "@/app/ui/landingPage/houseCard";
import { CityProps } from "@/app/interfaces";
import { houses } from "@/app/data/housesData";
import sql from "@/app/lib/db";
import { z } from "zod"; // Assuming you have a housesData file

export default async function CardSlide({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const propertySchema = z.object({
    id: z.number(),
    city: z.string(),
    date: z.number(),
    price: z.string(),
    imageUrl: z.number(),
  });

  const propertiesRaw = await sql`
    SELECT c.id, c.name, count(p.id) 
FROM cities c
JOIN towns t ON c.id = t.city_id 
JOIN properties p ON p.town_id = t.id 
GROUP BY c.id, c.name
ORDER BY count(p.id) DESC
  `;
  const properties = propertySchema.array().parse(propertiesRaw);

  const PropertiesPerCity = [
    [{ id: "", city: "", date: "", price: "", imageUrl: "" }, {}],
    [{}, {}],
    [{}, {}],
  ];
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
