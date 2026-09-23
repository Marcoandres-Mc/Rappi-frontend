
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function RegistroPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Navbar />

      <main className="mx-auto max-w-xl px-6 py-10">

        <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
              Paso 01
            </p>

            <h1 className="mt-1 text-2xl font-black text-slate-950">
              Datos del cliente
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Registra tus datos y la dirección donde deseas recibir tu pedido.
            </p>
          </div>

          <div className="space-y-4">

            <div>
              <label className="text-xs font-bold text-slate-700">
                Nombre completo
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Marco Andrés"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6600]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">
                Dirección de entrega
              </label>

              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Av. Larco 123, Miraflores"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6600]"
              />
            </div>

          </div>

          <Link
            href="/rol/cliente/productos"
            className="mt-6 block rounded-xl bg-[#FF6600] px-4 py-3 text-center text-sm font-black text-white transition hover:bg-[#e95700]"
          >
            Continuar →
          </Link>

        </div>

      </main>
    </div>
  );
}

