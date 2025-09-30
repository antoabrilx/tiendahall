// src/components/productos/Productos.jsx
import React from "react";
import "./Productos.css";
import { useProductos } from "../../hooks/useProductos";

export default function Productos({ onAddToCart }) {
  const { productos } = useProductos(); // ✅ ahora sí se usa

  if (!productos) return null;

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Nuestros productos</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((p) => (
          <article key={p.id} className="bg-white rounded-xl shadow p-3 grid gap-2">
            {p.imagenUrl ? (
              <img src={p.imagenUrl} alt={p.nombre} className="w-full h-48 object-cover rounded" />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded grid place-items-center text-gray-500">Sin imagen</div>
            )}
            <h3 className="text-lg font-semibold">{p.nombre}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{p.descripcion}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">$ {Number(p.precio ?? 0).toFixed(2)}</span>
              <span className="text-sm">Stock: {p.stock ?? 0}</span>
            </div>
            {onAddToCart && (
              <button
                onClick={() => onAddToCart(p)}
                className="mt-2 px-3 py-2 rounded bg-[#8B0000] text-white hover:brightness-110"
              >
                Agregar al carrito
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
