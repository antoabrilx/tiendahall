import React, { useState } from "react";
import "../styles/Login.css";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      if (isLogin) {
        // Iniciar sesión
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Leer el rol del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "usuarios", uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("Rol:", userData.role);

          // Pasamos los datos al componente padre
          if (onLogin) {
            onLogin({ uid, email: userData.email, role: userData.role });
          }
        } else {
          setError("No se encontró información del usuario en la base de datos.");
        }

      } else {
        // Registrar nuevo usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, "usuarios", uid), {
          nombre: name,
          email,
          role: "user" // por defecto usuario común
        });

        console.log("Usuario registrado:", userCredential.user);

        if (onLogin) {
          onLogin({ uid, email, role: "user" });
        }
      }
    } catch (err) {
      console.error("Error de autenticación:", err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block mb-1">Nombre Completo</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="block mb-1">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8B0000]"
              />
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
