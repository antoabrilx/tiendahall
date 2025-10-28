// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 🔹 Agregar producto al carrito
  const addToCart = (producto) => {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // 🔹 Aumentar cantidad manualmente desde el carrito
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // 🔹 Disminuir cantidad (si llega a 0, se elimina)
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // 🔹 Eliminar producto completamente
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔹 Vaciar carrito
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
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        cartCount,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
