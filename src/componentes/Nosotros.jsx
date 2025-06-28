// =====================
// COMPONENTE: Nosotros.jsx
// =====================
import React from 'react';

const Nosotros = () => {
return (
    <section id="nosotros" className="py-16 px-6 bg-[#2C1A1D] text-white">
    <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">Nuestra Historia</h2>
        <p className="mb-6">Desde 1985, Haal representa una pasión familiar por los vinos de excelencia. Trabajamos con pequeños productores y bodegas reconocidas para ofrecer experiencias únicas en cada copa.</p>
        <div className="grid grid-cols-3 gap-4 mt-8">
        <div>
            <p className="text-3xl font-bold text-[#D4AF37]">35+</p>
            <p className="text-sm">Años de experiencia</p>
        </div>
        <div>
            <p className="text-3xl font-bold text-[#D4AF37]">200+</p>
            <p className="text-sm">Variedades de vino</p>
        </div>
        <div>
            <p className="text-3xl font-bold text-[#D4AF37]">12</p>
            <p className="text-sm">Países representados</p>
        </div>
        </div>
    </div>
    </section>
);
};

export default Nosotros;
