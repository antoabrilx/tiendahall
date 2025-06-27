// =====================
// COMPONENTE: Login.jsx
// =====================
import React from 'react';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Sesión iniciada con Google");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <div className="text-center mt-16">
      <h2 className="text-3xl font-bold mb-4">Iniciar sesión</h2>
      <button
        onClick={handleGoogleLogin}
        className="bg-[#8B0000] text-white px-6 py-2 rounded hover:bg-[#6B0000] transition"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;
