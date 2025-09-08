import HouseCard from "@/app/ui/landingPage/houseCard";
import sql from "@/app/lib/db";
import { z } from "zod";

export default async function CardSlide({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const houses = await getPropertiesOfCity(id);
  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:mx-20 my-6 md:my-10 flex flex-col">
      <p className="font-semibold text-sm sm:text-base md:text-lg">
        {`Popular homes in ${name} >`}
      </p>
      <div className="flex w-full gap-4 overflow-x-auto scrollbar-hide p-3">
        {houses.map((house) => (
          <HouseCard key={house.id} {...house} />
        ))}
      </div>
    </div>
  );
}

async function getPropertiesOfCity(id: number) {
  const propertiesRaw = await sql`
      SELECT DISTINCT ON (p.id) 
       p.id, p.title, p.base_price, pi.image_url
FROM properties p
JOIN towns t ON p.town_id = t.id
JOIN cities c ON t.city_id = c.id
JOIN property_images pi ON pi.property_id = p.id
WHERE c.id = ${id}
    `;
  const propertySchema = z.object({
    id: z.number(),
    title: z.string(),
    base_price: z.coerce.number(),
    image_url: z.string(),
  });

  const properties = propertySchema.array().parse(propertiesRaw);
  return properties;
}
