
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Saves a new notification item to Firebase Firestore under the authenticated user's profile.
 * Prevents duplicates by checking if a notification with the same reminderId already exists.
 * Path: users/{uid}/notifications/{notificationId}
 * 
 * @param {Object} notificationData - The notification payload object
 * @returns {Promise<boolean>} - Success status
 */
export const saveNotification = async (notificationData) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("Save Notification Error: No authenticated user found.");
      return false;
    }

    const uid = currentUser.uid;
    const notificationsRef = collection(db, "users", uid, "notifications");

    // Prevent duplicates if reminderId is provided
    if (notificationData.reminderId) {
      const q = query(
        notificationsRef,
        where("reminderId", "==", notificationData.reminderId)
      );
      const existingSnap = await getDocs(q);
      if (!existingSnap.empty) {
        // Notification for this reminder already exists, skip creating duplicate
        return true;
      }
    }

    const notificationPayload = {
      ...notificationData,
      userId: uid,
      createdAt: serverTimestamp(),
      date: notificationData.date || new Date().toISOString(),
      read: notificationData.read ?? false
    };

    await addDoc(notificationsRef, notificationPayload);

    return true;
  } catch (error) {
    console.log("Save notification error (Firebase):", error);
    return false;
  }
};

/**
 * Legacy wrapper to maintain compatibility if saving a full array list directly.
 * Iterates and syncs or creates new records under the user's notifications collection.
 * 
 * @param {Array|Object} data - Notification item(s)
 */
export const saveNotifications = async (data) => {
  try {
    if (Array.isArray(data)) {
      for (const item of data) {
        if (!item.id) {
          await saveNotification(item);
        }
      }
    } else if (data) {
      await saveNotification(data);
    }
  } catch (error) {
    console.log("Save notifications batch error (Firebase):", error);
  }
};

/**
 * Fetches all notifications for the authenticated user from Firebase Firestore.
 * Path: users/{uid}/notifications
 * 
 * @returns {Promise<Array>} - Array of notification records ordered by creation date descending
 */
export const getNotifications = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return [];
    }

    const uid = currentUser.uid;
    const notificationsQuery = query(
      collection(db, "users", uid, "notifications"),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(notificationsQuery);

    const notifications = querySnapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }));

    return notifications;
  } catch (error) {
    console.log("Get notifications error (Firebase):", error);
    return [];
  }
};

/**
 * Clears all notifications for the authenticated user from Firebase Firestore.
 * Path: users/{uid}/notifications/{notificationId}
 */
export const clearNotifications = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return;
    }

    const uid = currentUser.uid;
    const notificationsRef = collection(db, "users", uid, "notifications");
    const querySnapshot = await getDocs(notificationsRef);

    const deletePromises = querySnapshot.docs.map(document =>
      deleteDoc(doc(db, "users", uid, "notifications", document.id))
    );

    await Promise.all(deletePromises);
  } catch (error) {
    console.log("Clear notifications error (Firebase):", error);
  }
};