"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { LatLngTuple } from "leaflet";

type Property = {
  property_id: number;
  property_price: string;
  property_latitude: string;
  property_longitude: string;
};

export default function MapComponent({
  properties,
}: {
  properties: Property[];
}) {
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconUrl: "/icons/marker-icon.png",
      iconRetinaUrl: "/icons/marker-icon-2x.png",
      shadowUrl: "/icons/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      className="h-full w-full rounded-lg"
      center={[51.505, -0.09]} // temporary default
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {properties.map((p) => (
        <Marker
          key={p.property_id}
          position={[Number(p.property_latitude), Number(p.property_longitude)]}
        >
          <Popup>${p.property_price} per night</Popup>
        </Marker>
      ))}

      <FitBounds properties={properties} />
    </MapContainer>
  );
}

function FitBounds({ properties }: { properties: Property[] }) {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0) {
      const bounds: LatLngTuple[] = properties.map((p) => [
        Number(p.property_latitude),
        Number(p.property_longitude),
      ]) as LatLngTuple[];

      map.fitBounds(bounds);
    }
  }, [properties, map]);

  return null;
}
