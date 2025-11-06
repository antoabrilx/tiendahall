import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const {
    user,
    updateDisplayName,
    updateUserEmail,
    updateUserPassword,
    logout,
  } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  if (!user) return null;

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      setBusy(true);
      await updateDisplayName(name.trim());
      setMsg("Nombre actualizado ✅");
    } catch (err) {
      setMsg(err.message || "Error al actualizar nombre");
    } finally {
      setBusy(false);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      setBusy(true);
      await updateUserEmail(email.trim());
      setMsg("Correo actualizado ✅");
    } catch (err) {
      setMsg(err.message || "Error al actualizar correo");
    } finally {
      setBusy(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      setBusy(true);
      await updateUserPassword(password);
      setPassword("");
      setMsg("Contraseña actualizada ✅");
    } catch (err) {
      setMsg(err.message || "Error al actualizar contraseña");
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
          </div>
        </div>

        {/* Actualizar nombre */}
        <form onSubmit={handleUpdateName} className="grid gap-3 mb-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Nombre</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="px-5 py-2 rounded bg-[#8B0000] text-white disabled:opacity-60"
          >
            Guardar nombre
          </button>
        </form>

        {/* Actualizar email */}
        <form onSubmit={handleUpdateEmail} className="grid gap-3 mb-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Correo electrónico</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="px-5 py-2 rounded bg-[#8B0000] text-white disabled:opacity-60"
          >
            Guardar correo
          </button>
        </form>

        {/* Actualizar contraseña */}
        <form onSubmit={handleUpdatePassword} className="grid gap-3 mb-6">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Nueva contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#8B0000]"
              placeholder="********"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="px-5 py-2 rounded bg-[#8B0000] text-white disabled:opacity-60"
          >
            Cambiar contraseña
          </button>
        </form>

        {!!msg && <p className="text-sm text-gray-600 mt-2">{msg}</p>}

        <hr className="my-4" />
        <button
          onClick={logout}
          className="px-5 py-2 rounded border text-gray-700 hover:bg-gray-100"
        >
          Cerrar sesión
        </button>
      </div>
    </section>
  );
}
