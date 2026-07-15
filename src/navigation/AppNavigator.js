// src/navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabNavigator from "./BottomNavigator";
import Login from "../screens/Login";
import SplashScreen from "../screens/Splash";

const Stack = createNativeStackNavigator();

export default function AppNavigator({ user }) {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={user ? "MainTabs" : "Login"} 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}