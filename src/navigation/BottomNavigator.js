import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, Easing, Platform } from "react-native";
import AddVehicle from "../screens/AddVehicle";
import VehicleProfile from "../screens/VehicleProfile";
import UploadDocument from "../screens/UploadDocument";
import {
createBottomTabNavigator
}
from "@react-navigation/bottom-tabs";

import {
createNativeStackNavigator
}
from "@react-navigation/native-stack";

import {
Ionicons
}
from "@expo/vector-icons";


import Dashboard from "../screens/Dashboard";
import Vehicles from "../screens/Vehicles";
import DocumentWallet from "../screens/DocumentWallet";
import AIChat from "../screens/AIChat";
import Profile from "../screens/Profile";

import EditVehicle from "../screens/EditVehicle";

import Reminder from "../screens/Reminder";
import AddReminder from "../screens/AddReminder";

import Maintenance from "../screens/Maintenance";
import AddMaintenance from "../screens/AddMaintenance";

import Expenses from "../screens/Expenses";
import AddExpense from "../screens/AddExpense";

import Reports from "../screens/Reports";
import EditProfile from "../screens/EditProfile";
import ChangePassword from "../screens/ChangePassword";
import ConnectedDevices from "../screens/ConnectedDevices";
import Privacy from "../screens/Privacy";
import NotificationSettings from "../screens/NotificationSettings";

import Insurance from "../screens/Insurance";
import RenewInsurance from "../screens/RenewInsurance";
import SubmitClaim from "../screens/SubmitClaim";

import Finance from "../screens/Finance";
import EMICalculator from "../screens/EMICalculator";
import LoanApplication from "../screens/LoanApplication";
import PaymentSchedule from "../screens/PaymentSchedule";

import DrivingSchool from "../screens/DrivingSchool";
import InstructorDetails from "../screens/InstructorDetails";
import BookLesson from "../screens/BookLesson";
import LearningProgress from "../screens/LearningProgress";

import Notifications from "../screens/Notifications";
import NotificationDetails from "../screens/NotificationDetails";

import OCRScanner from "../screens/OCRScanner";
import ScanPreview from "../screens/ScanPreview";
import ScanHistory from "../screens/ScanHistory";

import DocumentAutoFill from "../screens/DocumentAutoFill";
import DocumentDetails from "../screens/DocumentDetails";
import EditDocument from "../screens/EditDocument";
import DocumentPreview from "../screens/DocumentPreview";

const Tab=createBottomTabNavigator();
const Stack=createNativeStackNavigator();


// Home Stack Navigator
function HomeStackNavigator(){
return(
<Stack.Navigator screenOptions={{headerShown:false}}>
<Stack.Screen name="DashboardMain" component={Dashboard} />
<Stack.Screen name="Reminder" component={Reminder} />
<Stack.Screen name="AddReminder" component={AddReminder} />
<Stack.Screen name="Maintenance" component={Maintenance} />
<Stack.Screen name="AddMaintenance" component={AddMaintenance} />
<Stack.Screen name="Expenses" component={Expenses} />
<Stack.Screen name="AddExpense" component={AddExpense} />
<Stack.Screen name="Reports" component={Reports} />
<Stack.Screen name="Insurance" component={Insurance} />
<Stack.Screen name="RenewInsurance" component={RenewInsurance} />
<Stack.Screen name="SubmitClaim" component={SubmitClaim} />
<Stack.Screen name="Finance" component={Finance} />
<Stack.Screen name="EMICalculator" component={EMICalculator} />
<Stack.Screen name="LoanApplication" component={LoanApplication} />
<Stack.Screen name="PaymentSchedule" component={PaymentSchedule} />
<Stack.Screen name="DrivingSchool" component={DrivingSchool} />
<Stack.Screen name="InstructorDetails" component={InstructorDetails} />
<Stack.Screen name="BookLesson" component={BookLesson} />
<Stack.Screen name="LearningProgress" component={LearningProgress} />
<Stack.Screen name="Notifications" component={Notifications} />
<Stack.Screen name="NotificationDetails" component={NotificationDetails} />
<Stack.Screen name="OCRScanner" component={OCRScanner}/>
<Stack.Screen name="ScanPreview" component={ScanPreview}/>
<Stack.Screen name="ScanHistory" component={ScanHistory}/>
</Stack.Navigator>
);
}

// Vehicles Stack Navigator
function VehiclesStackNavigator(){
return(
<Stack.Navigator screenOptions={{headerShown:false}}>
<Stack.Screen name="VehicleMain" component={Vehicles} />
<Stack.Screen name="AddVehicle" component={AddVehicle} />
<Stack.Screen name="VehicleProfile" component={VehicleProfile} />

<Stack.Screen name="EditVehicle" component={EditVehicle} />
</Stack.Navigator>
);
}

