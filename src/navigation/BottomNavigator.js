import React from "react";
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
import Vehicle from "../screens/Vehicle";
import DocumentWallet from "../screens/DocumentWallet";
import AIChat from "../screens/AIChat";
import Profile from "../screens/Profile";

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
import AddDocument from "../screens/AddDocument";
import DocumentDetails from "../screens/DocumentDetails";

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
<Stack.Screen name="DocumentAutoFill" component={DocumentAutoFill} />
<Stack.Screen name="DocumentWallet" component={DocumentWallet} />
<Stack.Screen name="AddDocument" component={AddDocument} />
<Stack.Screen name="DocumentDetails" component={DocumentDetails} />
</Stack.Navigator>
);
}

// Vehicles Stack Navigator
function VehiclesStackNavigator(){
return(
<Stack.Navigator screenOptions={{headerShown:false}}>
<Stack.Screen name="VehicleMain" component={Vehicle} />
<Stack.Screen name="AddVehicle" component={AddVehicle} />
<Stack.Screen name="VehicleProfile" component={VehicleProfile} />
</Stack.Navigator>
);
}

// Documents Stack Navigator
function DocumentsStackNavigator(){
return(
<Stack.Navigator screenOptions={{headerShown:false}}>
<Stack.Screen name="DocumentWalletMain" component={DocumentWallet} />
<Stack.Screen name="UploadDocument" component={UploadDocument} />
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



export default function BottomNavigator(){


return(

<Tab.Navigator

screenOptions={{

headerShown:false,

tabBarActiveTintColor:"#F97316",

tabBarInactiveTintColor:"#6B7280",

tabBarStyle:{
height:70,
paddingBottom:10,
paddingTop:10
}

}}

>


<Tab.Screen

name="Home"

component={HomeStackNavigator}

options={{

tabBarIcon:({color,size})=>(

<Ionicons
name="home"
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

tabBarIcon:({color,size})=>(

<Ionicons
name="car"
color={color}
size={size}
/>

)

}}

/>



<Tab.Screen

name="Documents"

component={DocumentsStackNavigator}

options={{

tabBarIcon:({color,size})=>(

<Ionicons
name="document-text"
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

tabBarIcon:({color,size})=>(

<Ionicons
name="sparkles"
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

tabBarIcon:({color,size})=>(

<Ionicons
name="person"
color={color}
size={size}
/>

)

}}

/>


</Tab.Navigator>


)

}