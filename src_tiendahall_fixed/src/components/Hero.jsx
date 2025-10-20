// src/components/Hero.jsx
import React from "react";
import "../styles/Hero.css";
import { Link } from "react-router-dom";
import fondoVinos from "../img/fondoinicio2.png";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="hero-section text-white py-32 px-6 bg-cover bg-center"
      style={{
        // overlay + imagen (evita el warning de import sin usar)
        backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url(${fondoVinos})`,
      }}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Descubre el Arte del Vino</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Selección exclusiva de vinos para los paladares más exigentes
        </p>

        <div className="flex justify-center">
          <Link
            to="/productos"
            className="btn-primary w-auto px-8 py-3 rounded-full text-lg font-medium"
          >
            Explorar Vinos
          </Link>
        </div>
      </div>
    </section>
  );
}