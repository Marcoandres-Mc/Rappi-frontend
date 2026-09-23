import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const roles = [
  {
    title: "Cliente",
    description:
      "Realiza pedidos, selecciona productos, indica su ubicación y consulta el tiempo estimado de entrega.",
    icon: "👤",
    href: "/rol/cliente",
    color: "bg-orange-50",
    iconBg: "bg-[#FF6600]",
    tag: "Realizar pedido",
  },
  {
    title: "Proveedor",
    description:
      "Registra su empresa, administra sus productos y pone su catálogo a disposición de los clientes.",
    icon: "🏪",
    href: "/rol/proveedor",
    color: "bg-yellow-50",
    iconBg: "bg-[#FFCC00]",
    tag: "Gestionar productos",
  },
  {
    title: "Repartidor",
    description:
      "Recibe pedidos, consulta el destino y utiliza la ruta optimizada para realizar la entrega.",
    icon: "🛵",
    href: "/rol/repartidor",
    color: "bg-orange-50",
    iconBg: "bg-[#FF6600]",
    tag: "Optimizar ruta",
  },
];

const stats = [
  {
    value: "1,500+",
    label: "Nodos viales",
    icon: "◉",
  },
  {
    value: "3",
    label: "Roles del sistema",
    icon: "♙",
  },
  {
    value: "OSM",
    label: "Datos geográficos",
    icon: "⌖",
  },
  {
    value: "Dijkstra",
    label: "Algoritmo principal",
    icon: "↗",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <main>

        <section className="relative overflow-hidden">

          {/* DECORACIÓN DE FONDO */}

          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-100 blur-3xl" />

          <div className="pointer-events-none absolute -left-32 top-72 h-80 w-80 rounded-full bg-yellow-100 blur-3xl" />


          <div className="relative mx-auto max-w-7xl px-6 py-14 lg:py-20">

            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

              {/* TEXTO */}

              <div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 shadow-sm">

                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                    Sistema de simulación activo
                  </span>

                </div>


                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FF6600]">
                  RAPPI · LOGÍSTICA URBANA
                </p>


                <h1 className="mt-3 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
                  Simula el proceso
                  <span className="block text-[#FF6600]">
                    completo de delivery.
                  </span>
                </h1>


                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
                  Explora los diferentes roles que participan en una
                  plataforma de reparto y observa cómo la optimización de
                  rutas conecta clientes, proveedores y repartidores.
                </p>


                <div className="mt-8 flex flex-wrap gap-3">

                  <Link
                    href="/rol"
                    className="rounded-xl bg-[#FF6600] px-6 py-3.5 text-sm font-black text-white shadow-[0_6px_20px_rgba(255,102,0,0.25)] transition hover:bg-[#e95700] hover:-translate-y-0.5"
                  >
                    Iniciar simulación →
                  </Link>

                  <Link
                    href="/rol/repartidor"
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-slate-800 shadow-sm transition hover:border-orange-200 hover:text-[#FF6600]"
                  >
                    Ver optimización de rutas
                  </Link>

                </div>


                {/* MINI INFO */}

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">

                  <div className="flex items-center gap-2">
                    <span className="text-[#FF6600]">✓</span>
                    Red vial real
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[#FF6600]">✓</span>
                    Grafos ponderados
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[#FF6600]">✓</span>
                    Rutas optimizadas
                  </div>

                </div>

              </div>


              {/* VISUAL */}

              <div className="relative">

                {/* TARJETA PRINCIPAL */}

                <div className="relative rounded-[2rem] border border-orange-100 bg-white p-5 shadow-[0_20px_60px_rgba(255,102,0,0.12)]">

                  {/* HEADER */}

                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#FF6600]">
                        Live Simulation
                      </p>

                      <p className="mt-1 text-sm font-black text-slate-950">
                        Red de delivery
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />

                      <span className="text-[8px] font-black text-emerald-700">
                        ONLINE
                      </span>
                    </div>

                  </div>


                  {/* MAPA SIMULADO */}

                  <div className="relative mt-5 h-72 overflow-hidden rounded-2xl bg-slate-100">

                    {/* GRID */}

                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />

                    {/* CALLES */}

                    <div className="absolute left-[-10%] top-[45%] h-2 w-[120%] rotate-[-12deg] rounded-full bg-white shadow-sm" />

                    <div className="absolute left-[48%] top-[-20%] h-[140%] w-2 rotate-[22deg] rounded-full bg-white shadow-sm" />

                    <div className="absolute left-[10%] top-[20%] h-2 w-[80%] rotate-[28deg] rounded-full bg-white shadow-sm" />

                    <div className="absolute left-[15%] top-[70%] h-2 w-[75%] rotate-[-25deg] rounded-full bg-white shadow-sm" />


                    {/* RUTA */}

                    <svg
                      className="absolute inset-0 h-full w-full"
                      viewBox="0 0 500 300"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M80 225 C150 205 145 105 230 125 C310 145 300 55 410 70"
                        fill="none"
                        stroke="#FF6600"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="12 5"
                      />
                    </svg>


                    {/* PROVEEDOR */}

                    <div className="absolute left-[13%] top-[69%] flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#FFCC00] text-lg shadow-lg">
                      🏪
                    </div>


                    {/* REPARTIDOR */}

                    <div className="absolute left-[45%] top-[35%] flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-[#FF6600] text-lg shadow-lg">
                      🛵
                    </div>


                    {/* CLIENTE */}

                    <div className="absolute right-[12%] top-[17%] flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-lg shadow-lg">
                      📍
                    </div>


                    {/* ETIQUETA */}

                    <div className="absolute bottom-3 left-3 rounded-xl bg-white/95 px-3 py-2 shadow-lg backdrop-blur">

                      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                        Ruta calculada
                      </p>

                      <p className="text-xs font-black text-slate-950">
                        4.8 km · 15 min
                      </p>

                    </div>

                  </div>


                  {/* FLUJO */}

                  <div className="mt-5 grid grid-cols-3 gap-2">

                    <div className="rounded-xl bg-orange-50 p-3 text-center">
                      <div className="text-xl">👤</div>
                      <p className="mt-1 text-[9px] font-black text-slate-800">
                        Cliente
                      </p>
                    </div>

                    <div className="rounded-xl bg-yellow-50 p-3 text-center">
                      <div className="text-xl">🏪</div>
                      <p className="mt-1 text-[9px] font-black text-slate-800">
                        Proveedor
                      </p>
                    </div>

                    <div className="rounded-xl bg-orange-50 p-3 text-center">
                      <div className="text-xl">🛵</div>
                      <p className="mt-1 text-[9px] font-black text-slate-800">
                        Repartidor
                      </p>
                    </div>

                  </div>

                </div>


                {/* BADGE FLOTANTE */}

                <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-xl sm:block">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-lg">
                      ⚡
                    </div>

                    <div>
                      <p className="text-[8px] font-bold uppercase text-slate-400">
                        Optimización
                      </p>

                      <p className="text-xs font-black text-[#FF6600]">
                        Dijkstra activo
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            ESTADÍSTICAS
        ====================================================== */}

        <section className="border-y border-orange-100 bg-white">

          <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">

            {stats.map((stat, index) => (

              <div
                key={stat.label}
                className={`p-6 ${
                  index !== stats.length - 1
                    ? "border-r border-orange-100"
                    : ""
                }`}
              >

                <div className="flex items-center gap-3">

                  <span className="text-xl text-[#FF6600]">
                    {stat.icon}
                  </span>

                  <div>
                    <p className="text-xl font-black text-slate-950">
                      {stat.value}
                    </p>

                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </p>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =====================================================
            ROLES
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-16">

          <div className="max-w-2xl">

            <p className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
              Selecciona un rol
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Explora cada parte del sistema
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              La simulación representa la interacción entre los diferentes
              actores que participan en un servicio de delivery.
            </p>

          </div>


          <div className="mt-8 grid gap-5 md:grid-cols-3">

            {roles.map((role) => (

              <Link
                key={role.title}
                href={role.href}
                className="group"
              >

                <article className="h-full overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_15px_35px_rgba(255,102,0,0.12)]">

                  <div className={`p-6 ${role.color}`}>

                    <div className="flex items-start justify-between">

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${role.iconBg} text-2xl shadow-sm`}
                      >
                        {role.icon}
                      </div>

                      <span className="rounded-full bg-white/80 px-3 py-1 text-[8px] font-black uppercase tracking-wider text-slate-500">
                        {role.tag}
                      </span>

                    </div>

                  </div>


                  <div className="p-6">

                    <h3 className="text-xl font-black text-slate-950">
                      {role.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {role.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">

                      <span className="text-xs font-black text-[#FF6600]">
                        Entrar al módulo
                      </span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-[#FF6600] transition group-hover:bg-[#FF6600] group-hover:text-white">
                        →
                      </span>

                    </div>

                  </div>

                </article>

              </Link>

            ))}

          </div>

        </section>


        {/* =====================================================
            FLUJO DEL SISTEMA
        ====================================================== */}

        <section className="bg-slate-950">

          <div className="mx-auto max-w-7xl px-6 py-16">

            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

              <div>

                <p className="text-xs font-black uppercase tracking-widest text-[#FFCC00]">
                  Flujo de la simulación
                </p>

                <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
                  Del pedido a la entrega.
                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Cada rol participa en una etapa diferente del proceso.
                  El sistema conecta los datos del pedido con la red vial
                  para calcular un recorrido.
                </p>

              </div>


              <div className="space-y-3">

                <FlowItem
                  number="01"
                  icon="👤"
                  title="Cliente realiza un pedido"
                  description="Selecciona productos e indica su ubicación."
                />

                <FlowItem
                  number="02"
                  icon="🏪"
                  title="Proveedor prepara el pedido"
                  description="El proveedor dispone de sus productos para la compra."
                />

                <FlowItem
                  number="03"
                  icon="🛵"
                  title="Repartidor recibe la entrega"
                  description="El repartidor obtiene el origen y destino del pedido."
                />

                <FlowItem
                  number="04"
                  icon="🧠"
                  title="El sistema optimiza la ruta"
                  description="Se procesa el grafo vial mediante algoritmos de búsqueda."
                />

                <FlowItem
                  number="05"
                  icon="📍"
                  title="Pedido entregado"
                  description="El repartidor sigue la ruta calculada hasta el destino."
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            ALGORITMOS
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-16">

          <div className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm md:p-10">

            <div className="grid items-center gap-10 md:grid-cols-2">

              <div>

                <p className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
                  Motor de optimización
                </p>

                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  Una red vial convertida en un grafo.
                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  La simulación representa las intersecciones como nodos y
                  las calles como conexiones. Sobre esta estructura se
                  aplican diferentes estrategias algorítmicas para estudiar
                  la optimización de rutas.
                </p>

              </div>


              <div className="grid grid-cols-2 gap-3">

                <Algorithm
                  title="Dijkstra"
                  description="Ruta de menor costo"
                  active
                />

                <Algorithm
                  title="Backtracking"
                  description="Búsqueda con poda"
                />

                <Algorithm
                  title="Fuerza Bruta"
                  description="Exploración exhaustiva"
                />

                <Algorithm
                  title="Divide y Vencerás"
                  description="Separación por zonas"
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer className="border-t border-orange-100 bg-white">

          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-8 md:flex-row md:items-center">

            <div>

              <p className="text-sm font-black text-[#FF6600]">
                RAPPI · ROUTE OPTIMIZER
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Simulación académica de optimización de rutas urbanas.
              </p>

            </div>

            <p className="text-[10px] text-slate-400">
              Ingeniería de Software · Complejidad Algorítmica
            </p>

          </div>

        </footer>

      </main>
    </div>
  );
}


/* ============================================================
   COMPONENTES AUXILIARES
============================================================ */

function FlowItem({
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
    <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6600] text-lg">
        {icon}
      </div>

      <div className="flex-1">

        <div className="flex items-center gap-2">

          <span className="text-[9px] font-black text-[#FFCC00]">
            {number}
          </span>

          <h3 className="text-sm font-black text-white">
            {title}
          </h3>

        </div>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {description}
        </p>

      </div>

      <span className="hidden items-center text-slate-500 transition group-hover:text-[#FF6600] sm:flex">
        →
      </span>

    </div>
  );
}


function Algorithm({
  title,
  description,
  active = false,
}: {
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        active
          ? "border-orange-200 bg-orange-50"
          : "border-slate-100 bg-slate-50"
      }`}
    >

      <div className="flex items-center justify-between">

        <span
          className={`h-2 w-2 rounded-full ${
            active ? "bg-[#FF6600]" : "bg-slate-300"
          }`}
        />

        {active && (
          <span className="text-[7px] font-black uppercase text-[#FF6600]">
            Principal
          </span>
        )}

      </div>

      <p className="mt-3 text-sm font-black text-slate-950">
        {title}
      </p>

      <p className="mt-1 text-[9px] text-slate-500">
        {description}
      </p>

    </div>
  );
}

