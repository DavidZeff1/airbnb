"use client";
import Card from "@/app/(pages)/trips/ui/Card";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function TripBody() {
  return (
    <>
      <div className="flex h-screen">
        {/* Left container - Scrollable cards */}
        <div className="w-6/10 overflow-y-auto p-4 scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* Right container - Fixed map */}
        <div className="w-4/10 rounded-lg m-4 h-screen overflow-hidden">
          <div className=" bg-blue-100 rounded-lg m-4  h-4/6">
            <MapContainer
              className="h-full w-full rounded-lg"
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}
const cards = [
  {
    id: 1,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Cozy mountain cabin with stunning views.",
    city: "Aspen",
    country: "USA",
    costPerNight: 180,
    hostId: 101,
    hostName: "Emily Johnson",
  },
  {
    id: 2,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Modern apartment in the heart of the city.",
    city: "Berlin",
    country: "Germany",
    costPerNight: 120,
    hostId: 102,
    hostName: "Lukas Schmidt",
  },
  {
    id: 3,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Beachfront villa with private pool.",
    city: "Nice",
    country: "France",
    costPerNight: 250,
    hostId: 103,
    hostName: "Sophie Dubois",
  },
  {
    id: 4,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Rustic countryside retreat.",
    city: "Tuscany",
    country: "Italy",
    costPerNight: 160,
    hostId: 104,
    hostName: "Marco Rossi",
  },
  {
    id: 5,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Stylish loft near downtown.",
    city: "Toronto",
    country: "Canada",
    costPerNight: 140,
    hostId: 105,
    hostName: "Ava Thompson",
  },
  {
    id: 512,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Stylish loft near downtown.",
    city: "Toronto",
    country: "Canada",
    costPerNight: 140,
    hostId: 105,
    hostName: "Ava Thompson",
  },
  {
    id: 16,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Cozy mountain cabin with stunning views.",
    city: "Aspen",
    country: "USA",
    costPerNight: 180,
    hostId: 101,
    hostName: "Emily Johnson",
  },
  {
    id: 25,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Modern apartment in the heart of the city.",
    city: "Berlin",
    country: "Germany",
    costPerNight: 120,
    hostId: 102,
    hostName: "Lukas Schmidt",
  },
  {
    id: 34,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Beachfront villa with private pool.",
    city: "Nice",
    country: "France",
    costPerNight: 250,
    hostId: 103,
    hostName: "Sophie Dubois",
  },
  {
    id: 43,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Rustic countryside retreat.",
    city: "Tuscany",
    country: "Italy",
    costPerNight: 160,
    hostId: 104,
    hostName: "Marco Rossi",
  },
  {
    id: 52,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Stylish loft near downtown.",
    city: "Toronto",
    country: "Canada",
    costPerNight: 140,
    hostId: 105,
    hostName: "Ava Thompson",
  },
  {
    id: 51,
    imgUrl: "/images/HomesPics/home1.jpg",
    decription: "Stylish loft near downtown.",
    city: "Toronto",
    country: "Canada",
    costPerNight: 140,
    hostId: 105,
    hostName: "Ava Thompson",
  },
];
