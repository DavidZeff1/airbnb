"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

export default function MapComponent() {
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
        <Popup>Wassup</Popup>
      </Marker>
    </MapContainer>
  );
}
