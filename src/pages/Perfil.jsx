// src/pages/Perfil.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const { user, updateDisplayName, logout } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  if (!user) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      setBusy(true);
      await updateDisplayName(name.trim());
      setMsg("Nombre actualizado ✅");
    } catch (err) {
      setMsg(err.message || "No se pudo actualizar.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold mb-4">Mi Perfil</h2>

        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-full grid place-items-center text-white text-xl"
            style={{ background: "#8B0000" }}
          >
            {(user.displayName || user.email || "?").charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium">{user.displayName || "Sin nombre"}</div>
            <div className="text-gray-600 text-sm">{user.email}</div>
            <div className="text-gray-400 text-xs">UID: {user.uid}</div>
          </div>
        </div>

        <form onSubmit={handleSave} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Nombre a mostrar</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]"
              placeholder="Ej: Emiliano"
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={busy}
              className="px-5 py-2 rounded bg-[#8B0000] text-white disabled:opacity-60"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={logout}
              className="px-5 py-2 rounded border"
            >
              Cerrar sesión
            </button>
          </div>

          {!!msg && <p className="text-sm text-gray-600 mt-1">{msg}</p>}
        </form>
      </div>
    </section>
  );
}