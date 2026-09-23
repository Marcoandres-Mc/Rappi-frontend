"use client";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import mirafloresGeoJSON from "@/data/miraflores.json";
import sanIsidroGeoJSON from "@/data/san-isidro.json";

interface RouteMapProps {
  route?: [number, number][];
}

export default function RouteMap({
  route = [],
}: RouteMapProps) {

  const center: [number, number] = [
    -12.110,
    -77.030,
  ];

  const districtStyle = {
    weight: 3,
    fillOpacity: 0.08,
  };

  return (
    <div className="h-full min-h-[600px] overflow-hidden rounded-xl shadow">

      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
      >

        {/* Mapa base */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ============================= */}
        {/* LÍMITE DE MIRAFLORES */}
        {/* ============================= */}

        <GeoJSON
          data={mirafloresGeoJSON}
          style={districtStyle}
        />

        {/* ============================= */}
        {/* LÍMITE DE SAN ISIDRO */}
        {/* ============================= */}

        <GeoJSON
          data={sanIsidroGeoJSON}
          style={districtStyle}
        />

        {/* ============================= */}
        {/* RUTA CALCULADA */}
        {/* ============================= */}

        {route.length > 0 && (
          <>
            <Polyline positions={route} />

            <Marker position={route[0]}>
              <Popup>
                <strong>Origen</strong>
              </Popup>
            </Marker>

            <Marker position={route[route.length - 1]}>
              <Popup>
                <strong>Destino</strong>
              </Popup>
            </Marker>
          </>
        )}

      </MapContainer>

    </div>
  );
}