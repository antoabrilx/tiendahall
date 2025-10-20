// firebase.js

// Importamos lo necesario de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Tu configuración copiada desde Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDf8KLB9fOBrqrN2lHW4SxwpzsiLO1S7ro",
    authDomain: "tienda-haal.firebaseapp.com",
    projectId: "tienda-haal",
    storageBucket: "tienda-haal.firebasestorage.app",
    messagingSenderId: "945028295910",
    appId: "1:945028295910:web:77b793d9ed8ec05761df27",
    measurementId: "G-LC4RTHBXMD"
};

// Inicializamos la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos la base de datos Firestore
const db = getFirestore(app);
const auth = getAuth(app);

// Exportamos la base de datos para usarla en otras partes
export { db, auth };
