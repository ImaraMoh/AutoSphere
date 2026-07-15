// ocrStorage.js

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
 * Saves a new OCR scan record to Firebase Firestore under the authenticated user's profile 
 * or linked vehicle subpath.
 */
export const saveScan = async (scan, vehicleId = null) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("Save Scan Error: No authenticated user found.");
      return false;
    }

    const uid = currentUser.uid;
    const scansCollectionRef = vehicleId
      ? collection(db, "users", uid, "vehicles", vehicleId, "documents")
      : collection(db, "users", uid, "ocrScans");

    const scanPayload = {
      ...scan,
      vehicleId: vehicleId || scan.vehicleId || null,
      createdAt: serverTimestamp(),
      date: scan.date || new Date().toISOString()
    };

    const docRef = await addDoc(scansCollectionRef, scanPayload);

    return {
      id: docRef.id,
      ...scanPayload
    };
  } catch (error) {
    console.log("Save scan error (Firebase):", error);
    return false;
  }
};

/**
 * Fetches all OCR scan history records, optionally filtered by vehicleId.
 */
export const getScans = async (vehicleId = null) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return [];
    }

    const uid = currentUser.uid;
    let scansRef;
    let scansQuery;

    if (vehicleId) {
      scansRef = collection(db, "users", uid, "vehicles", vehicleId, "documents");
      scansQuery = query(scansRef);
    } else {
      scansRef = collection(db, "users", uid, "ocrScans");
      scansQuery = query(scansRef);
    }

    const querySnapshot = await getDocs(scansQuery);

    let scans = querySnapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }));

    scans.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    return scans;
  } catch (error) {
    console.log("Get scans error (Firebase):", error);
    return [];
  }
};

/**
 * Deletes a specific OCR scan record from Firebase Firestore.
 */
export const deleteScan = async (id, vehicleId = null) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !id) {
      throw new Error("Delete Scan Error: Missing authenticated user or scan ID");
    }

    const uid = currentUser.uid;
    const docRef = vehicleId
      ? doc(db, "users", uid, "vehicles", vehicleId, "documents", id)
      : doc(db, "users", uid, "ocrScans", id);

    await deleteDoc(docRef);

    return true;
  } catch (error) {
    console.log("Delete scan error (Firebase):", error);
    return false;
  }
};