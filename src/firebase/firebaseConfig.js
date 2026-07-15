// src/firebase/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAzsrHTafUY0VbJASCjpj6jRtxZhgHHJqs",
  authDomain: "autosphere-bb54e.firebaseapp.com",
  projectId: "autosphere-bb54e",
  storageBucket: "autosphere-bb54e.firebasestorage.app",
  messagingSenderId: "97186005726",
  appId: "1:97186005726:web:7c97a1b0e3510111f2b84f",
  measurementId: "G-HJQHX89RYV"
};

// Initialize Firebase App
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Analytics (Web only)
let analytics = null;
if (Platform.OS === "web") {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log("Analytics disabled");
  }
}

// Initialize Firebase Authentication with appropriate persistence layer
let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch (error) {
    auth = getAuth(app);
  }
}

// Initialize Cloud Firestore
const db = getFirestore(app);

export { auth, db, analytics };