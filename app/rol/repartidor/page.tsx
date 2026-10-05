"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/layout/Navbar";
import RouteForm from "@/components/route/RouteForm";
import RouteResult from "@/components/route/RouteResult";

import {
  calculateRoute,
  calculateDeliveries,
  compareAlgorithms,
} from "@/services/routeService";

import type {
  RouteRequest,
  RouteResponse,
  DeliveryRouteRequest,
  DeliveryRouteResponse,
  RouteMode,
  DeliveryAlgorithm,
} from "@/types/route";

// =========================================================
// MAPA
// =========================================================

const RouteMap = dynamic(
  () => import("@/components/map/RouteMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[620px] items-center justify-center rounded-xl bg-gray-100">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    ),
  }
);

// =========================================================
// TIPOS
// =========================================================

type ResultType = RouteResponse | DeliveryRouteResponse;

interface ComparisonResult {
  algorithm: DeliveryAlgorithm;
  result: DeliveryRouteResponse | null;
  error: string | null;
}

// =========================================================
// PÁGINA
// =========================================================

export default function RepartidorPage() {
  const [result, setResult] = useState<ResultType | null>(null);

  const [comparison, setComparison] =
    useState<ComparisonResult[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [mode, setMode] = useState<RouteMode>("deliveries");

  // =======================================================
  // CALCULAR RUTA DIRECTA - DIJKSTRA
  // =======================================================

  const handleCalculateDirect = async (
    request: RouteRequest
  ) => {
    setLoading(true);
    setError(null);
    setComparison([]);
    setMode("direct");

    try {
      const data = await calculateRoute(request);

      setResult(data);
    } catch (err) {
      console.error("Error calculando ruta:", err);

      setError(
        err instanceof Error
          ? err.message
          : "No se pudo calcular la ruta."
      );
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // CALCULAR MÚLTIPLES ENTREGAS
  // =======================================================

  const handleCalculateDeliveries = async (
    request: DeliveryRouteRequest
  ) => {
    setLoading(true);
    setError(null);
    setComparison([]);
    setMode("deliveries");

    try {
      const data = await calculateDeliveries(request);

      setResult(data);
    } catch (err) {
      console.error("Error calculando entregas:", err);

      setError(
        err instanceof Error
          ? err.message
          : "No se pudo calcular el recorrido."
      );
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // COMPARAR ALGORITMOS
  // =======================================================

  const handleCompare = async (
    request: DeliveryRouteRequest
  ) => {
    setLoading(true);
    setError(null);
    setComparison([]);
    setMode("deliveries");

    try {
      const results = await compareAlgorithms(request);

      setComparison(results);

      // Mostrar Backtracking si está disponible.
      // Si no, mostrar el primer resultado exitoso.

      const selected =
        results.find(
          (item) =>
            item.algorithm === "backtracking" &&
            item.result !== null
        ) ??
        results.find((item) => item.result !== null);

      if (selected?.result) {
        setResult(selected.result);
      }
    } catch (err) {
      console.error("Error comparando algoritmos:", err);

      setError(
        err instanceof Error
          ? err.message
          : "No se pudieron comparar los algoritmos."
      );
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // LIMPIAR RESULTADOS
  // =======================================================

  const handleClear = () => {
    setResult(null);
    setComparison([]);
    setError(null);
  };

  // =======================================================
  // DATOS DERIVADOS
  // =======================================================

  const distanceKm =
    result?.distancia_total_m != null
      ? result.distancia_total_m / 1000
      : null;

  const algorithmNames: Record<string, string> = {
    dijkstra: "Dijkstra",
    brute_force: "Fuerza Bruta",
    backtracking: "Backtracking",
    divide_conquer: "Divide y Vencerás",
  };

  const algorithmName = result
    ? algorithmNames[result.algorithm] ?? result.algorithm
    : "Esperando";

  const isDeliveryResult =
    result !== null && "delivery_order" in result;

  // =======================================================
  // RENDER
  // =======================================================
const [pedidoEntregado, setPedidoEntregado] = useState(false);
  return (
  <div className="min-h-screen w-full bg-[#fffaf5]">
    <Navbar />

    <main className="h-[calc(100vh-64px)] overflow-hidden p-3 lg:p-4">
      <div className="grid h-full min-h-0 grid-cols-1 gap-3 lg:grid-cols-12">

        {/* =================================================
            PANEL DEL REPARTIDOR
        ================================================== */}

        <aside className="min-h-0 h-full overflow-y-auto pr-2 lg:col-span-4 xl:col-span-3">
          <div className="flex flex-col gap-3">

            {/* PERFIL */}

            <section className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_4px_20px_rgba(255,102,0,0.07)]">
              <div className="h-1 bg-[#FF6600]" />

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-xl">
                      🛵
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Repartidor
                      </p>

                      <h2 className="text-sm font-black text-slate-950">
                        Panel de entrega
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />

                    <span className="text-[9px] font-black text-emerald-700">
                      Disponible
                    </span>
                  </div>
                </div>

                {/* ESTADÍSTICAS */}

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-slate-50 p-2 text-center">
                    <p className="text-lg font-black text-slate-900">
                      {isDeliveryResult
                        ? Math.max(
                            result.delivery_order.length - 1,
                            0
                          )
                        : 0}
                    </p>

                    <p className="text-[8px] font-bold uppercase text-slate-400">
                      Paradas
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-2 text-center">
                    <p className="text-lg font-black text-[#FF6600]">
                      {distanceKm !== null
                        ? distanceKm.toFixed(2)
                        : "—"}
                    </p>

                    <p className="text-[8px] font-bold uppercase text-slate-400">
                      Km
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-2 text-center">
                    <p className="text-lg font-black text-slate-900">
                      {result?.execution_time_ms != null
                        ? result.execution_time_ms.toFixed(1)
                        : "—"}
                    </p>

                    <p className="text-[8px] font-bold uppercase text-slate-400">
                      ms
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FORMULARIO */}

            <section className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_4px_20px_rgba(255,102,0,0.07)]">
              <div className="border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF6600] shadow-[3px_3px_0_#ffcc00]">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                    >
                      <circle cx="6" cy="19" r="2" />
                      <circle cx="18" cy="5" r="2" />
                      <path d="M8 18c7 0 1-10 10-12" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="text-sm font-black text-slate-950">
                      Optimizar recorrido
                    </h2>

                    <p className="text-[9px] text-slate-500">
                      Miraflores · San Isidro
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <RouteForm
                  onCalculateDirect={handleCalculateDirect}
                  onCalculateDeliveries={handleCalculateDeliveries}
                  onCompare={handleCompare}
                  onClear={handleClear}
                  loading={loading}
                />
              </div>
            </section>

            {/* ERROR */}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3"
              >
                <p className="text-xs font-bold text-red-700">
                  No se pudo calcular la ruta
                </p>

                <p className="mt-1 text-xs leading-relaxed text-red-600">
                  {error}
                </p>
              </div>
            )}

          </div>
        </aside>


        {/* =================================================
            MAPA
        ================================================== */}

        <section className="relative h-[720px] min-h-[620px] overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_5px_25px_rgba(255,102,0,0.08)] lg:col-span-5 xl:col-span-6">

          {/* INFORMACIÓN SUPERIOR */}

          <div className="pointer-events-none absolute left-3 right-3 top-3 z-[1000] flex items-start justify-between">
            <div className="rounded-xl border border-orange-100 bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6600]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M5 19 19 5" />
                    <path d="M5 5h.01" />
                    <path d="M19 19h.01" />
                  </svg>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-900">
                    Ruta de entrega
                  </p>

                  <p className="text-[9px] text-slate-500">
                    Miraflores · San Isidro · OpenStreetMap
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden rounded-xl border border-orange-100 bg-white/95 shadow-lg backdrop-blur sm:block">
              <div className="px-3 py-2">
                <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Algoritmo
                </p>

                <p className="mt-0.5 text-[11px] font-black text-[#FF6600]">
                  {algorithmName}
                </p>
              </div>
            </div>
          </div>

          {/* MAPA */}

          <div className="h-full min-h-[620px] w-full">
            <RouteMap
              route={result?.path ?? []}
              deliveryOrder={
                isDeliveryResult
                  ? result.delivery_order
                  : []
              }
            />
          </div>

          {/* PEDIDO ENTREGADO */}

          {pedidoEntregado && (
            <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-slate-950/10 backdrop-blur-[2px]">
              <div className="mx-4 w-full max-w-sm rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-2xl">
                
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-3xl text-emerald-600">
                    ✓
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-black text-slate-950">
                  ¡Pedido entregado!
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  El pedido fue entregado correctamente.
                </p>

                <button
                  type="button"
                  onClick={() => setPedidoEntregado(false)}
                  className="mt-5 rounded-xl bg-[#FF6600] px-5 py-2.5 text-xs font-black text-white transition hover:bg-[#e95700]"
                >
                  Cerrar
                </button>

              </div>
            </div>
          )}

          {/* LEYENDA */}

          <div className="absolute bottom-3 left-3 z-[1000]">
            <div className="rounded-xl border border-orange-100 bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-5 rounded-full bg-[#FF6600]" />

                  <span className="text-[9px] font-bold text-slate-700">
                    Ruta
                  </span>
                </div>

                <div className="h-3 w-px bg-slate-200" />

                <span className="text-[9px] font-bold text-slate-500">
                  Miraflores · San Isidro
                </span>
              </div>
            </div>
          </div>

          {/* ESTADO */}

          <div className="absolute bottom-3 right-3 z-[1000]">
            <div className="rounded-xl bg-[#FF6600] px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">🛵</span>

                <div>
                  <p className="text-[8px] font-bold uppercase tracking-wider text-orange-100">
                    Estado del recorrido
                  </p>

                  <p className="text-[10px] font-black text-white">
                    {loading
                      ? "Calculando..."
                      : result
                        ? "Ruta calculada"
                        : "Esperando ruta"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =================================================
            PANEL DE RESULTADOS
        ================================================== */}

        <aside className="min-h-0 h-full overflow-y-auto pr-2 lg:col-span-4 xl:col-span-3">
          <div className="flex flex-col gap-3">

            {/* RESULTADO */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-black text-slate-950">
                      Ruta calculada
                    </h2>

                    <p className="mt-0.5 text-[10px] text-slate-500">
                      Métricas del algoritmo
                    </p>
                  </div>

                  {result && (
                    <span className="rounded-full bg-[#FFCC00] px-2 py-0.5 text-[7px] font-black text-orange-950">
                      CALCULADA
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <RouteResult result={result} mode={mode} />
              </div>
            </section>

            {/* COMPARACIÓN */}

            {comparison.length > 0 && (
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-black text-slate-900">
                  Comparación de algoritmos
                </h2>

                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[440px] text-left text-[10px]">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400">
                        <th className="py-2 pr-2">Algoritmo</th>
                        <th className="py-2 pr-2">Tiempo</th>
                        <th className="py-2 pr-2">Estados</th>
                        <th className="py-2 pr-2">Costo</th>
                        <th className="py-2">Resultado</th>
                      </tr>
                    </thead>

                    <tbody>
                      {comparison.map((item) => (
                        <tr
                          key={item.algorithm}
                          className="border-b border-slate-50"
                        >
                          <td className="py-2 pr-2 font-bold text-slate-700">
                            {algorithmNames[item.algorithm] ??
                              item.algorithm}
                          </td>

                          <td className="py-2 pr-2 text-slate-600">
                            {item.result
                              ? `${item.result.execution_time_ms.toFixed(2)} ms`
                              : "Error"}
                          </td>

                          <td className="py-2 pr-2 text-slate-600">
                            {item.result?.states_explored ?? "—"}
                          </td>

                          <td className="py-2 pr-2 text-slate-600">
                            {item.result
                              ? item.result.weighted_cost.toFixed(2)
                              : "—"}
                          </td>

                          <td className="py-2 text-slate-600">
                            {item.result
                              ? item.result.is_optimal
                                ? "Óptimo"
                                : "Aproximado"
                              : item.error ?? "Error"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ENTREGAR PEDIDO */}

              <button
              type="button"
              disabled={!result || loading || pedidoEntregado}
              onClick={() => setPedidoEntregado(true)}
              className="w-full rounded-xl bg-[#FF6600] px-4 py-3 text-sm font-black text-white shadow-[0_4px_12px_rgba(255,102,0,0.25)] 
              transition hover:bg-[#e95700] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50">

              {pedidoEntregado ? "✓ Pedido entregado" : "📦 Entregar pedido"} </button>


          </div>
        </aside>

      </div>
    </main>
  </div>
  );
}

