// ocrDocumentService.js

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
 * Detects the document type based on scanned text content.
 */
export const detectDocumentType = (text) => {
  const data = (text || "").toUpperCase();

  if (
    data.includes("INSURANCE") ||
    data.includes("POLICY")
  ) {
    return "Insurance";
  }

  if (
    data.includes("REGISTRATION") ||
    data.includes("RC") ||
    data.includes("EXCISE")
  ) {
    return "Registration";
  }

  if (
    data.includes("LICENSE") ||
    data.includes("DRIVING")
  ) {
    return "License";
  }

  if (
    data.includes("SERVICE") ||
    data.includes("MAINTENANCE")
  ) {
    return "Service";
  }

  return "Other";
};

/**
 * Creates a structured document object and persists it directly to Firebase Firestore
 * under the active vehicle's documents subcollection.
 * Path: users/{uid}/vehicles/{vehicleId}/documents/{docId}
 */
export const createDocumentObject = async (vehicleData, text, vehicleId) => {
  try {
    const currentUser = auth.currentUser;
    const targetVehicleId = vehicleId || vehicleData?.id;

    if (!currentUser || !targetVehicleId) {
      throw new Error("OCR Save Error: Missing authenticated user or target vehicle ID");
    }

    const uid = currentUser.uid;
    const docType = detectDocumentType(text);

    // Generate a fallback expiry date 1 year from today if OCR didn't catch one
    const fallbackDate = new Date();
    fallbackDate.setFullYear(fallbackDate.getFullYear() + 1);
    const defaultExpiry = fallbackDate.toISOString().split('T')[0];

    const resolvedExpiry = vehicleData?.expiryDate && vehicleData.expiryDate.trim() !== "" 
      ? vehicleData.expiryDate 
      : defaultExpiry;

    const documentPayload = {
      type: docType,
      title: `${docType} Document`,
      registrationNumber: vehicleData?.registrationNumber || vehicleData?.registration || "Pending ID",
      owner: vehicleData?.ownerName || vehicleData?.owner || "Unknown Owner",
      vehicleModel: `${vehicleData?.brand || ""} ${vehicleData?.model || ""}`.trim() || "Vehicle Record",
      expiryDate: resolvedExpiry,
      engineNumber: vehicleData?.engineNumber || "",
      chassisNumber: vehicleData?.chassisNumber || "",
      rawText: text || "",
      createdAt: serverTimestamp(),
      date: new Date().toISOString(),
      status: "Valid"
    };

    const documentsCollectionRef = collection(
      db,
      "users",
      uid,
      "vehicles",
      targetVehicleId,
      "documents"
    );

    const docRef = await addDoc(documentsCollectionRef, documentPayload);

    return {
      id: docRef.id,
      ...documentPayload,
      vehicleId: targetVehicleId,
      createdAt: new Date().toISOString()
    };

  } catch (error) {
    console.log("OCR Document Firebase Save Error:", error);
    throw error;
  }
};

/**
 * Fetches all scanned documents for a specific vehicle from Firebase Firestore.
 */
export const getVehicleDocuments = async (vehicleId) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      return [];
    }

    const uid = currentUser.uid;

    const docsQuery = query(
      collection(db, "users", uid, "vehicles", vehicleId, "documents"),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(docsQuery);

    const documents = querySnapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }));

    return documents;
  } catch (error) {
    console.log("Get Vehicle Documents Error (Firebase):", error);
    return [];
  }
};