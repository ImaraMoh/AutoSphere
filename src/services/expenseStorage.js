// expenseService.js

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
 * Saves a new expense record to Firebase Firestore under the specified vehicle's subcollection.
 * Path: users/{uid}/vehicles/{vehicleId}/expenses/{expenseId}
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {Object} expenseData - The expense record payload
 * @returns {Promise<boolean>} - Success status
 */
export const saveExpense = async (vehicleId, expenseData) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("Save Expense Error: Missing authenticated user");
      return false;
    }

    if (!vehicleId) {
      console.log("Save Expense Error: Missing vehicle ID");
      return false;
    }

    const uid = currentUser.uid;

    const expensesCollectionRef = collection(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "expenses"
    );

    const expensePayload = {
      ...expenseData,
      createdAt: serverTimestamp(),
      date: expenseData.date || new Date().toISOString()
    };

    await addDoc(expensesCollectionRef, expensePayload);

    return true;
  } catch (error) {
    console.log("Save expense error (Firebase):", error);
    return false;
  }
};

/**
 * Legacy wrapper to maintain compatibility if saving a full array list directly.
 * Iterates and syncs or creates new records under the vehicle's expenses subcollection.
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {Array|Object} expenses - Expense item(s)
 */
export const saveExpenses = async (vehicleId, expenses) => {
  try {
    if (!vehicleId) {
      console.log("Save Expenses Error: Missing vehicle ID");
      return;
    }

    if (Array.isArray(expenses)) {
      for (const item of expenses) {
        if (!item.id) {
          await saveExpense(vehicleId, item);
        }
      }
    } else if (expenses) {
      await saveExpense(vehicleId, expenses);
    }
  } catch (error) {
    console.log("Save expense error (Batch Firebase):", error);
  }
};

/**
 * Fetches all expense records for a specific vehicle from Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/expenses
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @returns {Promise<Array>} - Array of expense records ordered by date descending
 */
export const getExpenses = async (vehicleId) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("Get Expenses Error: Missing authenticated user");
      return [];
    }

    if (!vehicleId) {
      console.log("Get Expenses Error: Missing vehicle ID");
      return [];
    }

    const uid = currentUser.uid;

    const expenseQuery = query(
      collection(db, "users", uid, "vehicles", vehicleId, "expenses"),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(expenseQuery);

    const expenses = querySnapshot.docs.map(docItem => ({
      id: docItem.id,
      ...docItem.data()
    }));

    return expenses;
  } catch (error) {
    console.log("Get expense error (Firebase):", error);
    return [];
  }
};

/**
 * Updates an existing expense record in Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/expenses/{expenseId}
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {Object} updatedExpense - The updated expense record (must contain id)
 * @returns {Promise<boolean>} - Success status
 */
export const updateExpense = async (vehicleId, updatedExpense) => {
  try {
    const currentUser = auth.currentUser;
    const expenseId = updatedExpense?.id;

    if (!currentUser || !vehicleId || !expenseId) {
      console.log("Update Expense Error: Missing user, vehicle ID, or expense ID");
      return false;
    }

    const uid = currentUser.uid;

    const docRef = doc(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "expenses",
      expenseId
    );

    const { id, ...updateFields } = updatedExpense;

    await updateDoc(docRef, {
      ...updateFields,
      updatedAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.log("Update expense error (Firebase):", error);
    return false;
  }
};

/**
 * Deletes an expense record from Firebase Firestore.
 * Path: users/{uid}/vehicles/{vehicleId}/expenses/{expenseId}
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @param {string} expenseId - The ID of the expense record to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteExpense = async (vehicleId, expenseId) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId || !expenseId) {
      console.log("Delete Expense Error: Missing user, vehicle ID, or expense ID");
      return false;
    }

    const uid = currentUser.uid;

    const docRef = doc(
      db,
      "users",
      uid,
      "vehicles",
      vehicleId,
      "expenses",
      expenseId
    );

    await deleteDoc(docRef);

    return true;
  } catch (error) {
    console.log("Delete expense error (Firebase):", error);
    return false;
  }
};