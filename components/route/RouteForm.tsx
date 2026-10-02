"use client";

import { useMemo, useState } from "react";

import type {
  Coordinate,
  DeliveryAlgorithm,
  DeliveryRouteRequest,
  Place,
  RouteMode,
  RouteRequest,
} from "@/types/route";

interface RouteFormProps {
  onCalculateDirect: (request: RouteRequest) => void;
  onCalculateDeliveries: (request: DeliveryRouteRequest) => void;
  onCompare: (request: DeliveryRouteRequest) => void;
  loading: boolean;
  onClear: () => void;
}

const places: Place[] = [
  {
    id: "miraflores-centro",
    name: "Av. Larco - Miraflores",
    district: "Miraflores",
    coordinates: { lat: -12.1219, lon: -77.0297 },
  },
  {
    id: "san-isidro-javier-prado",
    name: "Av. Javier Prado - San Isidro",
    district: "San Isidro",
    coordinates: { lat: -12.0925, lon: -77.0365 },
  },
  {
    id: "miraflores-sur",
    name: "Av. Reducto - Miraflores",
    district: "Miraflores",
    coordinates: { lat: -12.1328, lon: -77.0225 },
  },
  {
    id: "san-isidro-centro",
    name: "Centro de San Isidro",
    district: "San Isidro",
    coordinates: { lat: -12.097, lon: -77.033 },
  },
];

const algorithmLimits: Record<DeliveryAlgorithm, number> = {
  brute_force: 8,
  backtracking: 12,
  divide_conquer: 30,
};

