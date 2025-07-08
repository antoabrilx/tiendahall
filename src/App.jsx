import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import Login from './components/Login';
import Productos from './components/Productos';
import ScrollToSection from './components/ScrollToSection';
import { CartProvider } from './context/CartContext';
import './styles/index.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Página principal con scroll interno */}
          <Route path="/" element={
            <>
              <Hero />
              <Nosotros />
              <Footer />
            </>
          } />

          {/* Páginas con rutas independientes */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ir-inicio" element={<ScrollToSection sectionId="inicio" />} />
          <Route path="/ir-nosotros" element={<ScrollToSection sectionId="nosotros" />} />
          {/* Página 404 */}
          <Route path="*" element={<h2 style={{ padding: "2rem" }}>Página no encontrada 😓</h2>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
