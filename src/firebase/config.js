// Import the functions you need from the SDKs you need
import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyAuiCnSrfN0bAnhofElf6mcMxXGvQqtjPc",
  authDomain: "estructuras2-e14f3.firebaseapp.com",
  projectId: "estructuras2-e14f3",
  storageBucket: "estructuras2-e14f3.firebasestorage.app",
  messagingSenderId: "29905489007",
  appId: "1:29905489007:web:2cb3e722ebcaad0b4d919a",
  measurementId: "G-00SNPMEZN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // 👈 añadir
const database = getDatabase(app);

const auth = getAuth()

export {app, auth, db, database}