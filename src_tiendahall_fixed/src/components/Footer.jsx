// src/components/Footer.jsx
import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="bg-[#2C1A1D] text-white py-10 px-6 text-center">
      <div className="mb-4">
        <h3 className="text-xl font-bold">Haal Vinos</h3>
        <p>Explorá el arte del vino con nuestra colección exclusiva.</p>
      </div>

      <div className="flex justify-center space-x-4 text-xl">
        <button onClick={() => alert("Red social no disponible aún")} aria-label="Facebook" className="hover:text-[#D4AF37]">
          <i className="fab fa-facebook-f" />
        </button>
        <button onClick={() => alert("Red social no disponible aún")} aria-label="Instagram" className="hover:text-[#D4AF37]">
          <i className="fab fa-instagram" />
        </button>
        <button onClick={() => alert("Red social no disponible aún")} aria-label="Twitter" className="hover:text-[#D4AF37]">
          <i className="fab fa-twitter" />
        </button>
      </div>

      <p className="text-sm mt-4 text-gray-400">
        &copy; {new Date().getFullYear()} Haal Vinos. Todos los derechos reservados.
      </p>
    </footer>
  );
}