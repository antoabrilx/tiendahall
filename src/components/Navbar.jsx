import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
const { cart } = useCart();

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
            <Link to="/carrito" className="hover:text-[#D4AF37] relative">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count absolute -top-2 -right-2 bg-[#D4AF37] text-[#2C1A1D] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cart.length}
            </span>
            </Link>
        </div>
        </div>
    </div>
    </nav>
);
};

export default Navbar;
