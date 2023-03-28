// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKOFcJIiuX0lfTme-PO5YNjr49BYmzQ48",
  authDomain: "alquran-app-5d213.firebaseapp.com",
  projectId: "alquran-app-5d213",
  storageBucket: "alquran-app-5d213.appspot.com",
  messagingSenderId: "846439403536",
  appId: "1:846439403536:web:bc95f5247b85e6568e3a95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);