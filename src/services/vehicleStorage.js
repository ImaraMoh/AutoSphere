// src/services/vehicleStorage.js

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

import { auth, db } from "../firebase/firebaseConfig";


// Get current user
const getCurrentUserId = () => {

  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  return user.uid;

};



// ===============================
// ADD VEHICLE
// ===============================

export const saveVehicle = async(vehicle)=>{

  try{

    const uid = getCurrentUserId();


    const vehicleRef = collection(
      db,
      "users",
      uid,
      "vehicles"
    );


    const docRef = await addDoc(
      vehicleRef,
      {
        ...vehicle,

        createdAt:
        serverTimestamp(),

        updatedAt:
        serverTimestamp()
      }
    );


    return {

      success:true,

      id:docRef.id

    };


  }

  catch(error){

    console.log(
      "Save Vehicle Error:",
      error
    );


    return {

      success:false,

      error

    };

  }

};




// ===============================
// GET ALL VEHICLES
// ===============================

export const getVehicles = async()=>{


  try{


    const uid =
    getCurrentUserId();



    const vehicleRef =
    collection(
      db,
      "users",
      uid,
      "vehicles"
    );



    const q =
    query(
      vehicleRef,
      orderBy(
        "createdAt",
        "desc"
      )
    );



    const snapshot =
    await getDocs(q);



    const vehicles =
    snapshot.docs.map(item=>({

      id:item.id,

      ...item.data()

    }));



    return vehicles;



  }

  catch(error){

    console.log(
      "Get Vehicles Error:",
      error
    );


    return [];

  }


};





// ===============================
// UPDATE VEHICLE
// ===============================

export const updateVehicle = async(vehicle)=>{


  try{


    const uid =
    getCurrentUserId();



    const vehicleDoc =
    doc(
      db,
      "users",
      uid,
      "vehicles",
      vehicle.id
    );



    await updateDoc(

      vehicleDoc,

      {

        ...vehicle,

        updatedAt:
        serverTimestamp()

      }

    );



    return true;


  }

  catch(error){


    console.log(
      "Update Vehicle Error:",
      error
    );


    return false;


  }


};






// ===============================
// DELETE VEHICLE
// ===============================

export const deleteVehicle = async(vehicleId)=>{


  try{


    const uid =
    getCurrentUserId();



    const vehicleDoc =
    doc(

      db,

      "users",

      uid,

      "vehicles",

      vehicleId

    );



    await deleteDoc(vehicleDoc);



    return true;



  }

  catch(error){


    console.log(
      "Delete Vehicle Error:",
      error
    );


    return false;


  }


};