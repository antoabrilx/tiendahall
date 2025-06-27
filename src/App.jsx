// =====================
// COMPONENTE PRINCIPAL: App.jsx
// =====================
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Productos from './components/Productos';
import Nosotros from './components/Nosotros';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import Login from './components/Login';
import { CartProvider } from './context/CartContext';
import './styles/globals.css';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <Productos />
      <Nosotros />
      <Contacto />
      <Footer />
      <Carrito />
      <Login />
    </CartProvider>
  );
}

export default App;
