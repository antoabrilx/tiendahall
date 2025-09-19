// =====================
// COMPONENTE: Hero.jsx
// =====================
import React from 'react';
import "../styles/Hero.css"
import { Link } from 'react-router-dom';
import fondovinos2 from "../img/fondoinicio2.png";


const Hero = () => {
  return (
    <section
      id="inicio"
      className="hero-section text-white py-32 px-6 bg-cover bg-center"
      /*imagen de fondo
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../imagenes/vino.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}*/
    >
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Descubre el Arte del Vino</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Selección exclusiva de vinos para los paladares más exigentes</p>

        <div className='flex justify-center'>
          <Link to="/productos"
          className="btn-primary w-auto px-8 py-3 rounded-full text-lg font-medium">Explorar Vinos
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