// Documents Stack Navigator
function DocumentsStackNavigator(){

return(

<Stack.Navigator

screenOptions={{
headerShown:false
}}

>


<Stack.Screen

name="DocumentWalletMain"

component={DocumentWallet}

/>



<Stack.Screen

name="UploadDocument"

component={UploadDocument}

/>



<Stack.Screen
name="DocumentAutoFill"
component={DocumentAutoFill}
/>

<Stack.Screen

name="DocumentDetails"

component={DocumentDetails}

/>



<Stack.Screen

name="EditDocument"

component={EditDocument}

/>



<Stack.Screen

name="DocumentPreview"
component={DocumentPreview}

/>

</Stack.Navigator>

);

}

// Profile Stack Navigator
function ProfileStackNavigator(){
return(
<Stack.Navigator screenOptions={{headerShown:false}}>
<Stack.Screen name="Profile" component={Profile} />
<Stack.Screen name="EditProfile" component={EditProfile} />
<Stack.Screen name="ChangePassword" component={ChangePassword} />
<Stack.Screen name="ConnectedDevices" component={ConnectedDevices} />
<Stack.Screen name="Privacy" component={Privacy} />
<Stack.Screen name="NotificationSettings" component={NotificationSettings} />
</Stack.Navigator>
);
}

// --- Animated Custom Center AI Button Component ---
function AnimatedAIButton({ accessibilityState, onPress, focused: isTabFocused }) {
  const focused = accessibilityState?.selected || isTabFocused;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: Platform.OS !== "web",
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  return (
    // Balanced centered wrapper shell
    <View style={styles.centerTabWrapper}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.aiButtonContainer}
      >
        <Animated.View
          style={[
            styles.aiPulseRing,
            {
              transform: [{ scale: pulseAnim }],
              opacity: focused ? 0.4 : 0.15,
              borderColor: focused ? "#EA580C" : "#F97316",
            },
          ]}
        />
        <View style={[styles.aiCoreOrb, focused && styles.aiCoreOrbActive]}>
          <Ionicons name="sparkles" color="#FFFFFF" size={26} />
        </View>
      </TouchableOpacity>
    </View>
  );
}


export default function BottomNavigator(){


return(

<Tab.Navigator

screenOptions={{

headerShown:false,

tabBarActiveTintColor:"#F97316",

tabBarInactiveTintColor:"#6B7280",

tabBarStyle:{
height:75,
paddingBottom:12,
paddingTop:10,
backgroundColor: "#FFFFFF",
borderTopWidth: 1,
borderTopColor: "#E2E8F0"
}

}}

>


<Tab.Screen

name="Home"

component={HomeStackNavigator}

options={{

tabBarIcon:({color,size,focused})=>(

<Ionicons
name={focused ? "home" : "home-outline"}
color={color}
size={size}
/>

)

}}

/>



<Tab.Screen

name="Vehicles"

component={VehiclesStackNavigator}

options={{

tabBarIcon:({color,size,focused})=>(

<Ionicons
name={focused ? "car" : "car-outline"}
color={color}
size={size}
/>

)

}}

/>



<Tab.Screen

name="AI"

component={AIChat}

options={{
  tabBarLabel: "AutoAI",
  tabBarButton: (props) => (
    <AnimatedAIButton 
      {...props} 
      focused={props.accessibilityState?.selected} 
    />
  ),
}}

/>

<Tab.Screen

name="Documents"

component={DocumentsStackNavigator}

options={{

tabBarIcon:({color,size,focused})=>(

<Ionicons
name={focused ? "document-text" : "document-text-outline"}
color={color}
size={size}
/>

)

}}

/>



<Tab.Screen

name="Profile"

component={ProfileStackNavigator}

options={{

tabBarIcon:({color,size,focused})=>(

<Ionicons
name={focused ? "person" : "person-outline"}
color={color}
size={size}
/>

)

}}

/>


</Tab.Navigator>


)

}

const styles = StyleSheet.create({
  // New style added here to keep the absolute button explicitly inside the flex grid center
  centerTabWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  aiButtonContainer: {
    position: "absolute",
    top: -30, // Perfectly balances the elevated look out of the tab line
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
  },
  aiPulseRing: {
    position: "absolute",
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    backgroundColor: "transparent",
  },
  aiCoreOrb: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  aiCoreOrbActive: {
    backgroundColor: "#EA580C",
  },
});