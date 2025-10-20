// src/hooks/useProductos.js
import { useEffect, useMemo, useState } from "react";
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, serverTimestamp, query
} from "firebase/firestore";
import { db } from "../firebase";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const colRef = useMemo(() => collection(db, "productos"), []);

  useEffect(() => {
    const q = query(colRef); // sin orderBy por compatibilidad con docs viejos
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => {
          const data = d.data();
          const { id: _ignore, ...rest } = data || {}; // nunca pisar doc.id
          return { id: d.id, ...rest };
        });
        setProductos(list);
      },
      (err) => {
        console.error("[useProductos] onSnapshot error:", err);
        alert(`Firestore error (read):\n${err.code || ""} ${err.message || err}`);
      }
    );
    return () => unsub();
  }, [colRef]);

  const createProducto = async (data) => {
    const payload = normalizeProducto(data, true);
    return addDoc(colRef, payload);
  };

  const updateProductoById = async (id, data) => {
    const safeId = ensureStringId(id, "updateProductoById");
    const ref = doc(db, "productos", safeId);
    const payload = normalizeProducto(data, false);
    return updateDoc(ref, payload);
  };

  const deleteProductoById = async (id) => {
    const safeId = ensureStringId(id, "deleteProductoById");
    const ref = doc(db, "productos", safeId);
    return deleteDoc(ref);
  };

  return { productos, createProducto, updateProductoById, deleteProductoById };
}

/* ---------- helpers ---------- */

function ensureStringId(id, where) {
  if (id == null) throw new Error(`[${where}] id es null/undefined`);
  if (typeof id !== "string") {
    if (typeof id === "number") return String(id);
    throw new Error(`[${where}] id debe ser string. Llega tipo: ${typeof id}`);
  }
  if (!id.trim()) throw new Error(`[${where}] id es string vacío`);
  return id;
}

function normalizeProducto(data, isCreate) {
  const precio = toNumber(data?.precio, 0);
  const stock  = toNumber(data?.stock, 0);
  const year   = data?.year !== "" && data?.year != null ? toNumber(data?.year, null) : null;

  const base = {
    nombre:      trimOrEmpty(data?.nombre),
    descripcion: trimOrEmpty(data?.descripcion),
    categoria:   trimOrEmpty(data?.categoria),
    color:       trimOrEmpty(data?.color),
    year,
    region:      trimOrEmpty(data?.region),
    imagenUrl:   trimOrEmpty(data?.imagenUrl),
    precio,
    stock,
    updatedAt: serverTimestamp(),
  };
  if (isCreate) base.createdAt = serverTimestamp();
  return base;
}

function trimOrEmpty(v) { return typeof v === "string" ? v.trim() : ""; }
function toNumber(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
