// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    const existe = cart.find((item) => item.id === producto.id);
    if (existe) {
      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...producto, cantidad: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // 🔹 Total en dinero
  const total = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Number(item.precio || 0) * (item.cantidad ?? 1),
        0
      ),
    [cart]
  );

  // 🔹 Total de unidades (no solo productos distintos)
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + (item.cantidad ?? 1), 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
