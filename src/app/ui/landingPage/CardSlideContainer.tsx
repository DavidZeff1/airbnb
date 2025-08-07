import CardSlide from "@/app/ui/landingPage/cardSlide";
import sql from "@/app/lib/db";
import { z } from "zod";

export default async function CardSlideContainer() {
  const cities = await GetCities();

  return (
    <div>
      {cities.map((city) => (
        <CardSlide key={city.id} id={city.id} name={city.name} />
      ))}
    </div>
  );
}

async function GetCities() {
  // Add build-time protection
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not available - returning empty cities array");
    return [];
  }
  const CitySchema = z.object({
    id: z.number(),
    name: z.string(),
    property_count: z.coerce.number(),
  });

  const citiesRaw = await sql`
    SELECT c.id, c.name, count(p.id) as property_count
FROM cities c
JOIN towns t ON c.id = t.city_id 
JOIN properties p ON p.town_id = t.id 
GROUP BY c.id, c.name
ORDER BY count(p.id) DESC
  `;
  const cities = CitySchema.array().parse(citiesRaw);
  return cities;
}
