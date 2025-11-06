import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const ref = doc(db, "usuarios", currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) setUserData(snap.data());
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Registrar usuario
  const register = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    await setDoc(doc(db, "usuarios", cred.user.uid), {
      uid: cred.user.uid,
      nombre: displayName,
      email,
      role: "user",
      creado: new Date(),
    });
  };

  // Login / Logout
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  // 🔹 Actualizar nombre
  const updateDisplayName = async (newName) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName: newName });
    const ref = doc(db, "usuarios", auth.currentUser.uid);
    await updateDoc(ref, { nombre: newName });
    setUser({ ...auth.currentUser });
    setUserData((prev) => ({ ...prev, nombre: newName }));
  };

  // 🔹 Actualizar email
  const updateUserEmail = async (newEmail) => {
    if (!auth.currentUser) throw new Error("No hay usuario autenticado");
    await updateEmail(auth.currentUser, newEmail);
    const ref = doc(db, "usuarios", auth.currentUser.uid);
    await updateDoc(ref, { email: newEmail });
    setUser({ ...auth.currentUser });
    setUserData((prev) => ({ ...prev, email: newEmail }));
  };

  // 🔹 Actualizar contraseña
  const updateUserPassword = async (newPassword) => {
    if (!auth.currentUser) throw new Error("No hay usuario autenticado");
    await updatePassword(auth.currentUser, newPassword);
  };

  const value = {
    user,
    userData,
    register,
    login,
    logout,
    updateDisplayName,
    updateUserEmail,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
