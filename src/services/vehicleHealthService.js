// vehicleHealthService.js

import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Calculates a dynamic vehicle health score and report based on vehicle metrics.
 * 
 * @param {Object} vehicle - Vehicle object containing mileage, serviceStatus, insuranceStatus, etc.
 * @returns {Object} - Calculated health report object
 */
export const calculateVehicleHealth = (vehicle) => {
  const mileage = Number(vehicle?.mileage || 0);

  let score = 100;

  // Mileage factor
  if (mileage > 100000) {
    score -= 20;
  } else if (mileage > 80000) {
    score -= 10;
  }

  // Service factor
  if (vehicle?.serviceStatus === "Upcoming") {
    score -= 5;
  }

  // Insurance factor
  if (vehicle?.insuranceStatus && vehicle.insuranceStatus !== "Valid") {
    score -= 10;
  }

  return {
    score,
    healthStatus:
      score >= 80
        ? "Excellent Condition"
        : score >= 60
        ? "Needs Attention"
        : "Critical",
    analysis:
      score >= 80
        ? "Vehicle performance is currently healthy."
        : "Vehicle requires maintenance attention.",
    maintenancePrediction:
      vehicle?.serviceStatus || "Service analysis pending",
    drivingEfficiency: "Good fuel efficiency",
    expenseBehaviour: "Normal spending pattern",
    recommendations: [
      "Maintain regular service schedule",
      "Check tire pressure"
    ],
    updatedAt: new Date().toISOString()
  };
};

/**
 * Calculates vehicle health and automatically persists the report to Firebase Firestore 
 * under the active vehicle's subcollection.
 * Path: users/{uid}/vehicles/{vehicleId}/aiCache/latestHealth
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {Object} vehicle - Vehicle object data
 * @returns {Promise<Object>} - The calculated and saved health report object
 */
export const calculateAndSaveVehicleHealth = async (vehicleId, vehicle) => {
  try {
    const healthReport = calculateVehicleHealth(vehicle);

    const currentUser = auth.currentUser;
    if (!currentUser || !vehicleId) {
      return healthReport;
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

    const payload = {
      ...healthReport,
      timestamp: Date.now(),
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, payload, { merge: true });

    return healthReport;
  } catch (error) {
    console.log("Error calculating and saving vehicle health (Firebase):", error);
    return calculateVehicleHealth(vehicle);
  }
};