export default function RouteForm({
  onCalculateDirect,
  onCalculateDeliveries,
  onCompare,
  loading,
  onClear,
}: RouteFormProps) {
  const [mode, setMode] = useState<RouteMode>("deliveries");
  const [algorithm, setAlgorithm] =
    useState<DeliveryAlgorithm>("backtracking");

  const [originId, setOriginId] = useState(places[0].id);
  const [destinationId, setDestinationId] = useState(places[1].id);

  const [deliveryIds, setDeliveryIds] = useState<string[]>([
    places[1].id,
    places[2].id,
  ]);

  const [trafficHour, setTrafficHour] = useState("08:00");
  const [returnToOrigin, setReturnToOrigin] = useState(false);

  const origin = useMemo(
    () => places.find((place) => place.id === originId)!,
    [originId]
  );

  const destination = useMemo(
    () => places.find((place) => place.id === destinationId)!,
    [destinationId]
  );

  const limit = algorithmLimits[algorithm];

  const availableDestinations = places.filter(
    (place) =>
      place.id !== originId &&
      !deliveryIds.includes(place.id)
  );

  function addDestination() {
    if (deliveryIds.length >= limit) return;

    const next = availableDestinations[0];
    if (!next) return;

    setDeliveryIds((current) => [...current, next.id]);
  }

  function removeDestination(id: string) {
    setDeliveryIds((current) =>
      current.filter((destinationId) => destinationId !== id)
    );
  }

  function changeAlgorithm(next: DeliveryAlgorithm) {
    setAlgorithm(next);

    const nextLimit = algorithmLimits[next];

    if (deliveryIds.length > nextLimit) {
      setDeliveryIds((current) => current.slice(0, nextLimit));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const hour = Number.parseInt(trafficHour.split(":")[0], 10);

    if (mode === "direct") {
      if (originId === destinationId) {
        alert("Selecciona un destino distinto del origen.");
        return;
      }

      const request: RouteRequest = {
        origin: origin.coordinates,
        destination: destination.coordinates,
        algorithm: "dijkstra",
        traffic_hour: hour,
      };

      onCalculateDirect(request);
      return;
    }

    if (deliveryIds.length === 0) {
      alert("Agrega al menos un destino.");
      return;
    }

    const destinations = deliveryIds
      .map((id) => places.find((place) => place.id === id))
      .filter((place): place is Place => Boolean(place))
      .map((place) => place.coordinates);

    const request: DeliveryRouteRequest = {
      origin: origin.coordinates,
      destinations,
      algorithm,
      traffic_hour: hour,
      return_to_origin: returnToOrigin,
    };

    onCalculateDeliveries(request);
  }

  function handleCompare() {
    if (deliveryIds.length === 0) {
      alert("Agrega al menos un destino.");
      return;
    }

    const destinations = deliveryIds
      .map((id) => places.find((place) => place.id === id))
      .filter((place): place is Place => Boolean(place))
      .map((place) => place.coordinates);

    onCompare({
      origin: origin.coordinates,
      destinations,
      algorithm,
      traffic_hour: Number.parseInt(trafficHour.split(":")[0], 10),
      return_to_origin: returnToOrigin,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-bold text-gray-900">
          Configurar recorrido
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Selecciona el tipo de ruta y los puntos de recorrido.
        </p>
      </div>

      {/* Modo */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Tipo de recorrido
        </label>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode("deliveries")}
            className={`rounded-lg border px-3 py-3 text-sm font-medium ${
              mode === "deliveries"
                ? "border-orange-500 bg-orange-50 text-orange-700"
                : "border-gray-200 text-gray-600"
            }`}
          >
            Múltiples entregas
          </button>

          <button
            type="button"
            onClick={() => setMode("direct")}
            className={`rounded-lg border px-3 py-3 text-sm font-medium ${
              mode === "direct"
                ? "border-orange-500 bg-orange-50 text-orange-700"
                : "border-gray-200 text-gray-600"
            }`}
          >
            Ruta directa
          </button>
        </div>
      </div>

      {/* Origen */}
      <div>
        <label
          htmlFor="origin"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Punto de origen
        </label>

        <select
          id="origin"
          value={originId}
          onChange={(event) => setOriginId(event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-800 outline-none focus:border-orange-500"
        >
          {places.map((place) => (
            <option key={place.id} value={place.id}>
              {place.name}
            </option>
          ))}
        </select>
      </div>

      {/* Ruta directa */}
      {mode === "direct" && (
        <div>
          <label
            htmlFor="direct-destination"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Destino
          </label>

          <select
            id="direct-destination"
            value={destinationId}
            onChange={(event) => setDestinationId(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-800 outline-none focus:border-orange-500"
          >
            {places
              .filter((place) => place.id !== originId)
              .map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
          </select>

          <p className="mt-2 text-xs text-gray-500">
            Se utilizará Dijkstra para encontrar el recorrido entre ambos puntos.
          </p>
        </div>
      )}

      {/* Entregas */}
      {mode === "deliveries" && (
        <>
          <div>
            <label
              htmlFor="algorithm"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Algoritmo
            </label>

            <select
              id="algorithm"
              value={algorithm}
              onChange={(event) =>
                changeAlgorithm(event.target.value as DeliveryAlgorithm)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-800 outline-none focus:border-orange-500"
            >
              <option value="brute_force">Fuerza Bruta (máx. 8)</option>
              <option value="backtracking">Backtracking (máx. 12)</option>
              <option value="divide_conquer">
                Divide y Vencerás (máx. 30)
              </option>
            </select>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">
                Destinos
              </label>
              <span className="text-xs text-gray-500">
                {deliveryIds.length}/{limit}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {deliveryIds.map((id, index) => {
                const place = places.find((item) => item.id === id);

                return (
                  <div
                    key={`${id}-${index}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
                      {index + 1}
                    </span>

                    <span className="min-w-0 flex-1 text-sm text-gray-700">
                      {place?.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeDestination(id)}
                      aria-label={`Eliminar ${place?.name}`}
                      className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                    >
                      Quitar
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={addDestination}
              disabled={
                deliveryIds.length >= limit ||
                availableDestinations.length === 0
              }
              className="mt-3 w-full rounded-lg border border-dashed border-orange-300 px-3 py-3 text-sm font-semibold text-orange-700 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              + Agregar destino
            </button>

            <p className="mt-2 text-xs text-gray-500">
              Los lugares de esta versión son ejemplos de interfaz. Puedes
              ampliar la lista o reemplazarla por selección desde el mapa.
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={returnToOrigin}
              onChange={(event) =>
                setReturnToOrigin(event.target.checked)
              }
              className="h-4 w-4 accent-orange-600"
            />
            Regresar al punto de origen
          </label>
        </>
      )}

      {/* Hora */}
      <div>
        <label
          htmlFor="traffic-hour"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Hora estimada de salida
        </label>

        <select
          id="traffic-hour"
          value={trafficHour}
          onChange={(event) => setTrafficHour(event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-800 outline-none focus:border-orange-500"
        >
          {Array.from({ length: 24 }, (_, hour) => {
            const value = `${String(hour).padStart(2, "0")}:00`;

            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#FF6600] px-4 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Calculando recorrido..." : "Calcular ruta"}
      </button>

      {mode === "deliveries" && (
        <button
          type="button"
          onClick={handleCompare}
          disabled={loading}
          className="w-full rounded-lg border border-orange-500 px-4 py-3 font-semibold text-orange-700 hover:bg-orange-50 disabled:opacity-50"
        >
          Comparar algoritmos
        </button>
      )}

      <button
        type="button"
        onClick={onClear}
        disabled={loading}
        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
      >
        Limpiar resultado
      </button>
    </form>
  );
}