// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArmFWLVpe1OoB3uhTDLpGwxrAdYGX36-Y",
  authDomain: "foody-web-app-4941e.firebaseapp.com",
  projectId: "foody-web-app-4941e",
  storageBucket: "foody-web-app-4941e.appspot.com",
  messagingSenderId: "751759393843",
  appId: "1:751759393843:web:1962a61a2649465f330f46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fileStorage = getStorage(app);
