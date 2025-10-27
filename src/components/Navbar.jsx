// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useUserDoc from "../hooks/useUserDoc";
import "../styles/Navbar.css";
import { scroller } from "react-scroll";

const Navbar = ({ onCartClick, triggerBounce: externalBounce }) => {
  // 🔹 Traemos cartCount además de cart
  const { cart, cartCount } = useCart();
  const { user, logout } = useAuth();
  const { userDoc } = useUserDoc();
  const navigate = useNavigate();
  const location = useLocation();

  const cartIconRef = useRef(null);
  const [triggerBounce, setTriggerBounce] = useState(false);

  // Dropdown perfil
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpenMenu(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Rebote por evento externo (agregar al carrito)
  useEffect(() => {
    if (externalBounce) setTriggerBounce(true);
  }, [externalBounce]);

  useEffect(() => {
    if (triggerBounce && cartIconRef.current) {
      cartIconRef.current.classList.add("cart-bounce");
      const t = setTimeout(() => {
        cartIconRef.current?.classList.remove("cart-bounce");
      }, 500);
      setTriggerBounce(false);
      return () => clearTimeout(t);
    }
  }, [triggerBounce]);

  // Rebote cuando cambia el carrito
  useEffect(() => {
    if (cart.length > 0) setTriggerBounce(true);
  }, [cart]);

  const avatar = (user?.displayName || user?.email || "?").charAt(0).toUpperCase();

  const goPerfil = () => {
    setOpenMenu(false);
    navigate("/perfil");
  };

  const goAdminProductos = () => {
    setOpenMenu(false);
    navigate("/admin/productos");
  };

  const goAdminUsuarios = () => {
    setOpenMenu(false);
    navigate("/admin/usuarios");
  };

  const doLogout = async () => {
    setOpenMenu(false);
    await logout();
    navigate("/", { replace: true });
  };

  // 🔹 Ir a la sección “Nosotros”
  const goNosotros = () => {
    if (location.pathname === "/") {
      scroller.scrollTo("nosotros", {
        duration: 300,
        offset: -80,
      });
    } else {
      localStorage.setItem("scrollToNosotros", "true");
      navigate("/");
    }
  };

  // 🔹 Scroll automático si venís de otra sección
  useEffect(() => {
    if (location.pathname === "/" && localStorage.getItem("scrollToNosotros") === "true") {
      setTimeout(() => {
        scroller.scrollTo("nosotros", {
          smooth: true,
          duration: 600,
          offset: -80,
        });
        localStorage.removeItem("scrollToNosotros");
      }, 500);
    }
  }, [location.pathname]);

  return (
    <nav className="bg-[#2C1A1D] text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-default">
          <span className="font-['Playfair_Display'] text-3xl font-bold text-[#D4AF37]">Haal</span>
          <span className="ml-2 text-sm italic">Vinos Selectos</span>
        </div>

        {/* Navegación */}
        <div className="hidden md:flex flex-col md:flex-row w-full md:w-auto md:space-x-8 mt-4 md:mt-0">
          <Link to="/ir-inicio" className="py-2 hover:text-[#D4AF37] transition-colors">
            Inicio
          </Link>

          <button
            onClick={goNosotros}
            className="py-2 hover:text-[#D4AF37] transition-colors cursor-pointer bg-transparent border-none"
          >
            Nosotros
          </button>

          <Link to="/productos" className="py-2 hover:text-[#D4AF37] transition-colors">
            Nuestros Vinos
          </Link>
          <Link to="/contacto" className="py-2 hover:text-[#D4AF37] transition-colors">
            Contacto
          </Link>
        </div>

        {/* Usuario y carrito */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <Link to="/login" className="hover:text-[#D4AF37]">
              Iniciar sesión
            </Link>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu((v) => !v)}
                className="flex items-center gap-2 hover:text-[#D4AF37]"
              >
                <div
                  className="w-8 h-8 rounded-full grid place-items-center text-white text-sm"
                  style={{ background: "#8B0000" }}
                >
                  {avatar}
                </div>
                <span className="hidden sm:block">{user.displayName || user.email}</span>
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-[#2C1A1D] rounded shadow-md overflow-hidden">
                  <button
                    onClick={goPerfil}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Mi perfil
                  </button>

                  {userDoc?.role === "admin" && (
                    <>
                      <button
                        onClick={goAdminProductos}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Administrar productos
                      </button>
                      <button
                        onClick={goAdminUsuarios}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Administrar usuarios
                      </button>
                    </>
                  )}

                  <button
                    onClick={doLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 🔹 Carrito (corregido para mostrar cantidad total) */}
          <div className="relative">
            <button
              onClick={onCartClick}
              className="hover:text-[#D4AF37] relative"
              ref={cartIconRef}
            >
              <i className="fas fa-shopping-cart" />
              {cartCount > 0 && (
                <span className="cart-count absolute -top-2 -right-2 bg-[#D4AF37] text-[#2C1A1D] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
