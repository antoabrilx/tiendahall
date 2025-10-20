// src/hooks/useUserDoc.js
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function useUserDoc() {
  const { user } = useAuth();
  const [userDoc, setUserDoc] = useState(null);
  const [loadingUserDoc, setLoadingUserDoc] = useState(true);

  useEffect(() => {
    if (!user) {
      setUserDoc(null);
      setLoadingUserDoc(false);
      return;
    }
    const ref = doc(db, "usuarios", user.uid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setUserDoc(snap.exists() ? { id: snap.id, ...snap.data() } : null);
        setLoadingUserDoc(false);
      },
      (err) => {
        console.error("[useUserDoc] error:", err);
        setUserDoc(null);
        setLoadingUserDoc(false);
      }
    );
    return () => unsub();
  }, [user]);

  return { userDoc, loadingUserDoc };
}