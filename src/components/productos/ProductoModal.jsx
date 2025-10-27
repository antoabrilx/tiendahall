// src/components/productos/ProductoModal.jsx
import React from "react";
import "./ProductoModal.css";

export default function ProductoModal({ producto, onClose, onAddToCart }) {
if (!producto) return null;

return (
    <div className="modal-overlay" onClick={onClose}>
    <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // ❗ evita cerrar al hacer clic dentro
    >
        <button
        type="button"
        className="modal-close"
        onClick={(e) => {
            e.stopPropagation(); // ❗ evita que el clic se propague al overlay
            onClose();
        }}
        >
        ✕
        </button>

        <div className="modal-body">
        {producto.imagenUrl ? (
            <img
            src={producto.imagenUrl}
            alt={producto.nombre}
            className="modal-img"
            />
        ) : (
            <div className="no-img">Sin imagen</div>
        )}

        <div className="modal-info">
            <h2>{producto.nombre}</h2>

            <div className="modal-details">

                <strong>Descripcion:</strong>
            <p className="modal-desc">{producto.descripcion}</p>

            {producto.color && (
                <p>
                <strong>Color:</strong> {producto.color}
                </p>
            )}
            {producto.region && (
                <p>
                <strong>Región:</strong> {producto.region}
                </p>
            )}
            {producto.anio && (
                <p>
                <strong>Año:</strong> {producto.anio}</p>
            )}
            </div>
            <div className="modal-meta">
            <p>
                <strong>Precio:</strong> ${Number(producto.precio ?? 0).toFixed(2)}
            </p>
            <p>
                <strong>Stock:</strong> {producto.stock ?? 0}
            </p>
            </div>

            {onAddToCart && (
            <button
                className="btn-add"
                onClick={() => {
                onAddToCart(producto);
                onClose();
                }}
            >
                Agregar al carrito
            </button>
            )}
        </div>
        </div>
    </div>
    </div>
);
}
