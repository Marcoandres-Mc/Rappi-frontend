import { useState } from "react";
import type {
  Algorithm,
  OptimizationCriterion,
  RouteRequest,
} from "../../types/route";

interface RouteFormProps {
  onCalculate: (request: RouteRequest) => void;
  loading: boolean;
}

export default function RouteForm({
  onCalculate,
  loading,
}: RouteFormProps) {

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const [criterion, setCriterion] =
    useState<OptimizationCriterion>("time");

  const [algorithm, setAlgorithm] =
    useState<Algorithm>("dijkstra");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!origin || !destination) {
      return;
    }

    onCalculate({
      origin,
      destination,
      criterion,
      algorithm,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl bg-white p-5 shadow"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Punto de origen
        </label>

        <input
          type="text"
          placeholder="Ej. Parque Kennedy"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Punto de destino
        </label>

        <input
          type="text"
          placeholder="Ej. Larcomar"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full rounded-lg border p-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Optimizar por
        </label>

        <select
          value={criterion}
          onChange={(e) =>
            setCriterion(
              e.target.value as OptimizationCriterion
            )
          }
          className="w-full rounded-lg border p-3"
        >
          <option value="distance">Distancia</option>
          <option value="time">Tiempo</option>
          <option value="traffic">Tráfico</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Algoritmo
        </label>

        <select
          value={algorithm}
          onChange={(e) =>
            setAlgorithm(e.target.value as Algorithm)
          }
          className="w-full rounded-lg border p-3"
        >
          <option value="dijkstra">Dijkstra</option>
          <option value="brute-force">Fuerza Bruta</option>
          <option value="backtracking">Backtracking</option>
          <option value="divide-conquer">
            Divide y Vencerás
          </option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white"
      >
        {loading ? "Calculando..." : "Calcular ruta"}
      </button>
    </form>
  );
}