
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Aggregates comprehensive vehicle context data (vehicles, maintenance, expenses, and reminders) 
 * directly from Firebase Firestore for the authenticated user and a specific vehicle.
 * 
 * @param {string} [vehicleId] - Optional specific vehicle ID. If provided, pulls subcollection details.
 * @returns {Promise<Object>} - Aggregated context object containing vehicle specs, maintenance, expenses, and reminders.
 */
export async function getVehicleContext(vehicleId) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("Vehicle context error: No authenticated user found.");
      return {};
    }

    const uid = currentUser.uid;

    // 1. Fetch user vehicles list
    const vehiclesQuery = query(collection(db, "users", uid, "vehicles"));
    const vehicleSnapshot = await getDocs(vehiclesQuery);
    
    const vehicles = vehicleSnapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }));

    // Determine target vehicle ID (default to first vehicle if not specified and list isn't empty)
    const targetVehicleId = vehicleId || (vehicles.length > 0 ? vehicles[0].id : null);

    let maintenance = [];
    let expenses = [];

    if (targetVehicleId) {
      // 2. Fetch maintenance and expenses concurrently for the target vehicle
      const [maintenanceSnap, expenseSnap] = await Promise.all([
        getDocs(query(collection(db, "users", uid, "vehicles", targetVehicleId, "maintenance"), orderBy("date", "desc"))),
        getDocs(query(collection(db, "users", uid, "vehicles", targetVehicleId, "expenses"), orderBy("date", "desc")))
      ]);

      maintenance = maintenanceSnap.docs.map(docItem => ({
        id: docItem.id,
        ...docItem.data()
      }));

      expenses = expenseSnap.docs.map(docItem => ({
        id: docItem.id,
        ...docItem.data()
      }));
    }

    // 3. Fetch user reminders list
    const remindersQuery = query(
      collection(db, "users", uid, "reminders"),
      orderBy("date", "desc")
    );
    const reminderSnapshot = await getDocs(remindersQuery);
    
    const reminders = reminderSnapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }));

    return {
      vehicle: vehicles.length === 1 ? vehicles[0] : vehicles,
      activeVehicleId: targetVehicleId,
      maintenance,
      expenses,
      reminders
    };

  } catch (error) {
    console.log("Vehicle context error (Firebase):", error);
    return {};
  }
}