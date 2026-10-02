"use client";

import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
  GeoJSON,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import type { Coordinate } from "@/types/route";

import mirafloresGeoJSON from "@/data/miraflores.json";
import sanIsidroGeoJSON from "@/data/san-isidro.json";

interface RouteMapProps {
  route?: Coordinate[];
  origin?: Coordinate | null;
  destinations?: Coordinate[];
  deliveryOrder?: number[];
  onMapClick?: (coordinate: Coordinate) => void;
}

const center: [number, number] = [-12.105, -77.035];

function MapClickHandler({
  onMapClick,
}: {
  onMapClick?: (coordinate: Coordinate) => void;
}) {
  useMapEvents({
    click(event) {
      onMapClick?.({
        lat: event.latlng.lat,
        lon: event.latlng.lng,
      });
    },
  });

  return null;
}

export default function RouteMap({
  route = [],
  origin = null,
  destinations = [],
  deliveryOrder = [],
  onMapClick,
}: RouteMapProps) {
  // =========================================================
  // 1. PROTEGER LOS DATOS RECIBIDOS
  // =========================================================

  const safeRoute = Array.isArray(route) ? route : [];

  const safeDestinations = Array.isArray(destinations)
    ? destinations
    : [];

  const safeDeliveryOrder = Array.isArray(deliveryOrder)
    ? deliveryOrder
    : [];

  // =========================================================
  // 2. CONVERTIR LA RUTA A FORMATO DE LEAFLET
  // =========================================================

  const routePositions: [number, number][] = safeRoute
    .filter(
      (point) =>
        point &&
        typeof point.lat === "number" &&
        typeof point.lon === "number"
    )
    .map((point) => [point.lat, point.lon]);

  // =========================================================
  // 3. ORDEN DE ENTREGA
  //
  // Ejemplo:
  // deliveryOrder = [0, 3, 1, 2]
  //
  // 0 = origen
  // 3 = destino 3
  // 1 = destino 1
  // 2 = destino 2
  //
  // Como los destinos empiezan desde índice 0,
  // hacemos index - 1.
  // =========================================================

  const orderedDestinationPositions = safeDeliveryOrder
    .filter(
      (index) =>
        typeof index === "number" &&
        index !== 0 &&
        Number.isInteger(index)
    )
    .map((index, visitPosition) => ({
      destinationIndex: index - 1,
      visitNumber: visitPosition + 1,
    }));

  return (
    <div className="h-[620px] min-h-[420px] w-full overflow-hidden rounded-2xl border border-gray-200">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
        {/* =====================================================
            MAPA BASE
        ===================================================== */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* =====================================================
            DISTRITO DE MIRAFLORES
        ===================================================== */}

        <GeoJSON
          data={mirafloresGeoJSON as GeoJSON.GeoJsonObject}
          style={{
            color: "#F97316",
            weight: 2,
            fillColor: "#FDBA74",
            fillOpacity: 0.08,
          }}
        />

        {/* =====================================================
            DISTRITO DE SAN ISIDRO
        ===================================================== */}

        <GeoJSON
          data={sanIsidroGeoJSON as GeoJSON.GeoJsonObject}
          style={{
            color: "#2563EB",
            weight: 2,
            fillColor: "#93C5FD",
            fillOpacity: 0.08,
          }}
        />

        {/* =====================================================
            CLIC EN EL MAPA
        ===================================================== */}

        <MapClickHandler onMapClick={onMapClick} />

        {/* =====================================================
            RUTA CALCULADA POR EL BACKEND
        ===================================================== */}

        {routePositions.length > 1 && (
          <Polyline
            positions={routePositions}
            pathOptions={{
              color: "#F97316",
              weight: 5,
              opacity: 0.9,
            }}
          />
        )}

        {/* =====================================================
            ORIGEN
        ===================================================== */}

        {origin &&
          typeof origin.lat === "number" &&
          typeof origin.lon === "number" && (
            <CircleMarker
              center={[origin.lat, origin.lon]}
              radius={9}
              pathOptions={{
                color: "#166534",
                fillColor: "#22C55E",
                fillOpacity: 1,
              }}
            >
              <Popup>Origen</Popup>
            </CircleMarker>
          )}

        {/* =====================================================
            DESTINOS
        ===================================================== */}

        {safeDestinations.map((destination, index) => {
          // Buscar en qué posición de la ruta se visita
          // este destino.
          const order = orderedDestinationPositions.find(
            (item) => item.destinationIndex === index
          );

          // Si existe delivery_order usamos ese número.
          // Si no existe, mostramos el índice normal.
          const label = order?.visitNumber ?? index + 1;

          // Evitar errores si algún destino tiene datos inválidos.
          if (
            !destination ||
            typeof destination.lat !== "number" ||
            typeof destination.lon !== "number"
          ) {
            return null;
          }

          return (
            <CircleMarker
              key={`destination-${index}`}
              center={[destination.lat, destination.lon]}
              radius={8}
              pathOptions={{
                color: "#9A3412",
                fillColor: "#FB923C",
                fillOpacity: 1,
              }}
            >
              <Popup>
                <strong>Parada {label}</strong>
                <br />
                Destino {index + 1}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}