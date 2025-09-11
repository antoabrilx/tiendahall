// src/components/UserBadge.jsx
import { useAuth } from "../context/AuthContext";

export default function UserBadge() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span>Hola, {user.displayName || user.email}</span>
      <button onClick={logout}>Salir</button>
    </div>
  );
}