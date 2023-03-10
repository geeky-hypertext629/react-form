
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCjMBDy0qJIOzMiXQfskF5d2KaGnet1z8s",
  authDomain: "formdata-e05f8.firebaseapp.com",
  projectId: "formdata-e05f8",
  storageBucket: "formdata-e05f8.appspot.com",
  messagingSenderId: "503635149602",
  appId: "1:503635149602:web:53a89c184b4e654bbe5b7b",
  measurementId: "G-0P5R9TRG2B"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider  = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage= getStorage(app);