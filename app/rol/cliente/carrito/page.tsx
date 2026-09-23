"use client";

import Link from "next/link";

export default function CarritoPage() {
const items = [
{
id: 1,
name: "Hamburguesa clásica",
price: 18,
quantity: 2,
emoji: "🍔",
},
{
id: 2,
name: "Gaseosa",
price: 6,
quantity: 1,
emoji: "🥤",
},
];

const subtotal = items.reduce(
(total, item) => total + item.price * item.quantity,
0
);

const delivery = 5;
const total = subtotal + delivery;

return ( <div className="min-h-screen bg-[#fffaf5]">

  <main className="mx-auto max-w-2xl px-6 py-5">

    <div className="mb-8">
      <p className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
        Paso 03
      </p>

      <h1 className="mt-1 text-3xl font-black text-slate-950">
        Tu carrito
      </h1>
    </div>

    <div className="space-y-3">

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-2xl border border-orange-100 bg-white p-4"
        >

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-2xl">
              {item.emoji}
            </div>

            <div>
              <h2 className="text-sm font-black text-slate-950">
                {item.name}
              </h2>

              <p className="text-xs text-slate-500">
                Cantidad: {item.quantity}
              </p>
            </div>

          </div>

          <p className="font-black text-slate-950">
            S/ {(item.price * item.quantity).toFixed(2)}
          </p>

        </div>
      ))}

    </div>

    <div className="mt-6 rounded-2xl border border-orange-100 bg-white p-5">

      <div className="flex justify-between text-sm">
        <span className="text-slate-500">Subtotal</span>
        <span className="font-bold">
          S/ {subtotal.toFixed(2)}
        </span>
      </div>

      <div className="mt-2 flex justify-between text-sm">
        <span className="text-slate-500">Delivery</span>
        <span className="font-bold">
          S/ {delivery.toFixed(2)}
        </span>
      </div>

      <div className="my-4 border-t" />

      <div className="flex justify-between">
        <span className="font-black text-slate-950">
          Total
        </span>

        <span className="text-xl font-black text-[#FF6600]">
          S/ {total.toFixed(2)}
        </span>
      </div>

      <Link
        href="/rol/cliente/pedido"
        className="mt-5 block rounded-xl bg-[#FF6600] px-4 py-3 text-center text-sm font-black text-white"
      >
        Continuar con el pedido →
      </Link>

    </div>

  </main>
</div>

);
}
