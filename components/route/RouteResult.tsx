import type { RouteResult as RouteResultType } from "../../types/route";

interface RouteResultProps {
  result: RouteResultType | null;
}

export default function RouteResult({
  result,
}: RouteResultProps) {
  if (!result) {
    return (
      <div className="rounded-xl bg-white p-5 shadow">
        <h2 className="text-lg font-bold text-gray-800">
          Resultado de la ruta
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Calcula una ruta para visualizar los resultados.
        </p>
      </div>
    );
  }

  const algorithmNames: Record<string, string> = {
    brute_force: "Fuerza Bruta",
    backtracking: "Backtracking",
    divide_conquer: "Divide y Vencerás",
  };

  const algorithmName =
    algorithmNames[result.algorithm] ?? result.algorithm;

  return (
    <div className="space-y-5 rounded-xl bg-white p-5 shadow">

      {/* TÍTULO */}
      <div>
        <h2 className="text-lg font-bold text-gray-800">
          Resultado de la ruta
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Información obtenida después de ejecutar el algoritmo.
        </p>
      </div>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

        {/* DISTANCIA */}
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Distancia
          </p>

          <p className="mt-1 text-xl font-bold text-gray-800">
            {result.distance_km !== null
              ? `${result.distance_km.toFixed(2)} km`
              : "—"}
          </p>
        </div>

        {/* TIEMPO */}
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Tiempo estimado
          </p>

          <p className="mt-1 text-xl font-bold text-gray-800">
            {result.estimated_time_min !== null
              ? `${result.estimated_time_min.toFixed(1)} min`
              : "—"}
          </p>
        </div>

        {/* NODOS */}
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Nodos explorados
          </p>

          <p className="mt-1 text-xl font-bold text-gray-800">
            {result.nodes_explored ?? "—"}
          </p>
        </div>

        {/* RAMAS PODADAS */}
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Ramas podadas
          </p>

          <p className="mt-1 text-xl font-bold text-gray-800">
            {result.branches_pruned ?? "—"}
          </p>
        </div>

      </div>

      {/* ALGORITMO */}
      <div className="rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-500">
          Algoritmo utilizado
        </p>

        <p className="mt-1 text-lg font-bold text-gray-800">
          {algorithmName}
        </p>
      </div>

      {/* INFORMACIÓN DEL ALGORITMO */}
      <div className="rounded-lg bg-gray-50 p-4">

        <p className="text-sm font-semibold text-gray-700">
          Información del algoritmo
        </p>

        {result.algorithm === "brute_force" && (
          <p className="mt-1 text-sm text-gray-500">
            Fuerza Bruta evalúa las posibles alternativas de recorrido
            para encontrar una solución.
          </p>
        )}

        {result.algorithm === "backtracking" && (
          <p className="mt-1 text-sm text-gray-500">
            Backtracking descarta caminos que ya no pueden producir
            una solución mejor, reduciendo la cantidad de alternativas
            exploradas.
          </p>
        )}

        {result.algorithm === "divide_conquer" && (
          <p className="mt-1 text-sm text-gray-500">
            Divide y Vencerás divide el problema en subproblemas
            más pequeños y posteriormente combina sus resultados.
          </p>
        )}

      </div>

    </div>
  );
}