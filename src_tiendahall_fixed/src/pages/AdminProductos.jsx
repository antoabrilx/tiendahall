// src/pages/AdminProductos.jsx
import React, { useEffect, useState } from "react";
import { useProductos } from "../hooks/useProductos";
import { useAuth } from "../context/AuthContext";

// ===== Modal compacto para Crear/Editar =====
function ProductModal({ open, initial, onClose, onSave, busy }) {
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = useState({
    nombre: "", descripcion: "", categoria: "",
    color: "", year: "", region: "",
    imagenUrl: "", precio: "", stock: ""
  });

  useEffect(() => {
    if (!open) return;
    if (isEdit) {
      setForm({
        nombre: initial?.nombre ?? "",
        descripcion: initial?.descripcion ?? "",
        categoria: initial?.categoria ?? "",
        color: initial?.color ?? "",
        year: initial?.year ?? "",
        region: initial?.region ?? "",
        imagenUrl: initial?.imagenUrl ?? "",
        precio: initial?.precio ?? "",
        stock: initial?.stock ?? ""
      });
    } else {
      setForm({
        nombre: "", descripcion: "", categoria: "",
        color: "", year: "", region: "",
        imagenUrl: "", precio: "", stock: ""
      });
    }
  }, [open, isEdit, initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({
      ...form,
      precio: Number(form.precio || 0),
      stock: Number(form.stock || 0),
      year: form.year ? Number(form.year) : null,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {/* modal */}
      <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto mx-4 bg-white rounded-xl shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">
            {isEdit ? "Editar producto" : "Agregar producto"}
          </h3>
          <button onClick={onClose} className="px-3 py-1 rounded border hover:bg-gray-50">
            Cerrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 grid gap-4">
          {/* fila 1 */}
          <div className="grid md:grid-cols-2 gap-4">
            <label className="grid gap-1">
              <span className="text-sm font-medium">Nombre</span>
              <input
                name="nombre" value={form.nombre} onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]" required
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium">Precio ($)</span>
              <input
                name="precio" type="number" step="0.01" min="0"
                value={form.precio} onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]" required
              />
            </label>
          </div>

          {/* fila 2 */}
          <div className="grid md:grid-cols-2 gap-4">
            <label className="grid gap-1">
              <span className="text-sm font-medium">Stock</span>
              <input
                name="stock" type="number" min="0"
                value={form.stock} onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]" required
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium">Color</span>
              <select
                name="color" value={form.color} onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]" required
              >
                <option value="">Seleccionar color</option>
                <option value="tinto">Tinto</option>
                <option value="blanco">Blanco</option>
                <option value="rosado">Rosado</option>
                <option value="espumoso">Espumoso</option>
              </select>
            </label>
          </div>

          {/* fila 3 */}
          <div className="grid md:grid-cols-2 gap-4">
            <label className="grid gap-1">
              <span className="text-sm font-medium">Año</span>
              <input
                name="year" type="number" min="1900" max="2100"
                value={form.year} onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium">Región</span>
              <input
                name="region" value={form.region} onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]"
              />
            </label>
          </div>

          {/* fila 4 */}
          <label className="grid gap-1">
            <span className="text-sm font-medium">Imagen URL</span>
            <input
              name="imagenUrl" value={form.imagenUrl} onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]"
            />
          </label>

          {/* fila 5 */}
          <label className="grid gap-1">
            <span className="text-sm font-medium">Descripción</span>
            <textarea
              name="descripcion" rows={2}
              value={form.descripcion} onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]" required
            />
          </label>

          <div className="flex justify-end gap-3 pt-1">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded border" disabled={busy}>
              Cancelar
            </button>
            <button type="submit" className="px-5 py-2 rounded bg-[#8B0000] text-white disabled:opacity-60" disabled={busy}>
              {isEdit ? "Guardar cambios" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ===== Página de Administración =====
export default function AdminProductos() {
  const { user } = useAuth(); // acceso: cualquier usuario logueado (admin de prueba)
  const { productos, createProducto, updateProductoById, deleteProductoById } = useProductos();

  const [busy, setBusy] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(null); // null = crear, objeto = editar

  if (!user) {
    return (
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-yellow-700">Debes iniciar sesión para administrar productos.</p>
        </div>
      </section>
    );
  }

  const openCreate = () => { setCurrent(null); setModalOpen(true); };
  const openEdit = (p) => { setCurrent(p); setModalOpen(true); };

const onSave = async (data) => {
  try {
    setBusy(true);
    if (current && current.id) {
      console.log("[onSave] UPDATE id:", current.id, "payload:", data);
      await updateProductoById(current.id, data);
    } else {
      console.log("[onSave] CREATE payload:", data);
      await createProducto(data);
    }
    setModalOpen(false);
    setCurrent(null);
  } catch (err) {
    console.error("Error guardando:", err);
    alert(`No se pudo guardar:\n${err.code || ""} ${err.message || err}`);
  } finally {
    setBusy(false);
  }
};

const onDeleteClick = async (id) => {
  if (!window.confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
  try {
    setBusy(true);
    console.log("[onDeleteClick] DELETE id:", id);
    await deleteProductoById(id);
  } catch (err) {
    console.error("Error eliminando:", err);
    alert(`No se pudo eliminar:\n${err.code || ""} ${err.message || err}`);
  } finally {
    setBusy(false);
  }
};

  return (
    <section id="admin" className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Administrar Productos</h2>
            <p className="text-gray-600">Agregar, editar o eliminar productos.</p>
          </div>
          <button onClick={openCreate} className="px-4 py-2 rounded bg-[#8B0000] text-white hover:brightness-110">
            Agregar producto
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2C1A1D] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-left">Precio</th>
                  <th className="px-6 py-3 text-left">Color</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  <th className="px-6 py-3 text-left">Año</th>
                  <th className="px-6 py-3 text-left">Región</th>
                  <th className="px-6 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{p.id}</td>
                    <td className="px-6 py-4 font-medium">{p.nombre}</td>
                    <td className="px-6 py-4">${Number(p.precio ?? 0).toFixed(2)}</td>
                    <td className="px-6 py-4">{p.color || "-"}</td>
                    <td className="px-6 py-4">{p.stock ?? 0}</td>
                    <td className="px-6 py-4">{p.year ?? "-"}</td>
                    <td className="px-6 py-4">{p.region || "-"}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => openEdit(p)} className="text-blue-600 hover:text-blue-800 mr-4">
                        Editar
                      </button>
                      <button onClick={() => onDeleteClick(p.id)} className="text-red-600 hover:text-red-800">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {productos.length === 0 && (
                  <tr>
                    <td className="px-6 py-6 text-center text-gray-500" colSpan={8}>
                      No hay productos cargados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal (único: crear o editar) */}
        <ProductModal
          open={modalOpen}
          initial={current}
          onClose={() => { setModalOpen(false); setCurrent(null); }}
          onSave={onSave}
          busy={busy}
        />
      </div>
    </section>
  );
}