import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

    const Navbar = ({ onCartClick }) => {
    const { cart } = useCart();
    const cartIconRef = useRef(null);
    const [triggerBounce, setTriggerBounce] = useState(false);

useEffect(() => {
    if (triggerBounce && cartIconRef.current) {
    cartIconRef.current.classList.add("cart-bounce");
    setTimeout(() => {
        cartIconRef.current.classList.remove("cart-bounce");
    }, 500);
      setTriggerBounce(false); // reinicia el rebote
    }
}, [triggerBounce]);

useEffect(() => {
    // Se activa cada vez que cambia el carrito
    if (cart.length > 0) {
    setTriggerBounce(true);
    }
}, [cart]);

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
        <Link to="/ir-inicio" className="py-2 hover:text-[#D4AF37] transition-colors">Inicio</Link>
        <Link to="/ir-nosotros" className="py-2 hover:text-[#D4AF37] transition-colors">Nosotros</Link>
        <Link to="/productos" className="py-2 hover:text-[#D4AF37] transition-colors">Nuestros Vinos</Link>
        <Link to="/contacto" className="py-2 hover:text-[#D4AF37] transition-colors">Contacto</Link>
        </div>

        {/* Usuario y carrito */}
        <div className="flex items-center space-x-4">
        <Link to="/login" className="hover:text-[#D4AF37]">
            <i className="fas fa-user"></i>
        </Link>

        <div className="relative">
            <button onClick={onCartClick} className="hover:text-[#D4AF37] relative" ref={cartIconRef}>
            <i className="fas fa-shopping-cart"></i>
            {cart.length > 0 && (
                <span className="cart-count absolute -top-2 -right-2 bg-[#D4AF37] text-[#2C1A1D] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cart.length}
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
