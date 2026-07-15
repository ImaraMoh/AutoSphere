
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const initialSchoolsData = [
  {
    id: "1",
    name: "ABC Driving Academy",
    location: "Colombo",
    rating: 4.8,
    vehicles: ["Car", "Bike"],
    price: 25000,
    featured: true,
    instructors: [
      {
        id: "i1",
        name: "Kasun Perera",
        experience: "8 Years",
        rating: "4.9",
        reviews: "142",
        vehicle: "Car / Manual",
        availability: "Monday - Friday",
        avatar: "👨‍🏫",
        bio: "Certified professional driving instructor specializing in defensive driving tactics, manual transmissions, and helping nervous beginners pass their practical test with absolute confidence."
      },
      {
        id: "i2",
        name: "Amara Silva",
        experience: "5 Years",
        rating: "4.7",
        reviews: "98",
        vehicle: "Car / Auto",
        availability: "Tuesday - Saturday",
        avatar: "👩‍🏫",
        bio: "Patient and expert automatic transmission coach dedicated to road safety principles and parallel parking mastery."
      }
    ]
  },
  {
    id: "2",
    name: "Smart Drive School",
    location: "Kandy",
    rating: 4.6,
    vehicles: ["Car"],
    price: 30000,
    featured: false,
    instructors: [
      {
        id: "i3",
        name: "Nimal Fernando",
        experience: "12 Years",
        rating: "4.9",
        reviews: "215",
        vehicle: "Car / Manual & Auto",
        availability: "Monday - Saturday",
        avatar: "👨‍🏫",
        bio: "Senior lead instructor with over a decade of experience guiding students through hill starts and tricky provincial road conditions."
      },
      {
        id: "i4",
        name: "Sanduni Wickramasinghe",
        experience: "4 Years",
        rating: "4.5",
        reviews: "64",
        vehicle: "Car / Auto",
        availability: "Wednesday - Sunday",
        avatar: "👩‍🏫",
        bio: "Friendly instructor focused on urban driving techniques and building early driver confidence."
      }
    ]
  },
  {
    id: "3",
    name: "Elite Motors Academy",
    location: "Galle",
    rating: 4.9,
    vehicles: ["Car", "Bike", "Truck"],
    price: 35000,
    featured: true,
    instructors: [
      {
        id: "i5",
        name: "Suresh Omar",
        experience: "6 Years",
        rating: "4.6",
        reviews: "88",
        vehicle: "Bike & Car",
        availability: "Monday - Friday",
        avatar: "👨‍🏫",
        bio: "Specialist trainer for both heavy vehicles and two-wheelers, prioritizing absolute compliance and mechanical awareness."
      },
      {
        id: "i6",
        name: "Priyanthi Perera",
        experience: "10 Years",
        rating: "4.8",
        reviews: "170",
        vehicle: "Car / Manual",
        availability: "Monday - Saturday",
        avatar: "👩‍🏫",
        bio: "Expert exam preparation coach with an exceptionally high first-time student pass rate."
      }
    ]
  }
];

/**
 * Saves driving schools or user booking details to Firebase Firestore.
 * Path: users/{uid}/drivingSchools/schoolsData
 * 
 * @param {Array|Object} data - Driving schools list or booking data object
 */
export const saveBooking = async (data) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("Save Booking Error: No authenticated user found.");
      return;
    }

    const uid = currentUser.uid;
    const docRef = doc(db, "users", uid, "drivingSchools", "schoolsData");

    await setDoc(docRef, {
      schools: data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.log("Error saving driving data to Firebase:", error);
  }
};

/**
 * Fetches driving schools data from Firebase Firestore. 
 * Seeds initial demo academies if no prior document exists in the user's collection.
 * 
 * @returns {Promise<Array>} - List of driving schools and instructors
 */
export const getBooking = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return initialSchoolsData;
    }

    const uid = currentUser.uid;
    const docRef = doc(db, "users", uid, "drivingSchools", "schoolsData");
    const docSnap = await getDocs(query(collection(db, "users", uid, "drivingSchools")));

    // Check if document exists or collection is empty
    if (docSnap.empty) {
      await saveBooking(initialSchoolsData);
      return initialSchoolsData;
    }

    // Find the specific schoolsData doc or map through docs
    let schoolsResult = initialSchoolsData;
    docSnap.forEach((document) => {
      if (document.id === "schoolsData" && document.data().schools) {
        schoolsResult = document.data().schools;
      }
    });

    return schoolsResult;
  } catch (error) {
    console.log("Error fetching driving data from Firebase:", error);
    return initialSchoolsData;
  }
};