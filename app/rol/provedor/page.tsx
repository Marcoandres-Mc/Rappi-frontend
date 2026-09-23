
"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}

export default function ProveedorPage() {
  const [providerName, setProviderName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  const [products, setProducts] = useState<Product[]>([]);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const addProduct = () => {
    if (!productName || !productPrice) return;

    const newProduct: Product = {
      id: Date.now(),
      name: productName,
      description: productDescription,
      price: productPrice,
    };

    setProducts((current) => [...current, newProduct]);

    setProductName("");
    setProductDescription("");
    setProductPrice("");
  };

  const removeProduct = (id: number) => {
    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  };

  const handleSubmit = () => {
    console.log({
      providerName,
      companyName,
      logo,
      description,
      products,
    });

    alert("Información del proveedor guardada");
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">

          <p className="text-xs font-black uppercase tracking-widest text-[#FF6600]">
            Panel del proveedor
          </p>

          <h1 className="mt-1 text-3xl font-black text-slate-950">
            Registrar proveedor
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Registra la información de tu empresa y agrega los productos
            que estarán disponibles para los clientes.
          </p>

        </div>


        {/* =====================================================
            INFORMACIÓN DEL PROVEEDOR
        ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

          <div className="h-1 bg-[#FF6600]" />

          <div className="border-b border-slate-100 px-6 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl">
                🏪
              </div>

              <div>
                <h2 className="text-base font-black text-slate-950">
                  Información de la empresa
                </h2>

                <p className="text-xs text-slate-500">
                  Datos principales del proveedor
                </p>
              </div>

            </div>

          </div>


          <div className="grid gap-6 p-6 md:grid-cols-[180px_1fr]">

            {/* LOGO */}

            <div className="flex flex-col items-center">

              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50">

                {logo ? (
                  <img
                    src={logo}
                    alt="Logo de la empresa"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">
                    🏪
                  </span>
                )}

              </div>

              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="URL del logo"
                className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-[10px] outline-none focus:border-[#FF6600]"
              />

              <p className="mt-1 text-center text-[9px] text-slate-400">
                Ingresa la URL de la imagen del logo
              </p>

            </div>


            {/* DATOS */}

            <div className="space-y-4">

              <div>
                <label className="text-xs font-bold text-slate-700">
                  Nombre del proveedor
                </label>

                <input
                  type="text"
                  value={providerName}
                  onChange={(e) => setProviderName(e.target.value)}
                  placeholder="Ej. Marco Andrés"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6600]"
                />
              </div>


              <div>
                <label className="text-xs font-bold text-slate-700">
                  Nombre de la empresa
                </label>

                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ej. Burger House"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6600]"
                />
              </div>


              <div>
                <label className="text-xs font-bold text-slate-700">
                  Descripción de la empresa
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe brevemente tu empresa..."
                  rows={4}
                  className="mt-1 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FF6600]"
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PRODUCTOS
        ====================================================== */}

        <section className="mt-5 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl">
                  📦
                </div>

                <div>
                  <h2 className="text-base font-black text-slate-950">
                    Productos
                  </h2>

                  <p className="text-xs text-slate-500">
                    Agrega los productos que ofrecerá tu empresa
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black text-[#FF6600]">
                {products.length} productos
              </span>

            </div>

          </div>


          {/* FORMULARIO PRODUCTO */}

          <div className="bg-slate-50 p-6">

            <div className="grid gap-4 md:grid-cols-2">

              <div>
                <label className="text-xs font-bold text-slate-700">
                  Nombre del producto
                </label>

                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Ej. Hamburguesa clásica"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#FF6600]"
                />
              </div>


              <div>
                <label className="text-xs font-bold text-slate-700">
                  Precio
                </label>

                <div className="relative mt-1">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    S/
                  </span>

                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#FF6600]"
                  />

                </div>
              </div>

            </div>


            <div className="mt-4">

              <label className="text-xs font-bold text-slate-700">
                Descripción del producto
              </label>

              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe el producto..."
                rows={3}
                className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#FF6600]"
              />

            </div>


            <button
              type="button"
              onClick={addProduct}
              className="mt-4 rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e95700]"
            >
              + Agregar producto
            </button>

          </div>


          {/* LISTA DE PRODUCTOS */}

          <div className="p-6">

            {products.length === 0 ? (

              <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">

                <div className="text-4xl">
                  📦
                </div>

                <p className="mt-3 text-sm font-bold text-slate-700">
                  Todavía no tienes productos
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Agrega tu primer producto utilizando el formulario.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {products.map((product) => (

                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
                  >

                    <div>

                      <h3 className="text-sm font-black text-slate-950">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {product.description || "Sin descripción"}
                      </p>

                    </div>


                    <div className="flex items-center gap-4">

                      <span className="font-black text-[#FF6600]">
                        S/ {Number(product.price).toFixed(2)}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        className="rounded-lg px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                      >
                        Eliminar
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </section>


        {/* =====================================================
            GUARDAR
        ====================================================== */}

        <div className="mt-6 flex justify-end">

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-[#FF6600] px-8 py-3 text-sm font-black text-white shadow-[0_4px_12px_rgba(255,102,0,0.2)] transition hover:bg-[#e95700]"
          >
            Guardar proveedor
          </button>

        </div>

      </main>
    </div>
  );
}

