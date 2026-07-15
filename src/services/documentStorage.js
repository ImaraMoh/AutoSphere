import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Saves a document to Firebase Firestore under the authenticated user's profile.
 * Path: users/{uid}/documents
 */
export async function saveDocument(vehicleId, documentData) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("OCR Save Error: Missing authenticated user");
    }

    const finalVehicleId = vehicleId || documentData?.vehicleId || "global-wallet";

    const payloadWithVehicle = {
      ...documentData,
      vehicleId: String(finalVehicleId) // Ensure it's stored as a string
    };

    if (!payloadWithVehicle.vehicleId) {
      throw new Error("OCR Save Error: Missing target vehicle ID");
    }

    const uid = currentUser.uid;
    const documentsRef = collection(db, "users", uid, "documents");

    const documentPayload = {
      ...payloadWithVehicle,
      createdAt: new Date().toISOString(), // Use client string to avoid sorting race conditions
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(documentsRef, documentPayload);
    return { id: docRef.id, ...documentPayload };
  } catch (error) {
    console.log("Save Document Error (Firebase):", error);
    throw error;
  }
}

/**
 * Fetches documents, with fallback protection to ensure items aren't filtered out by ID type mismatches.
 */
export async function getDocuments(vehicleId) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return [];
    }

    const uid = currentUser.uid;
    const documentsRef = collection(db, "users", uid, "documents");

    // First attempt: try fetching strictly by vehicleId if provided
    let documents = [];
    if (vehicleId && vehicleId !== "global-wallet") {
      const strictQuery = query(documentsRef, where("vehicleId", "==", String(vehicleId)));
      const strictSnapshot = await getDocs(strictQuery);
      documents = strictSnapshot.docs.map(docItem => ({
        id: docItem.id,
        ...docItem.data()
      }));
    }

    // Fallback: If nothing found or no vehicleId provided, fetch all user documents
    if (documents.length === 0) {
      const allQuery = query(documentsRef);
      const allSnapshot = await getDocs(allQuery);
      documents = allSnapshot.docs.map(docItem => ({
        id: docItem.id,
        ...docItem.data()
      }));

      // If a specific vehicleId was requested, filter them manually on the client side just in case
      if (vehicleId && vehicleId !== "global-wallet") {
        documents = documents.filter(doc => String(doc.vehicleId) === String(vehicleId) || !doc.vehicleId);
      }
    }

    documents.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    return documents;
  } catch (error) {
    console.log("Get Documents Error (Firebase):", error);
    return [];
  }
}

/**
 * Updates an existing document record in Firebase Firestore.
 */
export async function updateDocument(documentData) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !documentData?.id) {
      throw new Error("Update Document Error: Missing authenticated user or document ID");
    }

    const uid = currentUser.uid;
    const docRef = doc(db, "users", uid, "documents", documentData.id);

    const updatePayload = {
      ...documentData,
      updatedAt: serverTimestamp()
    };

    delete updatePayload.id;

    await updateDoc(docRef, updatePayload);
    return true;
  } catch (error) {
    console.log("Update Document Error (Firebase):", error);
    throw error;
  }
}

/**
 * Deletes a specific document record from Firebase Firestore.
 */
export async function deleteDocument(id, vehicleId) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !id) {
      throw new Error("Delete Document Error: Missing authenticated user or document ID");
    }

    const uid = currentUser.uid;
    const docRef = doc(db, "users", uid, "documents", id);

    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log("Delete Document Error (Firebase):", error);
    throw error;
  }
}