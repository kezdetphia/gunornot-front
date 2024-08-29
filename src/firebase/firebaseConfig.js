// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpqbPQv4uNLLLyi6Z2qjCsCrl1ox2j3MY",
  authDomain: "gunornot.firebaseapp.com",
  projectId: "gunornot",
  storageBucket: "gunornot.appspot.com",
  messagingSenderId: "598277507791",
  appId: "1:598277507791:web:f10d100d632f14590645ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
