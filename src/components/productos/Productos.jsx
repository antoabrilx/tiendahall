// src/components/productos/Productos.jsx
import React, { useState } from "react";
import "./Productos.css";
import { useProductos } from "../../hooks/useProductos";
import ProductoModal from "./ProductoModal";

export default function Productos({ onAddToCart }) {
  const { productos } = useProductos();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  if (!productos) return null;

  // Filtrado general (nombre, descripción, categoría, región, año o precio)
  const productosFiltrados = productos.filter((p) => {
    const texto = busqueda.toLowerCase();
    return (
      p.nombre?.toLowerCase().includes(texto) ||
      p.descripcion?.toLowerCase().includes(texto) ||
      p.categoria?.toLowerCase().includes(texto) ||
      p.region?.toLowerCase().includes(texto) ||
      String(p.anio ?? "").includes(texto) ||
      String(p.precio ?? "").includes(texto)
    );
  });

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Nuestros productos</h2>

      {/* 🔍 Buscador simple */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre, categoría, región, año o precio..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
        />
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="text-center text-gray-600">No se encontraron productos.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productosFiltrados.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-xl shadow p-3 grid gap-2 cursor-pointer hover:shadow-lg transition"
              onClick={() => setProductoSeleccionado(p)}
            >
              {p.imagenUrl ? (
                <img
                  src={p.imagenUrl}
                  alt={p.nombre}
                  className="w-full h-64 object-contain rounded bg-gray-100"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded grid place-items-center text-gray-500">
                  Sin imagen
                </div>
              )}
              <h3 className="text-lg font-semibold">{p.nombre}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{p.descripcion}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">$ {Number(p.precio ?? 0).toFixed(2)}</span>
                <span className="text-sm">Stock: {p.stock ?? 0}</span>
              </div>
              {onAddToCart && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(p);
                  }}
                  className="mt-2 px-3 py-2 rounded bg-[#8B0000] text-white hover:brightness-110"
                >
                  Agregar al carrito
                </button>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      {productoSeleccionado && (
        <ProductoModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}
