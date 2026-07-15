import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Fetches all reminders for the authenticated user from Firebase Firestore.
 * Optionally filters by vehicleId if provided.
 * 
 * @param {string} [vehicleId] - Optional vehicle ID to filter reminders
 * @returns {Promise<Array>} - Array of reminder records ordered by date descending
 */
export async function getReminders(vehicleId) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return [];
    }

    const uid = currentUser.uid;
    const remindersRef = collection(db, "users", uid, "reminders");

    let remindersQuery;
    if (vehicleId) {
      // Query filtered by vehicleId without orderBy (bypasses composite index requirement)
      remindersQuery = query(
        remindersRef,
        where("vehicleId", "==", vehicleId)
      );
    } else {
      remindersQuery = query(remindersRef);
    }

    const querySnapshot = await getDocs(remindersQuery);

    let reminders = querySnapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }));

    // Sort locally by date descending
    reminders.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    return reminders;
  } catch (error) {
    console.log("Get Reminder Error (Firebase):", error);
    return [];
  }
}

/**
 * Saves a single new reminder to Firebase Firestore under the authenticated user's profile.
 * Path: users/{uid}/reminders/{reminderId}
 * 
 * @param {Object} reminderData - The reminder payload object
 * @returns {Promise<boolean>} - Success status
 */
export async function saveReminder(reminderData) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("Save Reminder Error: No authenticated user found.");
      return false;
    }

    const uid = currentUser.uid;
    const remindersRef = collection(db, "users", uid, "reminders");

    const reminderPayload = {
      ...reminderData,
      createdAt: serverTimestamp(),
      date: reminderData.date || new Date().toISOString(),
      status: reminderData.status || "Upcoming"
    };

    await addDoc(remindersRef, reminderPayload);

    return true;
  } catch (error) {
    console.log("Save Reminder Error (Firebase):", error);
    return false;
  }
}

/**
 * Legacy wrapper to maintain compatibility if saving a full array list directly.
 * 
 * @param {Array|Object} reminders - Reminder item(s)
 * @returns {Promise<boolean>} - Success status
 */
export async function saveReminders(reminders) {
  try {
    if (Array.isArray(reminders)) {
      for (const item of reminders) {
        if (!item.id || item.id.length > 25) {
          await saveReminder(item);
        }
      }
      return true;
    } else if (reminders) {
      return await saveReminder(reminders);
    }
    return false;
  } catch (error) {
    console.log("Save Reminders Batch Error (Firebase):", error);
    return false;
  }
}

/**
 * Deletes a single reminder by ID from Firebase Firestore.
 * Handles both deleteReminder(id) and deleteReminder(vehicleId, id) signatures.
 * 
 * @param {string} arg1 - Either the reminder ID or vehicle ID depending on signature
 * @param {string} [arg2] - Optional reminder ID if vehicleId is passed as first argument
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteReminder(arg1, arg2) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("Delete Reminder Error: Missing authenticated user");
    }

    const uid = currentUser.uid;
    // Determine target reminder ID based on argument length/type
    const targetReminderId = arg2 ? arg2 : arg1;

    if (!targetReminderId) {
      throw new Error("Delete Reminder Error: Missing reminder ID");
    }

    const docRef = doc(db, "users", uid, "reminders", targetReminderId);
    await deleteDoc(docRef);

    return true;
  } catch (error) {
    console.log("Delete Reminder Error (Firebase):", error);
    return false;
  }
}

/**
 * Creates and persists an expiry reminder from a document object directly to Firebase Firestore.
 * 
 * @param {Object} document - The document object containing type, expiryDate, and id
 * @returns {Promise<Object|null>} - The created reminder object or null on failure
 */
export async function createExpiryReminder(document) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !document) {
      throw new Error("Create Reminder Error: Missing user or document context");
    }

    const uid = currentUser.uid;
    const remindersRef = collection(db, "users", uid, "reminders");

    const reminderPayload = {
      title: `${document.type || "Document"} Expiry`,
      date: document.expiryDate || new Date().toISOString(),
      description: `Your ${document.type || "document"} expires soon`,
      status: "Upcoming",
      documentId: document.id || "",
      vehicleId: document.vehicleId || "",
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(remindersRef, reminderPayload);

    return {
      id: docRef.id,
      ...reminderPayload,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.log("Create Reminder Error (Firebase):", error);
    return null;
  }
}