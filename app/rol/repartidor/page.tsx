"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import RouteResult from "@/components/route/RouteResult";
import RouteForm from "@/components/route/RouteForm";
import Navbar from "@/components/layout/Navbar";

import {
  calculateRoute,
  type RouteRequest,
  type RouteResult as RouteResultType,
} from "@/services/routeService";


// =========================================================
// MAPA
// =========================================================

const RouteMap = dynamic(
  () => import("@/components/map/RouteMap"),
  {
    ssr: false,

    loading: () => (
      <div className="flex h-full min-h-[620px] items-center justify-center rounded-xl bg-gray-100">
        <p className="text-gray-500">
          Cargando mapa...
        </p>
      </div>
    ),
  }
);


// =========================================================
// PÁGINA
// =========================================================

export default function RepartidorPage() {

  const [result, setResult] =
    useState<RouteResultType | null>(null);

  const [loading, setLoading] =
    useState(false);


  // =======================================================
  // CALCULAR RUTA
  // =======================================================

  const handleCalculate = async (
    request: RouteRequest
  ) => {

    setLoading(true);

    try {

      const data = await calculateRoute(request);

      setResult(data);

    } catch (error) {

      console.error(
        "Error calculando la ruta:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // =======================================================
  // RENDER
  // =======================================================

  return (

    <div className="min-h-screen w-full bg-[#fffaf5]">

      <Navbar />

      <main className="p-3 lg:p-4">

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">


          {/* =================================================
              PANEL DEL REPARTIDOR
          ================================================== */}

          <aside className="flex min-h-0 flex-col gap-3 lg:col-span-4 xl:col-span-3">


            {/* =================================================
                PERFIL
            ================================================== */}

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
                      {result?.destinos?.length ?? 0}
                    </p>

                    <p className="text-[8px] font-bold uppercase text-slate-400">
                      Destinos
                    </p>

                  </div>


                  <div className="rounded-xl bg-slate-50 p-2 text-center">

                    <p className="text-lg font-black text-[#FF6600]">

                      {result?.costo_total != null
                        ? `${(
                            result.costo_total / 1000
                          ).toFixed(2)}`
                        : "—"}

                    </p>

                    <p className="text-[8px] font-bold uppercase text-slate-400">
                      Km
                    </p>

                  </div>


                  <div className="rounded-xl bg-slate-50 p-2 text-center">

                    <p className="text-lg font-black text-slate-900">
                      —
                    </p>

                    <p className="text-[8px] font-bold uppercase text-slate-400">
                      Min
                    </p>

                  </div>

                </div>

              </div>

            </section>


            {/* =================================================
                OPTIMIZAR RECORRIDO
            ================================================== */}

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
                      Calcula la ruta de tus entregas
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-4">

                <RouteForm
                  onCalculate={handleCalculate}
                  loading={loading}
                />

              </div>

            </section>


            {/* =================================================
                RESULTADO
            ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-4 py-3">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <h2 className="text-sm font-black text-slate-950">
                        Ruta calculada
                      </h2>

                      {result && (

                        <span className="rounded-full bg-[#FFCC00] px-2 py-0.5 text-[7px] font-black text-orange-950">
                          CALCULADA
                        </span>

                      )}

                    </div>

                    <p className="mt-0.5 text-[10px] text-slate-500">
                      Información del recorrido
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-4">

                <RouteResult
                  result={result}
                />

              </div>

            </section>


            {/* =================================================
                INICIAR ENTREGA
            ================================================== */}

            <button
              type="button"
              disabled={!result || loading}
              className="w-full rounded-xl bg-[#FF6600] px-4 py-3 text-sm font-black text-white shadow-[0_4px_12px_rgba(255,102,0,0.25)] transition hover:bg-[#e95700] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >

              🛵 Iniciar entrega

            </button>

          </aside>


          {/* =================================================
              MAPA
          ================================================== */}

          <section className="relative lg:col-span-8 xl:col-span-9 min-h-[620px] overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_5px_25px_rgba(255,102,0,0.08)]">


            {/* =================================================
                INFORMACIÓN SUPERIOR
            ================================================== */}

            <div className="absolute left-3 right-3 top-3 z-[1000] flex items-start justify-between">


              {/* RED VIAL */}

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


              {/* INFORMACIÓN DEL ALGORITMO */}

              <div className="hidden overflow-hidden rounded-xl border border-orange-100 bg-white/95 shadow-lg backdrop-blur sm:flex">

                <div className="px-3 py-2">

                  <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    Algoritmo
                  </p>

                  <p className="mt-0.5 text-[11px] font-black text-[#FF6600]">
                    {result?.algoritmo ?? "Esperando"}
                  </p>

                </div>


                <div className="w-px bg-orange-100" />


                <div className="px-3 py-2">

                  <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    Estado
                  </p>

                  <div className="mt-0.5 flex items-center gap-1.5">

                    <span
                      className={`h-2 w-2 rounded-full ${
                        loading
                          ? "bg-[#FFCC00]"
                          : result
                            ? "bg-emerald-500"
                            : "bg-slate-300"
                      }`}
                    />

                    <p className="text-[11px] font-black text-slate-900">

                      {loading
                        ? "Calculando"
                        : result
                          ? "Ruta lista"
                          : "Esperando"}

                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                MAPA
            ================================================== */}

            <div className="h-full w-full">

              <RouteMap
                points={result?.puntos_mapa ?? []}

                districts={[
                  "Miraflores",
                  "San Isidro",
                ]}
              />

            </div>


            {/* =================================================
                LEYENDA
            ================================================== */}

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


                  <div className="flex items-center gap-1.5">

                    <span className="h-2 w-2 rounded-full bg-[#FFCC00]" />

                    <span className="text-[9px] font-bold text-slate-700">
                      Destino
                    </span>

                  </div>


                  <div className="h-3 w-px bg-slate-200" />


                  <span className="text-[9px] font-bold text-slate-500">
                    Miraflores · San Isidro
                  </span>

                </div>

              </div>

            </div>


            {/* =================================================
                ESTADO
            ================================================== */}

            <div className="absolute bottom-3 right-3 z-[1000]">

              <div className="rounded-xl bg-[#FF6600] px-3 py-2 shadow-lg">

                <div className="flex items-center gap-2">

                  <span className="text-sm">
                    🛵
                  </span>

                  <div>

                    <p className="text-[8px] font-bold uppercase tracking-wider text-orange-100">
                      Estado del pedido
                    </p>

                    <p className="text-[10px] font-black text-white">

                      {result
                        ? "Ruta optimizada"
                        : "Esperando ruta"}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}