// src/context/VehicleContext.js
import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

export const VehicleContext = createContext();

export function VehicleProvider({ children }) {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [primaryVehicle, setPrimaryVehicle] = useState(null);
  const [loadingVehicles, setLoadingVehicles] = useState(true);

  const fetchVehicles = async () => {
    try {
      setLoadingVehicles(true);
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const vehicleQuery = query(collection(db, "users", currentUser.uid, "vehicles"));
      const vehicleSnap = await getDocs(vehicleQuery);

      if (!vehicleSnap.empty) {
        const allVehicles = vehicleSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVehiclesList(allVehicles);
        
        // Keep existing primary vehicle if still valid, otherwise default to first
        setPrimaryVehicle(prev => {
          if (prev && allVehicles.some(v => v.id === prev.id)) {
            return allVehicles.find(v => v.id === prev.id);
          }
          return allVehicles[0];
        });
      } else {
        setVehiclesList([]);
        setPrimaryVehicle(null);
      }
    } catch (error) {
      console.log("Error fetching vehicles in context:", error);
    } finally {
      setLoadingVehicles(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <VehicleContext.Provider 
      value={{ 
        vehiclesList, 
        primaryVehicle, 
        setPrimaryVehicle, 
        refreshVehicles: fetchVehicles, 
        loadingVehicles 
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}