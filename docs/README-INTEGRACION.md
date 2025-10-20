
# Integración y requisitos cumplidos

Este paquete contiene **solo `/src`**. Copialo sobre tu proyecto React (Vite o CRA).

## Requisitos solicitados
- **Base de Datos:** Firestore (`productos`, `usuarios`).
- **Inicio:** `Hero`, `Nosotros`, `Contacto`, `Footer` (home armada).
- **Login/Registro:** `components/Login.jsx` (usa Firebase Auth).
- **Carrito:** `context/CartContext.jsx` + `components/Carrito.jsx`.
- **Interfaz Cliente (Frontend):** rutas públicas (`/`, `/productos`, `/contacto`).
- **Interfaz Admin (Backend):** `/admin/productos` con `AdminRoute` (solo `role: "admin"`).
- **CRUD Productos:** en `pages/AdminProductos.jsx` usando `hooks/useProductos.jsx`.
- **Manual de Usuario:** ver `docs/Manual_de_Usuario_TiendaHaal.docx` (incluido si se pudo generar).

## Variables de entorno (Vite)
Crea `.env` con:
```
VITE_API_KEY=tuApiKey
VITE_AUTH_DOMAIN=...
VITE_PROJECT_ID=...
VITE_STORAGE_BUCKET=...
VITE_MESSAGING_SENDER_ID=...
VITE_APP_ID=...
VITE_MEASUREMENT_ID=...
```
Ajusta `src/firebase.js` para leer de `import.meta.env` si preferís.

## Regla rápida para admins
En Firestore, colección `usuarios/{uid}` → setear `role: "admin"`. Luego `/admin/productos` quedará accesible.

## Comandos típicos
```bash
npm i
npm run dev
npm run build
```
