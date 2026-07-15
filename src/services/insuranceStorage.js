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
 * Normalizes input parameter to guarantee a safe string representation of a vehicle ID.
 */
const resolveVehicleId = (vehicleId) => {
  if (!vehicleId) return null;
  if (typeof vehicleId === "string") return vehicleId;
  if (typeof vehicleId === "object") {
    return vehicleId.vehicleId || vehicleId.id || vehicleId._id || null;
  }
  return String(vehicleId);
};

/**
 * Saves or updates insurance policy details for a specific vehicle in Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/insurance/policyDetails
 * 
 * @param {string|Object} vehicleId - The ID of the target vehicle or route param object
 * @param {Object} data - The insurance policy data payload object
 * @returns {Promise<boolean>} - Success status
 */
export const saveInsurance = async (vehicleId, data) => {
  try {
    const currentUser = auth.currentUser;
    const safeVehicleId = resolveVehicleId(vehicleId);

    if (!currentUser || !safeVehicleId) {
      console.log("Save Insurance Error: Missing authenticated user or valid vehicle ID");
      return false;
    }

    const uid = currentUser.uid;

    const docRef = doc(
      db,
      "users",
      uid,
      "vehicles",
      safeVehicleId,
      "insurance",
      "policyDetails"
    );

    const insurancePayload = {
      ...data,
      vehicleId: safeVehicleId,
      updatedAt: serverTimestamp(),
      createdAt: data.createdAt || new Date().toISOString()
    };

    await setDoc(docRef, insurancePayload, { merge: true });

    return true;
  } catch (error) {
    console.log("Error saving insurance policy to Firebase:", error);
    return false;
  }
};

/**
 * Fetches insurance policy details for a specific vehicle from Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/insurance/policyDetails
 * 
 * @param {string|Object} vehicleId - The ID of the target vehicle or route param object
 * @returns {Promise<Object|null>} - Insurance policy data object or null if not found
 */
export const getInsurance = async (vehicleId) => {
  try {
    const currentUser = auth.currentUser;
    const safeVehicleId = resolveVehicleId(vehicleId);

    if (!currentUser || !safeVehicleId) {
      return null;
    }

    const uid = currentUser.uid;

    const querySnapshot = await getDocs(
      query(collection(db, "users", uid, "vehicles", safeVehicleId, "insurance"))
    );

    if (!querySnapshot.empty) {
      let insuranceResult = null;
      querySnapshot.forEach((document) => {
        if (
          document.id === "policyDetails" ||
          document.data().policyNumber ||
          document.data().provider ||
          document.data().company
        ) {
          insuranceResult = { id: document.id, ...document.data() };
        }
      });
      return insuranceResult;
    }

    return null;
  } catch (error) {
    console.log("Error fetching insurance policy from Firebase:", error);
    return null;
  }
};