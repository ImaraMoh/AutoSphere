// src/firebase/authService.js

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import {
  auth,
  db
} from "./firebaseConfig";

/**
 * =====================================
 * REGISTER USER + SAVE PRIMARY VEHICLE
 * =====================================
 * Handles user sign-up via Firebase Authentication, provisions their 
 * Firestore profile document, and seeds their initial vehicle subcollection record.
 * 
 * @param {string} email - User email address
 * @param {string} password - User account password
 * @param {string} fullName - Full name of the user
 * @param {Object} primaryVehicle - Initial vehicle specifications object
 * @returns {Promise<Object>} - The authenticated user object
 */
export async function registerUserWithFirebase(
  email,
  password,
  fullName,
  primaryVehicle = {}
) {
  try {
    // Step 1: Create Firebase Auth credentials
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // Optional: Update Auth profile displayName if available
    if (fullName) {
      try {
        await updateProfile(user, { displayName: fullName });
      } catch (profileError) {
        console.log("Auth profile update warning:", profileError);
      }
    }

    // ================================
    // Step 2: Save User Profile Document
    // Path: users/{uid}
    // ================================
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      fullName: fullName || "",
      email: email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // ================================
    // Step 3: Save Primary Vehicle Record
    // Path: users/{uid}/vehicles/{vehicleId}
    // ================================
    const vehicleCollectionRef = collection(db, "users", user.uid, "vehicles");
    
    const vehiclePayload = {
      brand: primaryVehicle.make || primaryVehicle.brand || "Generic",
      model: primaryVehicle.model || "Vehicle",
      year: primaryVehicle.year || new Date().getFullYear().toString(),
      registration: primaryVehicle.plateNumber || primaryVehicle.registration || "UNKNOWN",
      type: primaryVehicle.type || "Car",
      fuel: primaryVehicle.fuel || "Petrol",
      mileage: primaryVehicle.mileage || "0",
      healthScore: primaryVehicle.healthScore ?? 92,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const newVehicleDocRef = await addDoc(vehicleCollectionRef, vehiclePayload);

    // Also cache an initial baseline health report for AI reports fallback usage
    try {
      const aiCacheDocRef = doc(db, "users", user.uid, "vehicles", newVehicleDocRef.id, "aiCache", "latestHealth");
      await setDoc(aiCacheDocRef, {
        score: vehiclePayload.healthScore,
        status: "Good",
        summary: "Initial baseline vehicle diagnostics look nominal.",
        timestamp: Date.now(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (cacheErr) {
      console.log("Initial AI Health Cache seeding warning:", cacheErr);
    }

    return user;
  } catch (error) {
    console.log("REGISTER FIREBASE ERROR:", error);
    throw error;
  }
}

/**
 * =====================================
 * LOGIN USER
 * =====================================
 * Authenticates an existing user via email and password credentials.
 * 
 * @param {string} email - User email address
 * @param {string} password - User password
 * @returns {Promise<Object>} - The authenticated user object
 */
export async function loginUserWithFirebase(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    throw error;
  }
}

/**
 * =====================================
 * LOGOUT USER
 * =====================================
 * Terminates the current active session in Firebase Authentication.
 * 
 * @returns {Promise<void>}
 */
export async function logoutUserFromFirebase() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("LOGOUT ERROR:", error);
    throw error;
  }
}

/**
 * =====================================
 * PASSWORD RESET
 * =====================================
 * Triggers a password reset email to the specified account address.
 * 
 * @param {string} email - Registered account email
 * @returns {Promise<boolean>} - Success confirmation status
 */
export async function resetPasswordWithFirebase(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.log("PASSWORD RESET ERROR:", error);
    throw error;
  }
}

/**
 * =====================================
 * FETCH USER PROFILE DATA
 * =====================================
 * Retrieves extended user profile data from Firestore.
 * 
 * @param {string} uid - User unique identifier
 * @returns {Promise<Object|null>} - User profile document data or null
 */
export async function getUserProfile(uid) {
  try {
    if (!uid) return null;
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      return userDocSnap.data();
    }
    return null;
  } catch (error) {
    console.log("GET USER PROFILE ERROR:", error);
    return null;
  }
}