
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Fetches the user's profile details from Firebase Firestore.
 * Checks both the specific user profile subcollection (users/{uid}/profile/userProfile)
 * and the root user document (users/{uid}) to correctly extract `fullname` or `fullName`.
 * 
 * @returns {Promise<Object|null>} - User profile data object or null if not found
 */
export async function getProfile() {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("Get Profile Error: No authenticated user found.");
      return null;
    }

    const uid = currentUser.uid;

    // 1. Check root user document: users/{uid}
    const rootUserDocRef = doc(db, "users", uid);
    const rootUserSnap = await getDoc(rootUserDocRef);

    let rootData = {};
    if (rootUserSnap.exists()) {
      rootData = rootUserSnap.data();
    }

    // 2. Check profile subcollection document: users/{uid}/profile/userProfile
    const profileDocRef = doc(db, "users", uid, "profile", "userProfile");
    const profileSnap = await getDoc(profileDocRef);

    let profileData = {};
    if (profileSnap.exists()) {
      profileData = profileSnap.data();
    }

    // Combine data prioritizing root `fullname` / `fullName` or profile subcollection keys
    const resolvedName = 
      rootData.fullname || 
      rootData.fullName || 
      profileData.fullname || 
      profileData.fullName || 
      profileData.name || 
      currentUser.displayName || 
      "";

    const resolvedEmail = profileData.email || rootData.email || currentUser.email || "";
    const resolvedPhone = profileData.phone || rootData.phone || currentUser.phoneNumber || "";
    const resolvedImage = profileData.image || rootData.image || currentUser.photoURL || null;

    return {
      ...rootData,
      ...profileData,
      name: resolvedName,
      fullname: resolvedName,
      email: resolvedEmail,
      phone: resolvedPhone,
      image: resolvedImage
    };

  } catch (error) {
    console.log("Error loading profile from Firebase:", error);
    return null;
  }
}

/**
 * Saves or updates the user's profile details in Firebase Firestore.
 * Persists data both to the root user document (users/{uid}) and profile subcollection 
 * to ensure `fullname` is always accessible.
 * 
 * @param {Object} profileData - The profile data object payload
 * @returns {Promise<boolean>} - Success status
 */
export async function saveProfile(profileData) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("Save Profile Error: No authenticated user found.");
    }

    const uid = currentUser.uid;
    const resolvedName = profileData.fullname || profileData.fullName || profileData.name || "";

    const profilePayload = {
      fullname: resolvedName,
      name: resolvedName,
      email: profileData.email || "",
      phone: profileData.phone || "",
      image: profileData.image || null,
      updatedAt: serverTimestamp(),
      createdAt: profileData.createdAt || new Date().toISOString()
    };

    // Save to profile subcollection
    const profileDocRef = doc(db, "users", uid, "profile", "userProfile");
    await setDoc(profileDocRef, profilePayload, { merge: true });

    // Also sync `fullname` to the root user document `users/{uid}` for quick root queries
    const rootUserDocRef = doc(db, "users", uid);
    await setDoc(rootUserDocRef, { fullname: resolvedName, updatedAt: serverTimestamp() }, { merge: true });

    return true;
  } catch (error) {
    console.log("Error saving profile to Firebase:", error);
    throw error;
  }
}