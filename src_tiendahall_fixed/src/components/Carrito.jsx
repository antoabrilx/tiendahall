// src/components/Carrito.jsx
import React, { useState, useImperativeHandle, forwardRef } from "react";
import { useCart } from "../context/CartContext";

const Carrito = forwardRef((props, ref) => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [visible, setVisible] = useState(false);

  // Exponer método para abrir desde afuera (Navbar/App)
  useImperativeHandle(ref, () => ({
    openCart: () => setVisible(true),
  }));

  const handleCheckout = () => {
    alert("Simulación de pago exitosa. ¡Gracias por tu compra!");
    clearCart();
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
            <button
              className="absolute top-2 right-4 text-2xl leading-none"
              onClick={() => setVisible(false)}
              aria-label="Cerrar carrito"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>

            {cart.length === 0 ? (
              <p className="text-gray-600">Tu carrito está vacío.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <h4 className="font-medium">{item.nombre}</h4>
                      <p className="text-sm text-gray-500">
                        Cantidad: {item.cantidad}
                      </p>
                    </div>
                    <div className="text-right">
                      <p>${(Number(item.precio) * item.cantidad).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-2 font-bold flex justify-between">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full py-2 rounded mt-2 bg-[#8B0000] text-white hover:bg-[#6B0000] transition"
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default Carrito;