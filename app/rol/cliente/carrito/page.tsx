"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/services/api";

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
  cantidad: number;
}

interface Usuario {
  id: number;
  nombre: string;
  ubicacion_actual: string;
}

export default function CarritoPage() {
  const router = useRouter();

  const [items] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const carritoGuardado = sessionStorage.getItem("carrito");

    if (!carritoGuardado) return [];

    try {
      const carrito: unknown = JSON.parse(carritoGuardado);

      return Array.isArray(carrito)
        ? (carrito as CartItem[])
        : [];
    } catch (error) {
      console.error("Error al leer el carrito:", error);
      return [];
    }
  });

  const [enviando, setEnviando] = useState(false);

  const delivery = 5;

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.cantidad,
    0
  );

  const total = subtotal + delivery;

  const continuarPedido = async () => {
    try {
      setEnviando(true);

      // 1. Obtener usuario guardado en RegistroPage
      const usuarioGuardado =
        sessionStorage.getItem("usuario");

      if (!usuarioGuardado) {
        alert("No se encontraron los datos del usuario.");
        return;
      }

      const usuario: Usuario =
        JSON.parse(usuarioGuardado);

      // 2. Construir todo el pedido
      const pedido = {
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          ubicacion_actual: usuario.ubicacion_actual,
        },

        carrito: {
          items,
          subtotal,
          delivery,
          total,
        },
      };

      console.log("Pedido enviado al backend:", pedido);

      // 3. Enviar TODO al backend
      const respuesta = await apiFetch("/routes/pedido", {
        method: "POST",
        body: JSON.stringify(pedido),
      });

      console.log("Respuesta del backend:", respuesta);

      // 4. Guardar también localmente por si RepartidorPage lo necesita
      sessionStorage.setItem(
        "resumenPedido",
        JSON.stringify(pedido)
      );

      // 5. Ir al siguiente paso
      router.push("/rol/repartidor");

    } catch (error) {
      console.error("Error al enviar el pedido:", error);

      alert(
        "No se pudo enviar el pedido al servidor."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <main className="mx-auto max-w-2xl px-6 py-5">

        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
            Paso 03
          </p>

          <h1 className="mt-1 text-3xl font-black text-slate-950">
            Tu carrito
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-orange-100 bg-white p-6 text-center">

            <p className="text-sm text-slate-500">
              Tu carrito está vacío.
            </p>

            <Link
              href="/rol/cliente/productos"
              className="mt-4 inline-block rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-black text-white"
            >
              Volver a productos
            </Link>

          </div>
        ) : (
          <>

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
                        Cantidad: {item.cantidad}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        S/ {item.price.toFixed(2)} c/u
                      </p>

                    </div>

                  </div>

                  <p className="font-black text-slate-950">
                    S/ {(item.price * item.cantidad).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

            <div className="mt-6 rounded-2xl border border-orange-100 bg-white p-5">

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">
                  Subtotal
                </span>

                <span className="font-bold">
                  S/ {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="mt-2 flex justify-between text-sm">
                <span className="text-slate-500">
                  Delivery
                </span>

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

              <button
                type="button"
                onClick={continuarPedido}
                disabled={enviando}
                className="mt-5 block w-full rounded-xl bg-[#FF6600] px-4 py-3 text-center text-sm font-black text-white transition hover:bg-[#e95700] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enviando
                  ? "Enviando pedido..."
                  : "Continuar con el pedido →"}
              </button>

            </div>

          </>
        )}

      </main>

    </div>
  );
}