import React, { useRef, useState } from 'react'; 
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
  const carritoRef = useRef(); // Referencia para abrir el carrito
  const [triggerBounce, setTriggerBounce] = useState(false); // Estado para animación

  // Función para mostrar el carrito (la usás en Navbar)
  const handleCartClick = () => {
    if (carritoRef.current) {
      carritoRef.current.openCart();
    }
  };

  // Función que se ejecuta cada vez que se agrega algo al carrito
  const handleAddToCart = () => {
    setTriggerBounce(true); // Activa la animación
    setTimeout(() => setTriggerBounce(false), 500); // La reinicia después de 0.5s
  };

  return (
    <CartProvider>
      <BrowserRouter>
        {/* Le pasamos ambas props al navbar */}
        <Navbar onCartClick={handleCartClick} triggerBounce={triggerBounce} />

        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Nosotros />
              <Footer />
            </>
          } />
          <Route path="/productos" element={<Productos onAddToCart={handleAddToCart} />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ir-inicio" element={<ScrollToSection sectionId="inicio" />} />
          <Route path="/ir-nosotros" element={<ScrollToSection sectionId="nosotros" />} />
          <Route path="*" element={<h2 style={{ padding: "2rem" }}>Página no encontrada 😓</h2>} />
        </Routes>

        {/* Carrito controlado con ref */}
        <Carrito ref={carritoRef} />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
