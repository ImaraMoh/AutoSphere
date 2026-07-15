// src/firebase/vehicleService.js
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

// Fetch all vehicles belonging to the logged-in user
export async function getVehiclesFromFirebase() {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(collection(db, "vehicles"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    
    const vehicles = [];
    querySnapshot.forEach((doc) => {
      vehicles.push({ id: doc.id, ...doc.data() });
    });

    return vehicles;
  } catch (error) {
    console.log("Error fetching vehicles:", error);
    return [];
  }
}

// Add a new vehicle to Firestore
export async function addVehicleToFirebase(vehicleData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user");

    const docRef = await addDoc(collection(db, "vehicles"), {
      ...vehicleData,
      userId: user.uid,
      createdAt: new Date().toISOString()
    });

    return docRef.id;
  } catch (error) {
    throw error;
  }
}