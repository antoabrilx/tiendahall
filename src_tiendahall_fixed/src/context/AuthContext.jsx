import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u ?? null);
      setInitializing(false);
      if (u) {
        // Asegurar que exista su doc en "usuarios/{uid}" (si lo creaste en consola)
        await ensureUserDoc(u);
      }
    });
    return () => unsub();
  }, []);

  const ensureUserDoc = async (u) => {
    try {
      const ref = doc(db, "usuarios", u.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, {
          email: u.email || "",
          displayName: u.displayName || "",
          role: "user",                   // por defecto NO admin
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (e) {
      console.error("[AuthContext] ensureUserDoc error:", e);
    }
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const register = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(cred.user, { displayName });
    // crear doc de usuario con rol "user"
    const ref = doc(db, "usuarios", cred.user.uid);
    await setDoc(ref, {
      email,
      displayName: displayName || "",
      role: "user",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return cred;
  };

  const updateDisplayName = async (displayName) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName });
    setUser({ ...auth.currentUser });
    // reflejar en usuarios/{uid}
    const ref = doc(db, "usuarios", auth.currentUser.uid);
    await setDoc(ref, { displayName, updatedAt: serverTimestamp() }, { merge: true });
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, initializing, login, register, logout, updateDisplayName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}