"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Country = { geonameId: number; countryName: string; countryCode: string };
type City = { geonameId: number; name: string };
type PropertyType = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};
type Amenity = { id: number; name: string; icon: string; category: string };

type FormState = {
  title: string;
  description: string;
  countryGeonameId?: number;
  cityGeonameId?: number;
  townGeonameId?: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  base_price: number;
  property_type_id: number;
  amenityIds: number[];
};

export default function HostRegister() {
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 1,
    base_price: 0,
    property_type_id: 0,
    amenityIds: [],
  });

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // --- Location state ---
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const [towns, setTowns] = useState<City[]>([]);
  const [selectedTown, setSelectedTown] = useState<City | null>(null);

  // --- Types & Amenities ---
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  const onNum = (v: string) => (v === "" ? 0 : Number(v));

  // Fetch countries
  useEffect(() => {
    fetch(
      `https://secure.geonames.org/countryInfoJSON?username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}`
    )
      .then((res) => res.json())
      .then((data) => setCountries(data.geonames || []))
      .catch((err) => console.error("Failed to fetch countries:", err));
  }, []);

  // Fetch cities when country changes
  useEffect(() => {
    if (selectedCountry) {
      setCities([]);
      setSelectedCity(null);
      setTowns([]);
      setSelectedTown(null);

      fetch(
        `https://secure.geonames.org/searchJSON?country=${selectedCountry.countryCode}&featureClass=P&maxRows=1000&username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}`
      )
        .then((res) => res.json())
        .then((data) => setCities(data.geonames || []))
        .catch((err) => console.error("Failed to fetch cities:", err));

      setForm((f) => ({ ...f, countryGeonameId: selectedCountry.geonameId }));
    }
  }, [selectedCountry]);

  // Fetch towns when city changes
  useEffect(() => {
    if (selectedCity) {
      setTowns([]);
      setSelectedTown(null);

      fetch(
        `https://secure.geonames.org/childrenJSON?geonameId=${selectedCity.geonameId}&username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}`
      )
        .then((res) => res.json())
        .then((data) => setTowns(data.geonames || []))
        .catch((err) => console.error("Failed to fetch towns:", err));

      setForm((f) => ({ ...f, cityGeonameId: selectedCity.geonameId }));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedTown) {
      setForm((f) => ({ ...f, townGeonameId: selectedTown.geonameId }));
    }
  }, [selectedTown]);

  // Fetch property types & amenities from DB
  useEffect(() => {
    fetch("/api/getPropertyTypes")
      .then((res) => res.json())
      .then((data) => setPropertyTypes(data))
      .catch((err) => console.error("Failed to fetch property types:", err));

    fetch("/api/getAmenities")
      .then((res) => res.json())
      .then((data) => setAmenities(data))
      .catch((err) => console.error("Failed to fetch amenities:", err));
  }, []);

  // --- File handlers ---
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []);
    if (files.length + picked.length > 5) {
      alert("Please select a maximum of 5 images total");
      return;
    }
    setFiles((prev) => [...prev, ...picked]);
    e.target.value = "";
  };
  const removeFile = (i: number) =>
    setFiles((prev) => prev.filter((_, idx) => idx !== i));

  // --- Submit handler ---
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.title || !form.description) {
      alert("Please fill in title and description");
      return;
    }
    if (!form.property_type_id) {
      alert("Please choose a property type");
      return;
    }
    if (!form.address) {
      alert("Please enter an address");
      return;
    }
    if (!selectedCountry || !selectedCity || !selectedTown) {
      alert("Please select country, city, and town");
      return;
    }
    if (files.length === 0) {
      alert("Please add at least one image");
      return;
    }
    if (form.bedrooms < 1 || form.bathrooms < 1 || form.max_guests < 1) {
      alert("Bedrooms, bathrooms, and guests must be at least 1");
      return;
    }
    if (form.base_price <= 0) {
      alert("Please enter a valid price");
      return;
    }

    setSubmitting(true);

    try {
      const fd = new FormData();

      // Prepare payload with location names instead of IDs
      const payload = {
        ...form,
        countryName: selectedCountry.countryName,
        countryCode: selectedCountry.countryCode,
        cityName: selectedCity.name,
        townName: selectedTown.name,
      };

      fd.append("payload", JSON.stringify(payload));
      files.forEach((f) => fd.append("images", f));

      const res = await fetch("/api/host/register", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create property");
      }

      alert("Property created successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        address: "",
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 1,
        base_price: 0,
        property_type_id: 0,
        amenityIds: [],
      });
      setFiles([]);
      setSelectedCountry(null);
      setSelectedCity(null);
      setSelectedTown(null);
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        error instanceof Error ? error.message : "Failed to create property"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Become a Host</h1>

      {/* Title + Description */}
      <div className="space-y-4">
        <input
          className="w-full border rounded p-2"
          placeholder="Property Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />
        <textarea
          className="w-full border rounded p-2 min-h-[100px]"
          placeholder="Property Description"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          required
        />
      </div>

      {/* Location Selects */}
      <div className="space-y-4">
        <h2 className="font-semibold">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="border p-2 rounded"
            value={selectedCountry?.geonameId || ""}
            onChange={(e) =>
              setSelectedCountry(
                countries.find((c) => c.geonameId === Number(e.target.value)) ||
                  null
              )
            }
            required
          >
            <option value="">- Choose Country -</option>
            {countries.map((c) => (
              <option key={c.geonameId} value={c.geonameId}>
                {c.countryName}
              </option>
            ))}
          </select>

          {selectedCountry && (
            <select
              className="border p-2 rounded"
              value={selectedCity?.geonameId || ""}
              onChange={(e) =>
                setSelectedCity(
                  cities.find((c) => c.geonameId === Number(e.target.value)) ||
                    null
                )
              }
              required
            >
              <option value="">- Choose City -</option>
              {cities.map((c) => (
                <option key={c.geonameId} value={c.geonameId}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          {selectedCity && (
            <select
              className="border p-2 rounded"
              value={selectedTown?.geonameId || ""}
              onChange={(e) =>
                setSelectedTown(
                  towns.find((t) => t.geonameId === Number(e.target.value)) ||
                    null
                )
              }
              required
            >
              <option value="">- Choose Town -</option>
              {towns.map((t) => (
                <option key={t.geonameId} value={t.geonameId}>
                  {t.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Address field */}
        <input
          className="w-full border rounded p-2"
          placeholder="Street Address"
          value={form.address}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          required
        />
      </div>

      {/* Property Types */}
      <div>
        <h2 className="font-semibold mb-2">Select Property Type</h2>
        <div className="flex flex-wrap gap-4">
          {propertyTypes.map((pt) => {
            const selected = form.property_type_id === pt.id;
            return (
              <div
                key={pt.id}
                onClick={() =>
                  setForm((f) => ({ ...f, property_type_id: pt.id }))
                }
                className={`cursor-pointer border rounded p-3 flex flex-col items-center w-32 hover:shadow-md transition-all ${
                  selected ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
              >
                <Image
                  src={`/icons/${pt.image_url}`}
                  alt={pt.name}
                  width={64}
                  height={64}
                />
                <p className="text-sm mt-2 text-center">{pt.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h2 className="font-semibold mb-2">Select Amenities</h2>
        <div className="flex flex-wrap gap-4">
          {amenities.map((a) => {
            const selected = form.amenityIds.includes(a.id);
            return (
              <div
                key={a.id}
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    amenityIds: selected
                      ? f.amenityIds.filter((id) => id !== a.id)
                      : [...f.amenityIds, a.id],
                  }))
                }
                className={`cursor-pointer border rounded p-3 flex flex-col items-center w-24 hover:shadow-md transition-all ${
                  selected ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
              >
                <Image src={a.icon} alt={a.name} width={48} height={48} />
                <p className="text-xs mt-1 text-center">{a.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Property Details */}
      <div>
        <h2 className="font-semibold mb-2">Property Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-1">Bedrooms</label>
            <input
              type="number"
              min={1}
              className="border p-2 rounded w-full"
              value={form.bedrooms}
              onChange={(e) =>
                setForm((f) => ({ ...f, bedrooms: onNum(e.target.value) }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Bathrooms</label>
            <input
              type="number"
              min={1}
              step="0.5"
              className="border p-2 rounded w-full"
              value={form.bathrooms}
              onChange={(e) =>
                setForm((f) => ({ ...f, bathrooms: onNum(e.target.value) }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Max Guests</label>
            <input
              type="number"
              min={1}
              className="border p-2 rounded w-full"
              value={form.max_guests}
              onChange={(e) =>
                setForm((f) => ({ ...f, max_guests: onNum(e.target.value) }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Price per Night ($)</label>
            <input
              type="number"
              min={1}
              className="border p-2 rounded w-full"
              value={form.base_price}
              onChange={(e) =>
                setForm((f) => ({ ...f, base_price: onNum(e.target.value) }))
              }
              required
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block font-semibold mb-2">
          Property Images (up to 5)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          disabled={files.length >= 5}
        />
        {files.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
            {files.map((f, i) => (
              <div key={i} className="relative border rounded overflow-hidden">
                <Image
                  width={200}
                  height={200}
                  src={URL.createObjectURL(f)}
                  alt={`img-${i}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        disabled={submitting}
        type="submit"
        className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 disabled:bg-gray-400"
      >
        {submitting ? "Creating Property..." : "Create Property"}
      </button>
    </form>
  );
}
