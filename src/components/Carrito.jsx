// src/components/Carrito.jsx
import React, { useState, useImperativeHandle, forwardRef } from "react";
import { useCart } from "../context/CartContext";

const Carrito = forwardRef((props, ref) => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [visible, setVisible] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  useImperativeHandle(ref, () => ({
    openCart: () => setVisible(true),
  }));

  const handleCheckout = () => {
    clearCart();
    setVisible(false);
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 4000);
  };

  return (
    <>
      {/* Carrito */}
      {visible && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
            <button
              className="absolute top-2 right-4 text-2xl leading-none"
              onClick={() => setVisible(false)}
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

      {/* Pantalla de gracias */}
      {showThanks && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center animate-fadeIn">
            {/* Icono de carrito */}
            <img
              src="/imagenes/carrito.jpg" // reemplazá con tu icono de carrito o subilo a public/
              alt="Carrito"
              className="mx-auto w-24 h-24 mb-4"
            />
            <h2 className="text-3xl font-bold text-[#8B0000] mb-2">¡Gracias por su compra!</h2>
            <p className="text-gray-700 mb-4">
              Su pedido ha sido registrado correctamente.
            </p>
            <p className="font-semibold text-[#8B0000]">Tienda Haal</p>
          </div>
        </div>
      )}
    </>
  );
});

export default Carrito;
