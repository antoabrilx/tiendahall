import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function EditarPerfil() {
  const { user, updateDisplayName, updateUserEmail, updateUserPassword } = useAuth();
  const [nombre, setNombre] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMensaje("");

    try {
      if (nombre.trim() && nombre !== user.displayName) {
        await updateDisplayName(nombre);
      }
      if (email.trim() && email !== user.email) {
        await updateUserEmail(email);
      }
      if (password.trim()) {
        await updateUserPassword(password);
      }
      setMensaje("Datos actualizados correctamente ✅");
    } catch (err) {
      setMensaje("Error: " + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold mb-4">Editar Perfil</h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <label>
            <span className="block text-sm font-medium mb-1">Nombre</span>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:border-[#8B0000] outline-none"
            />
          </label>

          <label>
            <span className="block text-sm font-medium mb-1">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:border-[#8B0000] outline-none"
            />
          </label>

          <label>
            <span className="block text-sm font-medium mb-1">Nueva contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Dejar vacío si no querés cambiarla"
              className="w-full border rounded px-3 py-2 focus:border-[#8B0000] outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="mt-2 px-5 py-2 bg-[#8B0000] text-white rounded hover:bg-[#6B0000] disabled:opacity-50"
          >
            {busy ? "Guardando..." : "Guardar cambios"}
          </button>

          {mensaje && <p className="text-sm text-gray-700 mt-2">{mensaje}</p>}
        </form>
      </div>
    </section>
  );
}
