// src/pages/AdminUsuarios.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        const lista = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setUsuarios(lista);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const cambiarRol = async (id, nuevoRol) => {
    try {
      await updateDoc(doc(db, "usuarios", id), { role: nuevoRol });
      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: nuevoRol } : u))
      );
      alert("Rol actualizado correctamente ✅");
    } catch (error) {
      console.error("Error al cambiar rol:", error);
      alert("No se pudo cambiar el rol.");
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      await deleteDoc(doc(db, "usuarios", id));
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      alert("Usuario eliminado correctamente 🗑️");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("No se pudo eliminar el usuario.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#2C1A1D] mb-2">Administrar Usuarios</h1>
      <p className="text-gray-700 mb-6">Ver, cambiar rol o eliminar usuarios registrados.</p>

      <div className="overflow-x-auto shadow-lg rounded-lg"> {/* 🔹 sombra + bordes redondeados */}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#2C1A1D] text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Rol</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No hay usuarios registrados.
                </td>
              </tr>
            ) : (
              usuarios.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{user.id}</td>
                  <td className="py-3 px-4">{user.nombre || "Sin nombre"}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role || "usuario"}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() =>
                        cambiarRol(user.id, user.role === "admin" ? "usuario" : "admin")
                      }
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Cambiar rol
                    </button>
                    <button
                      onClick={() => eliminarUsuario(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
