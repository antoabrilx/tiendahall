import React, { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="block mb-1">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
              />
            </div>
          )}

          {isLogin ? (
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Recordarme</span>
              </label>
              <a href="#" className="text-[#8B0000] hover:underline text-sm">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          ) : (
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Acepto los términos y condiciones</span>
            </label>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-2 rounded bg-[#8B0000] text-white hover:bg-[#6B0000] transition"
          >
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
            <button
              onClick={toggleForm}
              className="text-[#8B0000] hover:underline"
            >
              {isLogin ? "Regístrate" : "Iniciar Sesión"}
            </button>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            * Este es un formulario de demostración
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
