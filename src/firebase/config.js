// =====================
// CONFIGURACIÓN: Firebase
// =====================
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import  tailwindcss from "tailwindcss/vite"

// Configuración con variables de entorno
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

//export const auth = getAuth(app);
//export const googleProvider = new GoogleAuthProvider();
//export const db = getFirestore(app);
export const auth = null;
export const googleProvider = null;
export const db = null;
export default defineConfig (
  {
    plugins: [react(), tailwindcss()],
  }
)

