// src/components/ProductoForm.jsx
import React, { useEffect, useState } from "react";

const empty = {
  nombre: "", descripcion: "", categoria: "",
  imagenUrl: "", precio: "", stock: ""
};

export default function ProductoForm({ initial = null, onCancel, onSubmit }) {
  const [form, setForm] = useState(empty);
  const isEdit = Boolean(initial?.id);

  useEffect(() => {
    if (initial) {
      setForm({
        nombre: initial.nombre ?? "",
        descripcion: initial.descripcion ?? "",
        categoria: initial.categoria ?? "",
        imagenUrl: initial.imagenUrl ?? "",
        precio: initial.precio ?? "",
        stock: initial.stock ?? ""
      });
    } else {
      setForm(empty);
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });
    if (!isEdit) setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold">{isEdit ? "Editar producto" : "Nuevo producto"}</h3>

      <label className="grid gap-1">
        <span>Nombre</span>
        <input name="nombre" value={form.nombre} onChange={handleChange} className="border rounded px-3 py-2"/>
      </label>

      <label className="grid gap-1">
        <span>Descripción</span>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="border rounded px-3 py-2"/>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span>Categoría</span>
          <input name="categoria" value={form.categoria} onChange={handleChange} className="border rounded px-3 py-2"/>
        </label>
        <label className="grid gap-1">
          <span>Precio</span>
          <input name="precio" type="number" step="0.01" value={form.precio} onChange={handleChange} className="border rounded px-3 py-2"/>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span>Stock</span>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} className="border rounded px-3 py-2"/>
        </label>
        <label className="grid gap-1">
          <span>Imagen URL</span>
          <input name="imagenUrl" value={form.imagenUrl} onChange={handleChange} className="border rounded px-3 py-2"/>
        </label>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-3 py-2 rounded border">
            Cancelar
          </button>
        )}
        <button type="submit" className="px-4 py-2 rounded bg-[#8B0000] text-white">
          {isEdit ? "Guardar cambios" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
