
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function ClientePage() {
  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-5">

        {/* HERO */}
        <section className="overflow-hidden rounded-3xl bg-[#FF6600] shadow-[0_10px_30px_rgba(255,102,0,0.15)]">

          <div className="grid items-center gap-8 px-8 py-8 md:grid-cols-2">

            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-widest text-orange-100">
                RAPPI DELIVERY
              </p>

              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                Pide lo que quieras.
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-orange-50">
                Encuentra productos, realiza tu pedido y recibe tu entrega
                utilizando una ruta optimizada.
              </p>

              <Link
                href="/rol/cliente/registro"
                className="mt-4 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-black text-[#FF6600] shadow-lg transition hover:bg-orange-50"
              >
                Comenzar pedido →
              </Link>
            </div>

            <div className="flex justify-center">
              <div className="flex h-52 w-52 rotate-3 items-center justify-center rounded-[3rem] bg-white/15 text-8xl shadow-inner">
                🛵
              </div>
            </div>

          </div>
        </section>


        {/* PASOS */}
        <section className="mt-5">

          <h2 className="text-xl font-black text-slate-950">
            ¿Cómo funciona?
          </h2>

          <div className="mt-2 grid gap-4 md:grid-cols-3">

            <Step
              number="01"
              icon="👤"
              title="Regístrate"
              description="Ingresa tus datos para realizar tu pedido."
            />

            <Step
              number="02"
              icon="🛒"
              title="Elige tus productos"
              description="Selecciona los productos que deseas recibir."
            />

            <Step
              number="03"
              icon="🛵"
              title="Recibe tu pedido"
              description="Nuestro sistema calcula una ruta conveniente para la entrega."
            />

          </div>

        </section>

      </main>
    </div>
  );
}

function Step({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">

      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-[#FF6600]">
          {number}
        </span>

        <span className="text-2xl">
          {icon}
        </span>
      </div>

      <h3 className="mt-2 text-sm font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

    </div>
  );
}
