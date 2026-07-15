// aiHealthStorage.js

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase/firebaseConfig";

/**
 * Saves an AI health report to Firebase Firestore under the specified vehicle's subcollection.
 * Path: users/{uid}/vehicles/{vehicleId}/healthHistory/{reportId}
 * 
 * @param {string} vehicleId - The ID of the vehicle being analyzed
 * @param {object} report - The health report object (score, analysis, etc.)
 */
export async function saveHealthReport(vehicleId, report) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      console.log("Save Health Report Error: Missing user or vehicle ID");
      return false;
    }

    const uid = currentUser.uid;

    const healthCollectionRef = collection(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "healthHistory"
    );

    // Sanitize payload fields to protect against raw index formatting issues
    const sanitizedReport = {
      score: Number(report?.score || 0),
      healthStatus: String(report?.healthStatus || report?.analysis || "Good Condition"),
      maintenancePrediction: String(report?.maintenancePrediction || ""),
      drivingEfficiency: String(report?.drivingEfficiency || ""),
      expenseBehaviour: String(report?.expenseBehaviour || ""),
      analysis: String(report?.analysis || ""),
      recommendations: Array.isArray(report?.recommendations) ? report.recommendations : [],
      createdAt: serverTimestamp(),
      date: new Date().toISOString()
    };

    await addDoc(healthCollectionRef, sanitizedReport);

    return true;
  } catch (error) {
    console.log("Health Save Error (Firebase):", error);
    return false;
  }
}

/**
 * Fetches the health history for a specific vehicle from Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/healthHistory
 * 
 * @param {string} vehicleId - The ID of the vehicle
 * @returns {Promise<Array>} - Array of past health reports
 */
export async function getHealthHistory(vehicleId) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      return [];
    }

    const uid = currentUser.uid;

    const healthQuery = query(
      collection(db, "users", uid, "vehicles", vehicleId, "healthHistory"),
      orderBy("date", "desc"),
      limit(20)
    );

    const querySnapshot = await getDocs(healthQuery);

    const history = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return history;
  } catch (error) {
    console.log("Get Health History Error (Firebase):", error);
    return [];
  }
}