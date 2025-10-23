// src/App.jsx
import React, { useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import Carrito from "./components/Carrito";
import Login from "./components/Login";
import Productos from "./components/productos/Productos";
import ScrollToSection from "./components/ScrollToSection";
import { CartProvider, useCart } from "./context/CartContext";
import PageFade from "./styles/PageFade";
import "./styles/index.css";
import AdminProductos from "./pages/AdminProductos";
import PrivateRoute from "./components/PrivateRoute";
import Perfil from "./pages/Perfil";
import AdminRoute from "./components/AdminRoute";

// 🔹 Muevo AnimatedRoutes fuera del App principal
function AnimatedRoutes({ onAddToCart }) {
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
              <Productos onAddToCart={onAddToCart} />
            </PageFade>
          }
        />
        <Route path="/contacto" element={<PageFade><Contacto /></PageFade>} />
        <Route path="/login" element={<PageFade><Login /></PageFade>} />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <PageFade><Perfil /></PageFade>
            </PrivateRoute>
          }
        />
        <Route path="/ir-inicio" element={<PageFade><ScrollToSection sectionId="inicio" /></PageFade>} />
        <Route path="/ir-nosotros" element={<PageFade><ScrollToSection sectionId="nosotros" /></PageFade>} />
        <Route
          path="/admin/productos"
          element={
            <AdminRoute>
              <PageFade><AdminProductos /></PageFade>
            </AdminRoute>
          }
        />
        <Route path="*" element={<PageFade><h2 style={{ padding: "2rem" }}>Página no encontrada 😓</h2></PageFade>} />
      </Routes>
    </AnimatePresence>
  );
}

// 🔹 NUEVO componente interno que sí puede usar useCart()
function AppWithCart() {
  const carritoRef = useRef();
  const [triggerBounce, setTriggerBounce] = useState(false);
  const { addToCart } = useCart();

  const handleCartClick = () => {
    if (carritoRef.current) carritoRef.current.openCart();
  };

  const handleAddToCart = (producto) => {
    addToCart(producto);
    setTriggerBounce(true);
    setTimeout(() => setTriggerBounce(false), 500);
  };

  return (
    <>
      <Navbar onCartClick={handleCartClick} triggerBounce={triggerBounce} />
      <AnimatedRoutes onAddToCart={handleAddToCart} />
      <Carrito ref={carritoRef} />
    </>
  );
}

// 🔹 App principal
export default function App() {
  return (
    <CartProvider>
      <MotionConfig transition={{ type: "spring", damping: 25, stiffness: 250 }}>
        <BrowserRouter>
          <AppWithCart />
        </BrowserRouter>
      </MotionConfig>
    </CartProvider>
  );
}
