import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import "../styles/Productos.css";

const Productos = () => {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/productos') // URL de tu backend
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  return (
    <section id="vinos" className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Nuestros Vinos</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Cada botella cuenta una historia única.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((vino) => (
            <div
              key={vino.id}
              className="wine-card bg-white rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              <div
                className="h-64 flex items-center justify-center"
                style={{ backgroundColor: vino.color || '#8B0000' }} // fallback si no viene color
              >
                <span className="text-white font-bold text-xl text-center px-4">{vino.nombre}</span>
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{vino.nombre}</h3>
                  <p className="text-gray-600 mb-4">{vino.descripcion}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xl font-bold text-[#8B0000]">${vino.precio?.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(vino)}
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
