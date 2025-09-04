import { useState, useEffect } from "react";

type Country = {
  geonameId: number;
  countryName: string;
  countryCode: string;
};

type Location = {
  geonameId: number;
  name: string;
};

export default function ChooseLocationContainer() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [cities, setCities] = useState<Location[]>([]);
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);

  const [neighborhoods, setNeighborhoods] = useState<Location[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<Location | null>(null);

  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    fetch(
      `http://api.geonames.org/countryInfoJSON?username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.geonames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setCities([]);
      setSelectedCity(null);
      setNeighborhoods([]);
      setSelectedNeighborhood(null);

      fetch(
        `http://api.geonames.org/searchJSON?country=${selectedCountry.countryCode}&featureClass=P&maxRows=1000&username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCities(data.geonames || []);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity) {
      setNeighborhoods([]);
      setSelectedNeighborhood(null);

      fetch(
        `http://api.geonames.org/childrenJSON?geonameId=${selectedCity.geonameId}&username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}`
      )
        .then((res) => res.json())
        .then((data) => {
          setNeighborhoods(data.geonames || []);
        })
        .catch((error) => {
          console.error("Error fetching neighborhoods:", error);
        });
    }
  }, [selectedCity]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = parseInt(e.target.value);
    const country = countries.find((c) => c.geonameId === countryId) || null;
    setSelectedCountry(country);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = parseInt(e.target.value);
    const city = cities.find((c) => c.geonameId === cityId) || null;
    setSelectedCity(city);
  };

  const handleNeighborhoodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const neighborhoodId = parseInt(e.target.value);
    const neighborhood =
      neighborhoods.find((n) => n.geonameId === neighborhoodId) || null;
    setSelectedNeighborhood(neighborhood);
  };

  return (
    <div className="p-3 border border-gray-100 shadow rounded">
      <h1 className="mb-3">Select Property Location</h1>
      <div>
        <div>
          <h3>Country</h3>
          <select
            className="border border-gray-300 p-2 rounded w-full mb-3 font-light"
            value={selectedCountry?.geonameId || ""}
            onChange={handleCountryChange}
          >
            <option value="">-Choose Country-</option>
            {countries.map((country) => (
              <option
                className="font-light"
                key={country.geonameId}
                value={country.geonameId}
              >
                {country.countryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3>City</h3>
          <select
            className="border border-gray-300 p-2 rounded w-full mb-3 font-light"
            value={selectedCity?.geonameId || ""}
            onChange={handleCityChange}
            disabled={!selectedCountry}
          >
            <option value="">-Choose City-</option>
            {cities.map((city) => (
              <option
                className="font-light "
                key={city.geonameId}
                value={city.geonameId}
              >
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3>Neighborhood</h3>
          <select
            className="border border-gray-300 p-2 rounded w-full mb-3 font-light"
            value={selectedNeighborhood?.geonameId || ""}
            onChange={handleNeighborhoodChange}
            disabled={!selectedCity}
          >
            <option value="">-Choose Neighborhood-</option>
            {neighborhoods.map((neighborhood) => (
              <option
                className="font-light"
                key={neighborhood.geonameId}
                value={neighborhood.geonameId}
              >
                {neighborhood.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <h3>Street Address</h3>
          <input
            type="text"
            placeholder="Street Address"
            className="border border-gray-300 p-2 rounded w-full font-light"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <h3>Postal Code</h3>
          <input
            type="text"
            placeholder="Postal Code"
            className="border border-gray-300 p-2 rounded w-full font-light"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
