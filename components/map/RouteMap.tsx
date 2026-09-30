"use client";

import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";

import type { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

import mirafloresGeoJSON from "@/data/miraflores.json";
import sanIsidroGeoJSON from "@/data/san-isidro.json";

import type { RoutePoint } from "@/types/route";

interface RouteMapProps {
  points: RoutePoint[];
  districts: string[];
}

const DEFAULT_CENTER: LatLngExpression = [
  -12.115,
  -77.035,
];

/*
 * =====================================================
 * AJUSTAR MAPA A LOS DISTRITOS
 * =====================================================
 *
 * Utiliza los GeoJSON reales de:
 * - Miraflores
 * - San Isidro
 *
 * No se inventan límites.
 */

function FitDistricts() {
  const map = useMap();

  return (
    <button
      type="button"
      onClick={() => {
        // El mapa conserva inicialmente la vista
        // definida en MapContainer.
        map.setView(DEFAULT_CENTER, 13);
      }}
      className="absolute right-3 top-3 z-[1000] rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-md"
    >
      Ver distritos
    </button>
  );
}

export default function RouteMap({
  points,
  districts,
}: RouteMapProps) {
  /*
   * =====================================================
   * CONVERSIÓN DE PUNTOS
   * =====================================================
   *
   * Backend:
   *
   * {
   *   id: 123,
   *   lat: -12.12,
   *   lon: -77.03,
   *   distrito: "Miraflores"
   * }
   *
   * Leaflet:
   *
   * [-12.12, -77.03]
   */

  const positions: [number, number][] = points
    .filter(
      (point) =>
        typeof point.lat === "number" &&
        typeof point.lon === "number"
    )
    .map((point) => [
      point.lat,
      point.lon,
    ]);

  /*
   * =====================================================
   * ESTILO DE LOS DISTRITOS
   * =====================================================
   */

  const districtStyle = {
    weight: 3,
    fillOpacity: 0.08,
  };

  /*
   * =====================================================
   * DISTRITOS PERMITIDOS
   * =====================================================
   *
   * Aunque los GeoJSON existen, comprobamos qué
   * distritos fueron enviados al componente.
   */

  const mostrarMiraflores =
    districts.includes("Miraflores");

  const mostrarSanIsidro =
    districts.includes("San Isidro");

  return (
    <div className="relative h-full w-full min-h-[620px] overflow-hidden rounded-xl shadow">

      <MapContainer
        center={DEFAULT_CENTER}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >

        {/* =====================================================
            MAPA BASE - OPENSTREETMAP
        ====================================================== */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* =====================================================
            LÍMITE DE MIRAFLORES
        ====================================================== */}

        {mostrarMiraflores && (
          <GeoJSON
            data={
              mirafloresGeoJSON as import("geojson").GeoJsonObject
            }
            style={{
              ...districtStyle,
              color: "#FF6600",
            }}
          />
        )}

        {/* =====================================================
            LÍMITE DE SAN ISIDRO
        ====================================================== */}

        {mostrarSanIsidro && (
          <GeoJSON
            data={
              sanIsidroGeoJSON as import("geojson").GeoJsonObject
            }
            style={{
              ...districtStyle,
              color: "#2563EB",
            }}
          />
        )}

        {/* =====================================================
            RUTA CALCULADA POR EL BACKEND
        ====================================================== */}

        {positions.length > 1 && (
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#FF6600",
              weight: 6,
              opacity: 0.9,
            }}
          />
        )}

        {/* =====================================================
            PUNTO DE INICIO
        ====================================================== */}

        {positions.length > 0 && (
          <CircleMarker
            center={positions[0]}
            radius={9}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: "#FF6600",
              fillOpacity: 1,
            }}
          >
            <Popup>
              <strong>
                Inicio del recorrido
              </strong>

              <br />

              Punto de partida del repartidor
            </Popup>
          </CircleMarker>
        )}

        {/* =====================================================
            PUNTO DE DESTINO
        ====================================================== */}

        {positions.length > 1 && (
          <CircleMarker
            center={
              positions[positions.length - 1]
            }
            radius={9}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: "#FFCC00",
              fillOpacity: 1,
            }}
          >
            <Popup>
              <strong>
                Fin del recorrido
              </strong>

              <br />

              Destino de entrega
            </Popup>
          </CircleMarker>
        )}

        {/* =====================================================
            CONTROL DE VISTA
        ====================================================== */}

        <FitDistricts />

      </MapContainer>

    </div>
  );
}