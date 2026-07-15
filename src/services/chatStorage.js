
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Saves chat messages to Firebase Firestore under the authenticated user's profile.
 * Path: users/{uid}/chatHistory/{messageId} (or stores individual messages / session logs)
 * 
 * @param {Array} messages - Array of chat message objects
 * @param {string|null} [vehicleId=null] - Optional vehicle association for context-specific chats
 */
export async function saveChat(messages, vehicleId = null) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("Save Chat Error: No authenticated user found.");
      return;
    }

    const uid = currentUser.uid;
    const chatCollectionRef = collection(db, "users", uid, "chatHistory");

    // If saving the entire array state as a single snapshot or individual items,
    // storing the latest snapshot/session document or syncing messages can be handled.
    // Here we save the active messages payload block with a timestamp.
    
    // Clear old session records or store active session log
    const snapshotRef = collection(db, "users", uid, "chatSessions");
    
    // Alternatively, keeping standard collection sync:
    // For simplicity and robust cloud tracking, we can store the current active message array or sync new ones.
    // Let's implement a clean cloud document sync for chat sessions:
    const chatData = {
      messages: messages,
      vehicleId: vehicleId || null,
      updatedAt: serverTimestamp(),
      date: new Date().toISOString()
    };

    // Save or update active chat session state
    await addDoc(chatCollectionRef, chatData);

  } catch (error) {
    console.log("Save chat error (Firebase):", error);
  }
}

/**
 * Loads chat history for the authenticated user from Firebase Firestore.
 * 
 * @param {string|null} [vehicleId=null] - Optional vehicle ID filter
 * @returns {Promise<Array>} - Array of chat messages
 */
export async function loadChat(vehicleId = null) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return [];
    }

    const uid = currentUser.uid;
    const chatQuery = query(
      collection(db, "users", uid, "chatHistory"),
      orderBy("updatedAt", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(chatQuery);

    if (!querySnapshot.empty) {
      const latestSession = querySnapshot.docs[0].data();
      return latestSession.messages || [];
    }

    return [];
  } catch (error) {
    console.log("Load chat error (Firebase):", error);
    return [];
  }
}

/**
 * Clears chat history for the authenticated user from Firebase Firestore.
 * 
 * @param {string|null} [vehicleId=null] - Optional vehicle ID filter
 */
export async function clearChat(vehicleId = null) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return;
    }

    const uid = currentUser.uid;
    const chatQuery = query(
      collection(db, "users", uid, "chatHistory")
    );

    const querySnapshot = await getDocs(chatQuery);
    
    // Delete all chat session logs for the user
    const deletePromises = querySnapshot.docs.map(document => 
      deleteDoc(doc(db, "users", uid, "chatHistory", document.id))
    );

    await Promise.all(deletePromises);

  } catch (error) {
    console.log("Clear chat error (Firebase):", error);
  }
}