import { useEffect, useMemo, useState } from "react";
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, /* orderBy, */ serverTimestamp, query
} from "firebase/firestore";
import { db } from "../firebase";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const colRef = useMemo(() => collection(db, "productos"), []);

  useEffect(() => {
    // const q = query(colRef, orderBy("createdAt", "desc"));
    const q = query(colRef);
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProductos(list);
    }, (err) => {
      console.error("[useProductos] error:", err);
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

function normalizeProducto(data, isCreate) {
  const precio = Number(data.precio ?? 0);
  const stock = Number.isFinite(Number(data.stock)) ? Number(data.stock) : 0;
  const year = data.year ? Number(data.year) : null;

  const base = {
    nombre: (data.nombre ?? "").trim(),
    descripcion: (data.descripcion ?? "").trim(),
    categoria: (data.categoria ?? "").trim(),   // si la usás
    color: (data.color ?? "").trim(),           // tinto/blanco/rosado/espumoso
    year,                                       // ej 2019
    region: (data.region ?? "").trim(),         // ej Mendoza
    imagenUrl: (data.imagenUrl ?? "").trim(),   // URL de imagen
    precio: Number.isFinite(precio) ? precio : 0,
    stock,
    updatedAt: serverTimestamp(),
  };
  if (isCreate) base.createdAt = serverTimestamp();
  return base;
}
