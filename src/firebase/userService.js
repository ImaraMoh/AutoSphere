// src/firebase/userService.js
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

export async function getUserProfileFromFirebase() {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return { name: user.displayName || "AutoSphere User", email: user.email };
    }
  } catch (error) {
    console.log("Error loading user profile:", error);
    return null;
  }
}