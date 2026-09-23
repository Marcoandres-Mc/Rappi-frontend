import Link from "next/link";

export default function PedidoPage() {
return ( <div className="min-h-screen bg-[#fffaf5]">

```
  <main className="mx-auto max-w-5xl px-6 py-10">

    <div className="mb-8">
      <p className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
        Paso 04
      </p>

      <h1 className="mt-1 text-3xl font-black text-slate-950">
        Detalle del pedido
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Revisa tu pedido y la ruta estimada antes de realizar el pago.
      </p>
    </div>

    <div className="grid gap-5 lg:grid-cols-2">

      {/* PEDIDO */}
      <section className="rounded-2xl border border-orange-100 bg-white p-5">

        <h2 className="text-lg font-black text-slate-950">
          Resumen
        </h2>

        <div className="mt-5 space-y-4">

          <div className="flex justify-between">
            <span className="text-sm text-slate-500">
              Dirección
            </span>

            <span className="max-w-[220px] text-right text-sm font-bold">
              Av. Larco 456, Miraflores
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-slate-500">
              Productos
            </span>

            <span className="text-sm font-bold">
              3 productos
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-slate-500">
              Subtotal
            </span>

            <span className="text-sm font-bold">
              S/ 42.00
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-slate-500">
              Delivery
            </span>

            <span className="text-sm font-bold">
              S/ 5.00
            </span>
          </div>

          <div className="border-t pt-4 flex justify-between">
            <span className="font-black">
              Total
            </span>

            <span className="text-xl font-black text-[#FF6600]">
              S/ 47.00
            </span>
          </div>

        </div>
      </section>


      {/* RUTA */}
      <section className="rounded-2xl border border-orange-100 bg-white p-5">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-lg font-black text-slate-950">
              Ruta estimada
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Calculada mediante el sistema de optimización.
            </p>
          </div>

          <span className="rounded-full bg-orange-50 px-3 py-1 text-[9px] font-black text-[#FF6600]">
            DIJKSTRA
          </span>

        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[9px] font-bold uppercase text-slate-400">
              Distancia
            </p>

            <p className="mt-1 text-xl font-black text-slate-950">
              4.8 km
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[9px] font-bold uppercase text-slate-400">
              Tiempo estimado
            </p>

            <p className="mt-1 text-xl font-black text-slate-950">
              15 min
            </p>
          </div>

        </div>

        <div className="mt-4 rounded-xl bg-orange-50 p-4">

          <div className="flex items-center gap-3">

            <span className="text-2xl">
              🛵
            </span>

            <div>
              <p className="text-xs font-black text-slate-950">
                Entrega estimada
              </p>

              <p className="text-[11px] text-slate-500">
                Tu pedido llegará aproximadamente en 15 minutos.
              </p>
            </div>

          </div>

        </div>

        <Link
          href="/rol/cliente/pago"
          className="mt-5 block rounded-xl bg-[#FF6600] px-4 py-3 text-center text-sm font-black text-white"
        >
          Continuar al pago →
        </Link>

      </section>

    </div>

  </main>
</div>

);
}
