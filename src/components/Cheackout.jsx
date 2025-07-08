// =====================
// COMPONENTE: Checkout.jsx (Simulación de pago)
// =====================
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
const { cart, total, clearCart } = useCart();
const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: ''
});

const handleChange = (e) => {
    setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
    }

    // Simular envío de orden
    const orderId = Math.floor(Math.random() * 1000000);
    alert(`¡Gracias por tu compra ${formData.nombre}! Tu número de orden es #${orderId}.`);

    // Vaciar carrito
    clearCart();

    // Limpiar formulario
    setFormData({
    nombre: '',
    direccion: '',
    telefono: '',
    email: ''
    });
};

return (
    <section className="py-16 px-6 bg-[#f4f4f4]">
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Finalizar Compra</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            value={formData.nombre}
            required
        />
        <input
            type="text"
            name="direccion"
            placeholder="Dirección de envío"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            value={formData.direccion}
            required
        />
        <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            value={formData.telefono}
            required
        />
        <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            value={formData.email}
            required
        />
        <div className="text-right font-bold text-lg">
            Total a pagar: <span className="text-[#8B0000]">${total.toFixed(2)}</span>
        </div>
        <button type="submit" className="btn-primary w-full py-2 rounded">
            Confirmar compra
        </button>
        </form>
    </div>
    </section>
);
};

export default Checkout;
