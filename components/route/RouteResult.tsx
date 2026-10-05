import type {
  DeliveryRouteResponse,
  RouteResponse,
} from "@/types/route";

interface RouteResultProps {
  result: RouteResponse | DeliveryRouteResponse | null;
  mode: "direct" | "deliveries";
}

function formatDistance(meters: number): string {
  return `${(meters / 1000).toFixed(2)} km`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-PE", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function RouteResult({
  result,
  mode,
}: RouteResultProps) {
  if (!result) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="font-bold text-gray-900">Resultado del recorrido</h2>
        <p className="mt-2 text-sm text-gray-500">
          Calcula una ruta para visualizar sus métricas.
        </p>
      </section>
    );
  }

  const isDeliveryResult = "delivery_order" in result;

  return (
    <section className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Resultado del recorrido
          </h2>
          <p className="text-sm text-gray-500">
            Algoritmo: {result.algorithm}
          </p>
        </div>

        {isDeliveryResult && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              result.is_optimal
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {result.is_optimal ? "Óptimo" : "Solución aproximada"}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Metric
          label="Distancia real"
          value={formatDistance(result.distancia_total_m)}
        />

        <Metric
          label="Costo ponderado"
          value={formatNumber(result.weighted_cost)}
        />

        <Metric
          label="Tiempo de ejecución"
          value={`${formatNumber(result.execution_time_ms)} ms`}
        />

        <Metric
          label="Nodos visitados"
          value={formatNumber(result.nodos_visitados)}
        />
      </div>

      {isDeliveryResult && (
        <>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Metric
              label="Tiempo de matriz"
              value={`${formatNumber(result.matrix_time_ms)} ms`}
            />

            <Metric
              label="Estados explorados"
              value={formatNumber(result.states_explored)}
            />

            <Metric
              label="Ramas podadas"
              value={formatNumber(result.branches_pruned)}
            />

            <Metric
              label="Paradas"
              value={String(
                result.delivery_order.filter((index) => index !== 0).length
              )}
            />
          </div>

          <div className="mt-5">
            <h3 className="mb-2 text-sm font-semibold text-gray-800">
              Orden de visita
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              {result.delivery_order.map((index, position) => (
                <span
                  key={`${index}-${position}`}
                  className="rounded-lg bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700"
                >
                  {index === 0 ? "Origen" : `Destino ${index}`}
                </span>
              ))}
            </div>

            <p className="mt-2 text-xs text-gray-500">
              El índice 0 representa el origen; los índices 1 en adelante
              corresponden a los destinos en el orden enviado al backend.
            </p>
          </div>
        </>
      )}

    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 break-words text-lg font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}