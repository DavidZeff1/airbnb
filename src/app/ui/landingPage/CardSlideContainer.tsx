import CardSlide from "@/app/ui/landingPage/cardSlide";
import sql from "@/app/lib/db";
import { z } from "zod";

export default async function CardSlideContainer() {
  const CitySchema = z.object({
    id: z.number(),
    name: z.string(),
  });

  const citiesRaw = await sql`
    SELECT c.id, c.name, count(p.id) 
FROM cities c
JOIN towns t ON c.id = t.city_id 
JOIN properties p ON p.town_id = t.id 
GROUP BY c.id, c.name
ORDER BY count(p.id) DESC
  `;

  const cities = CitySchema.array().parse(citiesRaw);

  return (
    <div>
      {cities.map((city) => (
        <CardSlide key={city.id} {...city} />
      ))}
    </div>
  );
}
