import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgz1bchiWqrPTUTlhOaNyTV_uP7qAyUFE",
  authDomain: "novoapp-padrao-ebc.firebaseapp.com",
  projectId: "novoapp-padrao-ebc",
  storageBucket: "novoapp-padrao-ebc.firebasestorage.app",
  messagingSenderId: "294979729476",
  appId: "1:294979729476:web:e88c0052db448deee76411",
  measurementId: "G-HY0MH5Q9K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

