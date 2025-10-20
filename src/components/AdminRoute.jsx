// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useUserDoc from "../hooks/useUserDoc";

export default function AdminRoute({ children }) {
  const { user, initializing } = useAuth();
  const { userDoc, loadingUserDoc } = useUserDoc();

  // Mientras carga el auth o el doc del usuario, podés mostrar null o un spinner
  if (initializing || loadingUserDoc) return null;

  if (!user) return <Navigate to="/login" replace />;

  // Solo pasa si el rol es admin
  if (userDoc?.role !== "admin") return <Navigate to="/" replace />;

  return children;
}