"use client";

import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
  GeoJSON,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

import mirafloresGeoJSON from "@/data/miraflores.json";
import sanIsidroGeoJSON from "@/data/san-isidro.json";

import type { Coordinate } from "@/types/route";

interface RouteMapProps {
  route: Coordinate[];
}

const DEFAULT_CENTER: LatLngExpression = [
  -12.115,
  -77.035,
];

export default function RouteMap({
  route,
}: RouteMapProps) {

  /*
   * =====================================================
   * CONVERSIÓN DE COORDENADAS
   * =====================================================
   *
   * El backend devuelve:
   *
   * {
   *   lat: -12.12,
   *   lon: -77.03
   * }
   *
   * Leaflet necesita:
   *
   * [-12.12, -77.03]
   */

  const positions: [number, number][] = route.map(
    (point) => [point.lat, point.lon]
  );

  /*
   * =====================================================
   * ESTILO DE LOS DISTRITOS
   * =====================================================
   *
   * Estos estilos se aplican a los límites de:
   * - Miraflores
   * - San Isidro
   */

  const districtStyle = {
    weight: 3,
    fillOpacity: 0.08,
  };

  return (
    <div className="h-full min-h-[620px] overflow-hidden rounded-xl shadow">

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

        <GeoJSON
          data={mirafloresGeoJSON as import("geojson").GeoJsonObject}
          style={districtStyle}
        />

        {/* =====================================================
            LÍMITE DE SAN ISIDRO
        ====================================================== */}

        <GeoJSON
          data={sanIsidroGeoJSON as import("geojson").GeoJsonObject}
          style={districtStyle}
        />

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
              <strong>Inicio del recorrido</strong>
              <br />
              Punto de recogida
            </Popup>
          </CircleMarker>
        )}

        {/* =====================================================
            PUNTO DE DESTINO
        ====================================================== */}

        {positions.length > 1 && (
          <CircleMarker
            center={positions[positions.length - 1]}
            radius={9}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: "#FFCC00",
              fillOpacity: 1,
            }}
          >
            <Popup>
              <strong>Fin del recorrido</strong>
              <br />
              Destino de entrega
            </Popup>
          </CircleMarker>
        )}

      </MapContainer>

    </div>
  );
}