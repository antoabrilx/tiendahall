// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const toggleMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        if (password !== confirm) {
          setError("Las contraseñas no coinciden");
          return;
        }
        await register(email, password, displayName);
      }
      navigate("/admin/productos", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block mb-1">Nombre a mostrar</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
                placeholder="Ej: Emiliano"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
              placeholder="tuemail@dominio.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
              placeholder="********"
              required
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block mb-1">Confirmar contraseña</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
                placeholder="********"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-2 rounded bg-[#8B0000] text-white hover:bg-[#6B0000] transition"
          >
            {mode === "login" ? "Ingresar" : "Registrarme"}
          </button>
        </form>

        <div className="text-center mt-4">
          {mode === "login" ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
          <button onClick={toggleMode} className="text-[#8B0000] hover:underline">
            {mode === "login" ? "Registrate aquí" : "Iniciá sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}
