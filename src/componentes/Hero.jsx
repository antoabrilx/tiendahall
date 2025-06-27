// =====================
// COMPONENTE: Hero.jsx
// =====================
import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="hero-section text-white py-32 px-6 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/vino-bg.jpg')" }}>
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Descubre el Arte del Vino</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Selección exclusiva de vinos para los paladares más exigentes</p>
        <a href="#vinos" className="btn-primary px-8 py-3 rounded-full text-lg font-medium inline-block">Explorar Vinos</a>
      </div>
    </section>
  );
};

export default Hero;
