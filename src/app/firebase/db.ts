import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "music-form-diagram.firebaseapp.com",
  projectId: "music-form-diagram",
  storageBucket: "music-form-diagram.firebasestorage.app",
  messagingSenderId: "1069443343557",
  appId: "1:1069443343557:web:9d1f6832892ea176047cac",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
