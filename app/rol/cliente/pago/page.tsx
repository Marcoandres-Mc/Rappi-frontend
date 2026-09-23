"use client";

import { useState } from "react";
import Link from "next/link";

export default function PagoPage() {
const [method, setMethod] = useState("card");

return ( <div className="min-h-screen bg-[#fffaf5]">

  <main className="mx-auto max-w-xl px-6 py-10">

    <div className="mb-8">
      <p className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
        Paso 05
      </p>

      <h1 className="mt-1 text-3xl font-black text-slate-950">
        Método de pago
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Selecciona cómo deseas pagar tu pedido.
      </p>
    </div>

    <section className="rounded-2xl border border-orange-100 bg-white p-5">

      <div className="space-y-3">

        <button
          onClick={() => setMethod("card")}
          className={`w-full rounded-xl border p-4 text-left ${
            method === "card"
              ? "border-[#FF6600] bg-orange-50"
              : "border-slate-200"
          }`}
        >
          <p className="text-sm font-black text-slate-950">
            💳 Tarjeta
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Visa, Mastercard u otra tarjeta.
          </p>
        </button>


        <button
          onClick={() => setMethod("cash")}
          className={`w-full rounded-xl border p-4 text-left ${
            method === "cash"
              ? "border-[#FF6600] bg-orange-50"
              : "border-slate-200"
          }`}
        >
          <p className="text-sm font-black text-slate-950">
            💵 Efectivo
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Paga al recibir tu pedido.
          </p>
        </button>

      </div>


      {method === "card" && (
        <div className="mt-5 space-y-3">

          <input
            placeholder="Número de tarjeta"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6600]"
          />

          <div className="grid grid-cols-2 gap-3">

            <input
              placeholder="MM/AA"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6600]"
            />

            <input
              placeholder="CVV"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6600]"
            />

          </div>

        </div>
      )}


      <div className="my-6 border-t" />

      <div className="flex items-center justify-between">
        <span className="font-black text-slate-950">
          Total
        </span>

        <span className="text-2xl font-black text-[#FF6600]">
          S/ 47.00
        </span>
      </div>


      <Link
        href="/rol/cliente"
        className="mt-6 block rounded-xl bg-[#FF6600] px-4 py-3 text-center text-sm font-black text-white"
      >
        Confirmar pedido
      </Link>

    </section>

  </main>
</div>


);
}
