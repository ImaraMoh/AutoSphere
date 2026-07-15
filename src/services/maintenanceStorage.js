
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Saves a new maintenance record to Firebase Firestore under the specified vehicle's subcollection.
 * Path: users/{uid}/vehicles/{vehicleId}/maintenance/{maintenanceId}
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {Object} maintenanceData - The maintenance record payload object
 * @returns {Promise<boolean>} - Success status
 */
export const saveMaintenanceItem = async (vehicleId, maintenanceData) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      console.log("Save Maintenance Error: Missing authenticated user or vehicle ID");
      return false;
    }

    const uid = currentUser.uid;

    const maintenanceCollectionRef = collection(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "maintenance"
    );

    const maintenancePayload = {
      ...maintenanceData,
      createdAt: serverTimestamp(),
      date: maintenanceData.date || new Date().toISOString()
    };

    await addDoc(maintenanceCollectionRef, maintenancePayload);

    return true;
  } catch (error) {
    console.log("Save maintenance error (Firebase):", error);
    return false;
  }
};

/**
 * Legacy wrapper to maintain compatibility if saving a full array list directly.
 * Iterates and syncs or creates new records under the vehicle's maintenance subcollection.
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {Array|Object} data - Maintenance item(s)
 */
export const saveMaintenance = async (vehicleId, data) => {
  try {
    if (Array.isArray(data)) {
      for (const item of data) {
        if (!item.id) {
          await saveMaintenanceItem(vehicleId, item);
        }
      }
    } else if (data) {
      // Return the result of saveMaintenanceItem directly
      return await saveMaintenanceItem(vehicleId, data);
    }
    return true; // Return true when batch/array operations complete successfully
  } catch (error) {
    console.log("Save maintenance error (Batch Firebase):", error);
    return false; // Return false if an exception is caught
  }
};

/**
 * Fetches all maintenance records for a specific vehicle from Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/maintenance
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @returns {Promise<Array>} - Array of maintenance records ordered by date descending
 */
export const getMaintenance = async (vehicleId) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      return [];
    }

    const uid = currentUser.uid;

    const maintenanceQuery = query(
      collection(db, "users", uid, "vehicles", vehicleId, "maintenance"),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(maintenanceQuery);

    const maintenanceRecords = querySnapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }));

    return maintenanceRecords;
  } catch (error) {
    console.log("Get maintenance error (Firebase):", error);
    return [];
  }
};

/**
 * Updates an existing maintenance record in Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/maintenance/{maintenanceId}
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {Object} updatedRecord - The updated maintenance record (must contain id)
 * @returns {Promise<boolean>} - Success status
 */
export const updateMaintenance = async (vehicleId, updatedRecord) => {
  try {
    const currentUser = auth.currentUser;
    const recordId = updatedRecord?.id;

    if (!currentUser || !vehicleId || !recordId) {
      throw new Error("Update Maintenance Error: Missing user, vehicle ID, or record ID");
    }

    const uid = currentUser.uid;

    const docRef = doc(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "maintenance",
      recordId
    );

    const { id, ...updateFields } = updatedRecord;

    await updateDoc(docRef, {
      ...updateFields,
      updatedAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.log("Update maintenance error (Firebase):", error);
    return false;
  }
};

/**
 * Deletes a maintenance record from Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/maintenance/{maintenanceId}
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {string} recordId - The ID of the maintenance record to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteMaintenance = async (vehicleId, recordId) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId || !recordId) {
      console.log("Missing user, vehicle ID, or record ID");
      return false;
    }

    const uid = currentUser.uid;
    console.log(`Attempting to delete at path: users/${uid}/vehicles/${vehicleId}/maintenance/${recordId}`);

    const docRef = doc(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "maintenance",
      recordId
    );

    await deleteDoc(docRef);
    console.log("Successfully deleted!");
    return true;
  } catch (error) {
    console.error("Delete error:", error.code, error.message);
    return false;
  }
};