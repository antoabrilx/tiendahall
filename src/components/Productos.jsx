// Productos.jsx
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "../styles/Productos.css";

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Productos = () => {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosCollection = collection(db, "productos"); 
        const snapshot = await getDocs(productosCollection);

        const listaProductos = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            nombre: data.nombre || "Producto sin nombre",
            descripcion: data.descripcion || "Sin descripción disponible",
            precio:
              typeof data.precio === "number" && !isNaN(data.precio)
                ? data.precio
                : 0,
            color: data.color || "#8B0000", // fallback a rojo vino
          };
        });

        setProductos(listaProductos);
      } catch (err) {
        console.error("Error cargando productos desde Firestore:", err);
        setError("Hubo un problema cargando los productos.");
        alert(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  if (loading) {
    return (
      <section id="vinos" className="py-16 px-6 text-center">
        <p className="text-lg text-gray-600">Cargando productos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="vinos" className="py-16 px-6 text-center">
        <p className="text-lg text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section id="vinos" className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Nuestros Productos</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Cada producto cuenta una historia única.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="wine-card bg-white rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              <div
                className="h-64 flex items-center justify-center"
                style={{ backgroundColor: producto.color }}
              >
                <span className="text-white font-bold text-xl text-center px-4">
                  {producto.nombre}
                </span>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{producto.nombre}</h3>
                  <p className="text-gray-600 mb-4">{producto.descripcion}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xl font-bold text-[#8B0000]">
                    ${producto.precio.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(producto)}
                    className="bg-[#8B0000] hover:bg-[#6B0000] text-white font-semibold text-sm px-6 py-2 rounded transition-all duration-300"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Productos;
