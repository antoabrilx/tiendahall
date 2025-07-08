import React from 'react';
import "../styles/Nosotros.css";

const Nosotros = () => {
  return (
    <section id="nosotros" className="py-16 px-6 bg-[#2C1A1D] text-white">
    <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Nuestra Historia</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">Descubre la pasión que nos impulsa a seleccionar los mejores vinos para ti.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Parte visual */}
        <div>
            <div className="wood-bg p-6 rounded-lg shadow-lg">
            <div className="fondo-madera-interna p-8 rounded">
                <svg className="w-full h-auto" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F9F6F0"/>
                <path d="M50,250 C100,200 150,150 200,200 S300,250 350,200" stroke="#8B0000" strokeWidth="3" fill="none"/>
                <circle cx="100" cy="100" r="50" fill="#8B0000" fillOpacity="0.2"/>
                <circle cx="300" cy="150" r="40" fill="#D4AF37" fillOpacity="0.2"/>
                <path d="M150,50 Q200,20 250,50 T350,50" stroke="#2C1A1D" strokeWidth="2" fill="none"/>
                <text x="200" y="150" fontFamily="'Playfair Display', serif" fontSize="24" textAnchor="middle" fill="#2C1A1D">Viñedos Haal</text>
                </svg>
            </div>
            </div>
        </div>

          {/* Parte de texto */}
        <div>
            <h3 className="text-2xl font-bold mb-4 text-[#D4AF37]">Tradición y Excelencia</h3>
            <p className="mb-4">Fundada en 1985, Haal nació de la pasión de una familia por los vinos de calidad. Nuestro compromiso con la excelencia nos ha llevado a seleccionar cuidadosamente cada botella que ofrecemos.</p>
            <p className="mb-6">Trabajamos directamente con pequeños productores y bodegas reconocidas para garantizar que cada vino en nuestra colección represente lo mejor de su región y variedad.</p>

            {/* Estadísticas */}
            <div className="flex space-x-4">
            <div className="text-center">
                <span className="block text-3xl font-bold text-[#D4AF37]">35+</span>
                <span className="text-sm">Años de experiencia</span>
            </div>
            <div className="text-center">
                <span className="block text-3xl font-bold text-[#D4AF37]">200+</span>
                <span className="text-sm">Variedades de vino</span>
            </div>
            <div className="text-center">
                <span className="block text-3xl font-bold text-[#D4AF37]">12</span>
                <span className="text-sm">Países representados</span>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>
);
};

export default Nosotros;
