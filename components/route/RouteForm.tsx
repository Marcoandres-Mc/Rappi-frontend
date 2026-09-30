"use client";

import { useState } from "react";

import type {
  Algorithm,
  Location,
  RouteRequest,
} from "@/types/route";

interface RouteFormProps {
  onCalculate: (request: RouteRequest) => void;
  loading: boolean;
}

/*
 * IMPORTANTE:
 * Los nodeId deben corresponder a nodos REALES
 * del archivo:
 *
 * app/data/graph/miraflores_san_isidro.json
 *
 * Estos valores son ejemplos.
 * Reemplázalos por los IDs reales de tu JSON.
 */
const locations: Location[] = [
  {
    id: "local-1",
    name: "Local Miraflores Centro",
    address: "Av. Larco",
    district: "Miraflores",
    nodeId: 1,
    coordinates: {
      lat: -12.1219,
      lon: -77.0297,
    },
  },
  {
    id: "local-2",
    name: "Local San Isidro",
    address: "Av. Javier Prado",
    district: "San Isidro",
    nodeId: 2,
    coordinates: {
      lat: -12.0925,
      lon: -77.0365,
    },
  },
  {
    id: "local-3",
    name: "Local Miraflores Sur",
    address: "Av. Reducto",
    district: "Miraflores",
    nodeId: 3,
    coordinates: {
      lat: -12.1328,
      lon: -77.0225,
    },
  },
];

const algorithms: {
  value: Algorithm;
  label: string;
  description: string;
}[] = [
  {
    value: "fuerzaBruta",
    label: "Fuerza Bruta",
    description:
      "Evalúa las diferentes posibilidades de recorrido para encontrar una solución.",
  },
  {
    value: "backtracking",
    label: "Backtracking",
    description:
      "Descarta recorridos que ya no pueden mejorar la solución.",
  },
  {
    value: "divideVencenas",
    label: "Divide y Vencerás",
    description:
      "Divide el problema en partes más pequeñas y combina sus resultados.",
  },
];

export default function RouteForm({
  onCalculate,
  loading,
}: RouteFormProps) {
  const [originId, setOriginId] = useState("local-1");
  const [destinationId, setDestinationId] =
    useState("local-2");

  const [algorithm, setAlgorithm] =
    useState<Algorithm>("backtracking");

  const origin = locations.find(
    (location) => location.id === originId
  );

  const destination = locations.find(
    (location) => location.id === destinationId
  );

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!origin || !destination) {
      return;
    }

    if (origin.id === destination.id) {
      alert(
        "El origen y el destino deben ser diferentes."
      );
      return;
    }

    /*
     * El origen se envía como coordenadas.
     *
     * El backend buscará el nodo del grafo
     * más cercano a esta ubicación.
     */
    const ubicacionInicial =
      `${origin.coordinates.lat},${origin.coordinates.lon}`;

    /*
     * El destino debe ser un ID REAL del grafo.
     *
     * No enviamos "local-2".
     * Enviamos el nodeId correspondiente
     * al grafo generado desde OpenStreetMap.
     */
    const request: RouteRequest = {
      ubicacion_inicial: ubicacionInicial,
      algoritmo: algorithm,
      destinos: [Number(destination.nodeId)],
    };

    onCalculate(request);
  };

  const selectedAlgorithm = algorithms.find(
    (item) => item.value === algorithm
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* ZONA DEL PROYECTO */}
      <div className="rounded-xl border border-orange-100 bg-orange-50 p-3">
        <p className="text-[8px] font-black uppercase tracking-wider text-[#FF6600]">
          Zona de operación
        </p>

        <p className="mt-1 text-xs font-bold text-slate-800">
          Miraflores · San Isidro
        </p>

        <p className="mt-1 text-[9px] leading-relaxed text-slate-500">
          La optimización utiliza únicamente la red vial
          correspondiente a estos distritos.
        </p>
      </div>

      {/* ORIGEN */}
      <div>
        <label className="mb-1.5 block text-[9px] font-black uppercase tracking-wider text-slate-400">
          Local de origen
        </label>

        <select
          value={originId}
          onChange={(event) =>
            setOriginId(event.target.value)
          }
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-900 outline-none transition focus:border-[#FF6600] disabled:cursor-not-allowed disabled:bg-slate-50"
        >
          {locations.map((location) => (
            <option
              key={location.id}
              value={location.id}
            >
              {location.name} — {location.district}
            </option>
          ))}
        </select>

        {origin && (
          <div className="mt-1">
            <p className="text-[9px] text-slate-400">
              {origin.address}
            </p>

            <p className="text-[9px] font-semibold text-orange-500">
              Distrito: {origin.district}
            </p>
          </div>
        )}
      </div>

      {/* DESTINO */}
      <div>
        <label className="mb-1.5 block text-[9px] font-black uppercase tracking-wider text-slate-400">
          Destino de entrega
        </label>

        <select
          value={destinationId}
          onChange={(event) =>
            setDestinationId(event.target.value)
          }
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-900 outline-none transition focus:border-[#FF6600] disabled:cursor-not-allowed disabled:bg-slate-50"
        >
          {locations.map((location) => (
            <option
              key={location.id}
              value={location.id}
            >
              {location.name} — {location.district}
            </option>
          ))}
        </select>

        {destination && (
          <div className="mt-1">
            <p className="text-[9px] text-slate-400">
              {destination.address}
            </p>

            <p className="text-[9px] font-semibold text-orange-500">
              Distrito: {destination.district}
            </p>
          </div>
        )}
      </div>

      {/* ALGORITMO */}
      <div>
        <label className="mb-1.5 block text-[9px] font-black uppercase tracking-wider text-slate-400">
          Algoritmo de optimización
        </label>

        <select
          value={algorithm}
          onChange={(event) =>
            setAlgorithm(
              event.target.value as Algorithm
            )
          }
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-900 outline-none transition focus:border-[#FF6600] disabled:cursor-not-allowed disabled:bg-slate-50"
        >
          {algorithms.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>

        {selectedAlgorithm && (
          <p className="mt-1.5 text-[9px] leading-relaxed text-slate-500">
            {selectedAlgorithm.description}
          </p>
        )}
      </div>

      {/* RESUMEN */}
      <div className="rounded-xl bg-orange-50 p-3">
        <p className="text-[8px] font-black uppercase tracking-wider text-[#FF6600]">
          Recorrido
        </p>

        <div className="mt-2">
          <p className="text-xs font-black text-slate-900">
            {origin?.name}
          </p>

          <p className="text-[9px] text-slate-400">
            {origin?.district}
          </p>
        </div>

        <div className="my-2 ml-1 h-4 border-l border-dashed border-orange-300" />

        <div>
          <p className="text-xs font-black text-slate-900">
            {destination?.name}
          </p>

          <p className="text-[9px] text-slate-400">
            {destination?.district}
          </p>
        </div>
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={
          loading ||
          !origin ||
          !destination ||
          origin.id === destination.id
        }
        className="w-full rounded-xl bg-[#FF6600] px-4 py-3 text-xs font-black text-white shadow-[0_4px_12px_rgba(255,102,0,0.25)] transition hover:bg-[#e95700] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Calculando recorrido..."
          : "Optimizar recorrido"}
      </button>
    </form>
  );
}