
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Fetches insurance claims for the active vehicle from Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/insuranceClaims
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @returns {Promise<Array>} - Array of insurance claim records
 */
export const getClaims = async (vehicleId) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      console.log("Get Claims Error: Missing user or vehicle ID");
      return [];
    }

    const uid = currentUser.uid;

    const claimsQuery = query(
      collection(db, "users", uid, "vehicles", vehicleId, "insuranceClaims"),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(claimsQuery);

    const claims = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return claims;
  } catch (error) {
    console.log("Error fetching claims from Firebase:", error);
    return [];
  }
};

/**
 * Saves a new insurance claim to Firebase Firestore under the specified vehicle's subcollection.
 * Path: users/{uid}/vehicles/{vehicleId}/insuranceClaims/{claimId}
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {Object} newClaim - The claim payload object
 * @returns {Promise<Array>} - Updated array of all claims for the vehicle
 */
export const saveClaim = async (vehicleId, newClaim) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      throw new Error("Save Claim Error: Missing authenticated user or vehicle ID");
    }

    const uid = currentUser.uid;

    const claimsCollectionRef = collection(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "insuranceClaims"
    );

    const claimPayload = {
      ...newClaim,
      createdAt: serverTimestamp(),
      date: newClaim.date || new Date().toISOString()
    };

    await addDoc(claimsCollectionRef, claimPayload);

    // Fetch and return the updated list of claims
    const updatedClaims = await getClaims(vehicleId);
    return updatedClaims;
  } catch (error) {
    console.log("Error saving claim to Firebase:", error);
    throw error;
  }
};