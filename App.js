// App.js
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold
} from "@expo-google-fonts/poppins";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_700Bold
} from "@expo-google-fonts/plus-jakarta-sans";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/firebaseConfig";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_700Bold,
  });

  const [firebaseUser, setFirebaseUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Firebase User:", user?.email || "No User");
      setFirebaseUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  if (!fontsLoaded || authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }

  return (
    <AppNavigator 
      user={firebaseUser} 
      key={firebaseUser ? "auth-user" : "auth-guest"} 
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  }
});