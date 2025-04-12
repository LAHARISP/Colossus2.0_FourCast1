// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6eoN7bzlDbpDxQCKbSFLR-UvyUBe3m34",
  authDomain: "veloira-acfbf.firebaseapp.com",
  projectId: "veloira-acfbf",
  storageBucket: "veloira-acfbf.appspot.com",
  messagingSenderId: "489518444050",
  appId: "1:489518444050:web:a13eb81157b24c9ea172cb"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
