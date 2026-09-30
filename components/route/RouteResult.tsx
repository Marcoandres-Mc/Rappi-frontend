import type {
  RouteResult as RouteResultType,
} from "@/types/route";

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
    fuerzaBruta: "Fuerza Bruta",
    backtracking: "Backtracking",
    divideVencenas: "Divide y Vencerás",
  };

  const algorithmName =
    algorithmNames[result.algoritmo] ??
    result.algoritmo;

  const distanceKm =
    result.costo_total !== null &&
    result.criterio === "distancia"
      ? result.costo_total / 1000
      : null;

  return (
    <div className="space-y-4 rounded-xl bg-white p-5 shadow">

      {/* TÍTULO */}
      <div>
        <h2 className="text-lg font-bold text-gray-800">
          Resultado de la ruta
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Ruta calculada utilizando la red vial de
          Miraflores y San Isidro.
        </p>
      </div>

      {/* DISTRITOS */}
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold text-[#FF6600]">
          Miraflores
        </span>

        <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold text-[#FF6600]">
          San Isidro
        </span>
      </div>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-2 gap-3">

        {/* DISTANCIA */}
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Distancia
          </p>

          <p className="mt-1 text-xl font-bold text-gray-800">
            {distanceKm !== null
              ? `${distanceKm.toFixed(2)} km`
              : "—"}
          </p>
        </div>

        {/* NODOS */}
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Nodos de la ruta
          </p>

          <p className="mt-1 text-xl font-bold text-gray-800">
            {result.ruta?.length ?? "—"}
          </p>
        </div>

        {/* DESTINOS */}
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Destinos
          </p>

          <p className="mt-1 text-xl font-bold text-gray-800">
            {result.destinos?.length ?? "—"}
          </p>
        </div>

        {/* NODOS DEL GRAFO */}
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Nodos del grafo
          </p>

          <p className="mt-1 text-xl font-bold text-gray-800">
            {result.estadisticas_grafo?.nodos ?? "—"}
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

      {/* ORIGEN */}
      <div className="rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-500">
          Punto de origen
        </p>

        <div className="mt-2 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-gray-800">
              Nodo {result.origen?.id}
            </p>

            <p className="text-xs text-gray-500">
              {result.origen?.lat},{" "}
              {result.origen?.lon}
            </p>
          </div>

          {result.origen?.distrito && (
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-bold text-[#FF6600]">
              {result.origen.distrito}
            </span>
          )}
        </div>
      </div>

      {/* DESTINOS */}
      <div className="rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-500">
          Destinos de entrega
        </p>

        <div className="mt-2 space-y-2">
          {result.destinos?.map((destino, index) => (
            <div
              key={`${destino}-${index}`}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
            >
              <span className="text-xs font-bold text-gray-800">
                Destino {index + 1}
              </span>

              <span className="text-xs text-gray-500">
                Nodo {destino}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* INFORMACIÓN DEL ALGORITMO */}
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="text-sm font-semibold text-gray-700">
          Información del algoritmo
        </p>

        {result.algoritmo === "fuerzaBruta" && (
          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            Fuerza Bruta evalúa las diferentes posibilidades
            de recorrido entre los destinos para encontrar
            una solución.
          </p>
        )}

        {result.algoritmo === "backtracking" && (
          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            Backtracking construye posibles recorridos y
            descarta alternativas que ya no pueden mejorar
            la solución encontrada.
          </p>
        )}

        {result.algoritmo === "divideVencenas" && (
          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            Divide y Vencerás divide el problema en
            subproblemas más pequeños y posteriormente
            combina sus resultados.
          </p>
        )}
      </div>

      {/* ESTADÍSTICAS DEL GRAFO */}
      <div className="rounded-lg border border-gray-200 p-4">
        <p className="text-sm font-semibold text-gray-700">
          Red utilizada
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-gray-400">
              Nodos
            </p>

            <p className="font-bold text-gray-800">
              {result.estadisticas_grafo?.nodos ?? "—"}
            </p>
          </div>

          <div>
            <p className="text-gray-400">
              Aristas
            </p>

            <p className="font-bold text-gray-800">
              {result.estadisticas_grafo?.edges ?? "—"}
            </p>
          </div>

          <div>
            <p className="text-gray-400">
              Grafo dirigido
            </p>

            <p className="font-bold text-gray-800">
              {result.estadisticas_grafo?.dirigido
                ? "Sí"
                : "No"}
            </p>
          </div>

          <div>
            <p className="text-gray-400">
              Multigrafo
            </p>

            <p className="font-bold text-gray-800">
              {result.estadisticas_grafo?.multigrafo
                ? "Sí"
                : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}