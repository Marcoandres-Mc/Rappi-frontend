import type { RouteResult } from "../../types/route";

interface RouteResultProps {
  result: RouteResult | null;
}

export default function RouteResult({
  result,
}: RouteResultProps) {

  if (!result) {
    return (
      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-gray-500">
          Calcula una ruta para visualizar los resultados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl bg-white p-5 shadow">

      <h2 className="text-lg font-bold">
        Resultado de la ruta
      </h2>

      <div className="grid grid-cols-3 gap-3">

        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Distancia
          </p>
          <p className="text-xl font-bold">
            {result.distance} km
          </p>
        </div>

        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Tiempo
          </p>
          <p className="text-xl font-bold">
            {result.estimatedTime} min
          </p>
        </div>

        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Nodos
          </p>
          <p className="text-xl font-bold">
            {result.nodesVisited}
          </p>
        </div>

      </div>

      <div>
        <p className="text-sm text-gray-500">
          Algoritmo utilizado
        </p>

        <p className="font-semibold">
          {result.algorithm}
        </p>
      </div>

    </div>
  );
}