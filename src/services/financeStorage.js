
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Fetches vehicle loan/finance details for a specific vehicle from Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/finance/loanDetails
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @returns {Promise<Object|null>} - Loan data object or null if not found
 */
export const getLoan = async (vehicleId) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      console.log("Get Loan Error: Missing authenticated user or vehicle ID");
      return null;
    }

    const uid = currentUser.uid;

    const docRef = doc(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "finance",
      "loanDetails"
    );

    // Alternatively check query collection if structured differently
    const querySnapshot = await getDocs(
      query(collection(db, "users", uid, "vehicles", vehicleId, "finance"))
    );

    if (!querySnapshot.empty) {
      let loanResult = null;
      querySnapshot.forEach((document) => {
        if (document.id === "loanDetails" || document.data().loanAmount || document.data().principal) {
          loanResult = document.data();
        }
      });
      return loanResult;
    }

    return null;
  } catch (error) {
    console.log("Error fetching loan data from Firebase:", error);
    return null;
  }
};

/**
 * Saves or updates vehicle loan/finance details in Firebase Firestore under the specified vehicle's subcollection.
 * Path: users/{uid}/vehicles/{vehicleId}/finance/loanDetails
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {Object} loanData - The loan data payload object
 * @returns {Promise<boolean>} - Success status
 */
export const saveLoan = async (vehicleId, loanData) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      throw new Error("Save Loan Error: Missing authenticated user or vehicle ID");
    }

    const uid = currentUser.uid;

    const docRef = doc(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "finance",
      "loanDetails"
    );

    const loanPayload = {
      ...loanData,
      updatedAt: serverTimestamp(),
      createdAt: loanData.createdAt || new Date().toISOString()
    };

    await setDoc(docRef, loanPayload, { merge: true });

    return true;
  } catch (error) {
    console.log("Error saving loan data to Firebase:", error);
    throw error;
  }
};