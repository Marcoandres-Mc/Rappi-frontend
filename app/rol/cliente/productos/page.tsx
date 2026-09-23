"use client";

import Link from "next/link";

const products = [
{
id: 1,
name: "Hamburguesa clásica",
price: 18,
category: "Comida",
emoji: "🍔",
},
{
id: 2,
name: "Pizza familiar",
price: 32,
category: "Comida",
emoji: "🍕",
},
{
id: 3,
name: "Gaseosa",
price: 6,
category: "Bebidas",
emoji: "🥤",
},
{
id: 4,
name: "Papas fritas",
price: 10,
category: "Complementos",
emoji: "🍟",
},
];

export default function ProductosPage() {
return ( <div className="min-h-screen bg-[#fffaf5]">

```
  <main className="mx-auto max-w-6xl px-6 py-10">

    <div className="mb-8">
      <p className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
        Paso 02
      </p>

      <h1 className="mt-1 text-3xl font-black text-slate-950">
        Productos disponibles
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Selecciona los productos que deseas agregar a tu pedido.
      </p>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

      {products.map((product) => (
        <div
          key={product.id}
          className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm"
        >

          <div className="flex h-36 items-center justify-center bg-orange-50 text-6xl">
            {product.emoji}
          </div>

          <div className="p-4">

            <p className="text-[9px] font-bold uppercase tracking-wider text-[#FF6600]">
              {product.category}
            </p>

            <h2 className="mt-1 text-sm font-black text-slate-950">
              {product.name}
            </h2>

            <div className="mt-4 flex items-center justify-between">

              <span className="text-lg font-black text-slate-950">
                S/ {product.price.toFixed(2)}
              </span>

              <button
                className="rounded-lg bg-[#FF6600] px-3 py-2 text-xs font-black text-white hover:bg-[#e95700]"
              >
                + Agregar
              </button>

            </div>

          </div>
        </div>
      ))}

    </div>

    <div className="mt-8 flex justify-end">
      <Link
        href="/rol/cliente/carrito"
        className="rounded-xl bg-[#FF6600] px-6 py-3 text-sm font-black text-white"
      >
        Ver carrito →
      </Link>
    </div>

  </main>
</div>


);
}
