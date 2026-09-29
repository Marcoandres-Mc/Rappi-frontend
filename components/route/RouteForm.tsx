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

const locations: Location[] = [
  {
    id: "local-1",
    name: "Local Miraflores Centro",
    address: "Av. Larco",
    district: "Miraflores",
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
    value: "brute_force",
    label: "Fuerza Bruta",
    description:
      "Evalúa todas las posibilidades de recorrido.",
  },
  {
    value: "backtracking",
    label: "Backtracking",
    description:
      "Descarta recorridos que ya no pueden mejorar la solución.",
  },
  {
    value: "divide_conquer",
    label: "Divide y Vencerás",
    description:
      "Divide el problema en zonas más pequeñas.",
  },
];

export default function RouteForm({
  onCalculate,
  loading,
}: RouteFormProps) {
  const [originId, setOriginId] = useState("local-1");
  const [destinationId, setDestinationId] = useState("local-2");
  const [algorithm, setAlgorithm] =
    useState<Algorithm>("backtracking");

  const origin = locations.find(
    (location) => location.id === originId
  );

  const destination = locations.find(
    (location) => location.id === destinationId
  );

  const handleSubmit = (event: React.FormEvent) => {
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

    const request: RouteRequest = {
      origin: origin.coordinates,
      destination: destination.coordinates,
      algorithm,
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
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-900 outline-none transition focus:border-[#FF6600]"
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
          <p className="mt-1 text-[9px] text-slate-400">
            {origin.address}
          </p>
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
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-900 outline-none transition focus:border-[#FF6600]"
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
          <p className="mt-1 text-[9px] text-slate-400">
            {destination.address}
          </p>
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
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-900 outline-none transition focus:border-[#FF6600]"
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

        <p className="mt-1 text-xs font-black text-slate-900">
          {origin?.name}
        </p>

        <div className="my-1 ml-1 h-3 border-l border-dashed border-orange-300" />

        <p className="text-xs font-black text-slate-900">
          {destination?.name}
        </p>
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#FF6600] px-4 py-3 text-xs font-black text-white shadow-[0_4px_12px_rgba(255,102,0,0.25)] transition hover:bg-[#e95700] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Calculando recorrido..."
          : "Optimizar recorrido"}
      </button>
    </form>
  );
}