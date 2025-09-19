// src/hooks/useProductos.js
import { useEffect, useMemo, useState } from "react";
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, orderBy, serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const colRef = useMemo(() => collection(db, "productos"), []);

  useEffect(() => {
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProductos(list);
    });
    return () => unsub();
  }, [colRef]);

  const createProducto = async (data) => {
    const payload = normalizeProducto(data, true);
    await addDoc(colRef, payload);
  };

  const updateProductoById = async (id, data) => {
    const ref = doc(db, "productos", id);
    const payload = normalizeProducto(data, false);
    await updateDoc(ref, payload);
  };

  const deleteProductoById = async (id) => {
    const ref = doc(db, "productos", id);
    await deleteDoc(ref);
  };

  return { productos, createProducto, updateProductoById, deleteProductoById };
}

// Normaliza tipos y timestamps
function normalizeProducto(data, isCreate) {
  const n = Number(data.precio ?? 0);
  const s = Number.isFinite(Number(data.stock)) ? Number(data.stock) : 0;

  const base = {
    nombre: (data.nombre ?? "").trim(),
    descripcion: (data.descripcion ?? "").trim(),
    categoria: (data.categoria ?? "").trim(),
    imagenUrl: (data.imagenUrl ?? "").trim(),
    precio: Number.isFinite(n) ? n : 0,
    stock: s,
    updatedAt: serverTimestamp(),
  };
  if (isCreate) base.createdAt = serverTimestamp();
  return base;
}
