
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const defaultSettings = {
  notifications: true,
  marketing: false,
  maintenanceReminder: true,
  fuelAlert: true,
  aiRecommendation: true
};

/**
 * Saves or updates user notification and preference settings in Firebase Firestore.
 * Path: users/{uid}/settings/userPreferences
 * 
 * @param {Object} settings - The settings object payload
 * @returns {Promise<boolean>} - Success status
 */
export async function saveSettings(settings) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("SETTINGS SAVE ERROR: No authenticated user found.");
      return false;
    }

    const uid = currentUser.uid;
    const docRef = doc(db, "users", uid, "settings", "userPreferences");

    const settingsPayload = {
      ...defaultSettings,
      ...settings,
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, settingsPayload, { merge: true });

    return true;
  } catch (error) {
    console.log("SETTINGS SAVE ERROR (Firebase):", error);
    return false;
  }
}

/**
 * Fetches user preference settings from Firebase Firestore.
 * Path: users/{uid}/settings/userPreferences
 * 
 * @returns {Promise<Object>} - User settings object or default settings fallback
 */
export async function getSettings() {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return defaultSettings;
    }

    const uid = currentUser.uid;
    const docRef = doc(db, "users", uid, "settings", "userPreferences");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        ...defaultSettings,
        ...docSnap.data()
      };
    }

    // If no document exists yet, initialize with defaults
    await saveSettings(defaultSettings);
    return defaultSettings;

  } catch (error) {
    console.log("SETTINGS READ ERROR (Firebase):", error);
    return defaultSettings;
  }
}