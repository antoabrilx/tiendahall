// src/App.jsx
import React, { useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig, AnimatePresence } from "framer-motion";

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Nosotros from './components/Nosotros';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Carrito from './components/Carrito';
import Login from './components/Login';
import Productos from './components/productos/Productos';
import ScrollToSection from './components/ScrollToSection';
import { CartProvider } from './context/CartContext';
import PageFade from './styles/PageFade';
import './styles/index.css';
import AdminProductos from './pages/AdminProductos';

function AnimatedRoutes({ handleAddToCart }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageFade>
              <Hero />
              <Nosotros />
              <Footer />
            </PageFade>
          }
        />
        <Route
          path="/productos"
          element={
            <PageFade>
              <Productos onAddToCart={handleAddToCart} />
            </PageFade>
          }
        />
        <Route
          path="/contacto"
          element={
            <PageFade>
              <Contacto />
            </PageFade>
          }
        />
        <Route
          path="/login"
          element={
            <PageFade>
              <Login />
            </PageFade>
          }
        />
        <Route
          path="/ir-inicio"
          element={
            <PageFade>
              <ScrollToSection sectionId="inicio" />
            </PageFade>
          }
        />
        <Route
          path="/ir-nosotros"
          element={
            <PageFade>
              <ScrollToSection sectionId="nosotros" />
            </PageFade>
          }
        />
        <Route
          path="*"
          element={
            <PageFade>
              <h2 style={{ padding: "2rem" }}>Página no encontrada 😓</h2>
            </PageFade>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <PageFade>
              <AdminProductos />
            </PageFade>
  }
/>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const carritoRef = useRef();
  const [triggerBounce, setTriggerBounce] = useState(false);

  const handleCartClick = () => {
    if (carritoRef.current) carritoRef.current.openCart();
  };

  const handleAddToCart = () => {
    setTriggerBounce(true);
    setTimeout(() => setTriggerBounce(false), 500);
  };

  return (
    <CartProvider>
      <MotionConfig transition={{ type: "spring", damping: 25, stiffness: 250 }}>
        <BrowserRouter>
          <Navbar onCartClick={handleCartClick} triggerBounce={triggerBounce} />
          <AnimatedRoutes handleAddToCart={handleAddToCart} />
          <Carrito ref={carritoRef} />
        </BrowserRouter>
      </MotionConfig>
    </CartProvider>
  );
}
