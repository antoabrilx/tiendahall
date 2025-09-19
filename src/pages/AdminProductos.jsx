// src/pages/AdminProductos.jsx
import React, { useState } from "react";
import { useProductos } from "../hooks/useProductos";
import ProductoForm from "../components/productos/ProductForm";

export default function AdminProductos() {
  const { productos, createProducto, updateProductoById, deleteProductoById } = useProductos();
  const [editItem, setEditItem] = useState(null);

  const handleCreate = async (data) => {
    await createProducto(data);
  };

  const handleUpdate = async (data) => {
    if (!editItem) return;
    await updateProductoById(editItem.id, data);
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este producto?")) {
      await deleteProductoById(id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 grid gap-6">
      {/* Crear */}
      {!editItem && (
        <ProductoForm onSubmit={handleCreate} />
      )}

      {/* Editar */}
      {editItem && (
        <ProductoForm
          initial={editItem}
          onSubmit={handleUpdate}
          onCancel={() => setEditItem(null)}
        />
      )}

      {/* Listado con acciones */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Productos</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productos.map((p) => (
            <article key={p.id} className="bg-white rounded-xl shadow p-3 grid gap-2">
              {p.imagenUrl ? (
                <img
                  src={p.imagenUrl}
                  alt={p.nombre}
                  className="w-full h-40 object-cover rounded"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded grid place-items-center text-gray-500">
                  Sin imagen
                </div>
              )}
              <div className="font-semibold">{p.nombre}</div>
              <div className="text-sm text-gray-600">{p.categoria}</div>
              <div className="text-sm line-clamp-2">{p.descripcion}</div>
              <div className="flex justify-between items-center mt-1">
                <span className="font-bold">$ {Number(p.precio ?? 0).toFixed(2)}</span>
                <span className="text-sm">Stock: {p.stock ?? 0}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setEditItem(p)}
                  className="px-3 py-1 rounded border"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 rounded bg-red-600 text-white"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
