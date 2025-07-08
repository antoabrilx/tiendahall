// =====================
// COMPONENTE: Productos.jsx
// =====================
import React from 'react';
import { useCart } from '../context/CartContext';
import "../styles/Productos.css";

const productos = [
{
    id: 1,
    nombre: 'Malbec Reserva 2018',
    descripcion: 'Un vino elegante con notas de frutos rojos maduros, especias y un sutil toque de vainilla.',
    precio: 45.00,
    color: '#8B0000'
},
{
    id: 3,
    nombre: 'Cabernet Sauvignon Gran Reserva',
    descripcion: 'Intenso aroma a frutos negros, pimienta y chocolate.',
    precio: 52.75,
    color: '#722F37'
},
{
    id: 4,
    nombre: 'Rosé de Malbec',
    descripcion: 'Fresco y frutal con notas de fresa y cereza.',
    precio: 32.25,
    color: '#FFC0CB'
}
];

const Productos = () => {
const { addToCart } = useCart();

return (
    <section id="vinos" className="py-16 px-6">
    <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Nuestros Vinos</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Cada botella cuenta una historia única.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productos.map((vino) => (
            <div key={vino.id} className="wine-card bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="h-64 flex items-center justify-center" style={{ backgroundColor: vino.color }}>
                <span className="text-white font-bold text-xl">{vino.nombre}</span>
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{vino.nombre}</h3>
                <p className="text-gray-600 mb-4">{vino.descripcion}</p>
                <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-[#8B0000]">${vino.precio.toFixed(2)}</span>
                <button
                    onClick={() => addToCart(vino)}
                    className="btn-primary px-4 py-2 rounded"
                >
                    Añadir al carrito
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
