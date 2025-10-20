// src/components/UserBadge.jsx
import { useAuth } from "../context/AuthContext";

export default function UserBadge() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14 }}>
      <span>Hola, {user.displayName || user.email}</span>
      <button onClick={logout} style={{ padding: "4px 8px", border: "1px solid #ddd", borderRadius: 6 }}>
        Salir
      </button>
    </div>
  );
}