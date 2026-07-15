
import {
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Saves or updates the latest cached AI health report and timestamp in Firebase Firestore
 * under the active vehicle's subcollection.
 * Path: users/{uid}/vehicles/{vehicleId}/aiCache/latestHealth
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {Object} data - The health report data object
 */
export async function saveAIHealth(vehicleId, data) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      console.log("AI Cache Save Error: Missing authenticated user or vehicle ID");
      return;
    }

    const uid = currentUser.uid;

    const docRef = doc(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "aiCache",
      "latestHealth"
    );

    const cachePayload = {
      ...data,
      timestamp: Date.now(),
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, cachePayload, { merge: true });

  } catch (error) {
    console.log("AI Cache Save Error (Firebase):", error);
  }
}

/**
 * Fetches the latest cached AI health report for a specific vehicle from Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/aiCache/latestHealth
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @returns {Promise<Object|null>} - Cached health report object or null
 */
export async function getAIHealth(vehicleId) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      return null;
    }

    const uid = currentUser.uid;

    const docRef = doc(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "aiCache",
      "latestHealth"
    );

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    // Fallback search over subcollection documents if path query differs
    const querySnapshot = await getDocs(
      query(collection(db, "users", uid, "vehicles", vehicleId, "aiCache"))
    );

    if (!querySnapshot.empty) {
      let healthData = null;
      querySnapshot.forEach((document) => {
        if (document.id === "latestHealth" || document.data().score !== undefined) {
          healthData = document.data();
        }
      });
      return healthData;
    }

    return null;
  } catch (error) {
    console.log("AI Cache Read Error (Firebase):", error);
    return null;
  }
}

/**
 * Fetches the timestamp of the cached AI health report for a specific vehicle from Firebase Firestore.
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @returns {Promise<number|null>} - Timestamp number or null
 */
export async function getAIHealthTime(vehicleId) {
  try {
    const healthData = await getAIHealth(vehicleId);
    return healthData?.timestamp ? Number(healthData.timestamp) : null;
  } catch (error) {
    console.log("AI Cache Time Error (Firebase):", error);
    return null;
  }
}

/**
 * Clears the cached AI health report and timestamp for a specific vehicle from Firebase Firestore.
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 */
export async function clearAIHealth(vehicleId) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      return;
    }

    const uid = currentUser.uid;

    const docRef = doc(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "aiCache",
      "latestHealth"
    );

    await deleteDoc(docRef);

  } catch (error) {
    console.log("AI Cache Clear Error (Firebase):", error);
  }
}