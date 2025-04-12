import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZXlKjFY2ThBApawyAQMIAAboTVDqZTWM",
  authDomain: "cis371-fdbd9.firebaseapp.com",
  projectId: "cis371-fdbd9",
  storageBucket: "cis371-fdbd9.firebasestorage.app",
  messagingSenderId: "1060827282790",
  appId: "1:1060827282790:web:5b9c3543fa60414825dca7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };