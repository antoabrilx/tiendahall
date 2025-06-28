// =====================
// COMPONENTE: Contacto.jsx
// =====================
import React from 'react';

const Contacto = () => {
return (
    <section id="contacto" className="py-16 px-6">
    <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4">Contáctanos</h2>
        <p className="text-gray-600 mb-8">¿Tenés alguna duda? Estamos para ayudarte.</p>
        <form className="space-y-4">
        <input className="w-full px-4 py-2 border rounded" type="text" placeholder="Nombre" />
        <input className="w-full px-4 py-2 border rounded" type="email" placeholder="Email" />
        <textarea className="w-full px-4 py-2 border rounded" placeholder="Mensaje" rows="4"></textarea>
        <button className="btn-primary px-6 py-2 rounded" type="submit">Enviar</button>
        </form>
    </div>
    </section>
);
};

export default Contacto;
