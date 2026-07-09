import React from "react";
import UploadDocument from "../screens/UploadDocument";
import {
NavigationContainer
}
from "@react-navigation/native";
import Reminder from "../screens/Reminder";
import AddReminder from "../screens/AddReminder";

import Maintenance from "../screens/Maintenance";
import AddMaintenance from "../screens/AddMaintenance";

import Expenses from "../screens/Expenses";
import AddExpense from "../screens/AddExpense";

import Reports from "../screens/Reports";
import AIChat from "../screens/AIChat";
import EditProfile from "../screens/EditProfile";
import ChangePassword from "../screens/ChangePassword";
import ConnectedDevices from "../screens/ConnectedDevices";
import Privacy from "../screens/Privacy";
import NotificationSettings from "../screens/NotificationSettings";
import {
createNativeStackNavigator
}
from "@react-navigation/native-stack";


import BottomNavigator from "./BottomNavigator";


import AddVehicle from "../screens/AddVehicle";

import VehicleProfile from "../screens/VehicleProfile";
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

import NotificationDetails 
from "../screens/NotificationDetails";

const Stack=createNativeStackNavigator();



export default function AppNavigator(){


return(

<NavigationContainer>


<Stack.Navigator
screenOptions={{
headerShown:false
}}
>


<Stack.Screen

name="Main"

component={BottomNavigator}

/>


<Stack.Screen

name="AddVehicle"

component={AddVehicle}

/>


<Stack.Screen

name="VehicleProfile"

component={VehicleProfile}

/>

<Stack.Screen

name="UploadDocument"

component={UploadDocument}

/>

<Stack.Screen
name="Reminder"
component={Reminder}
/>

<Stack.Screen
name="AddReminder"
component={AddReminder}
/>


<Stack.Screen
name="Maintenance"
component={Maintenance}
/>


<Stack.Screen
name="AddMaintenance"
component={AddMaintenance}
/>

<Stack.Screen
name="Expenses"
component={Expenses}
/>


<Stack.Screen
name="AddExpense"
component={AddExpense}
/>

<Stack.Screen
name="Reports"
component={Reports}
/>

<Stack.Screen
name="AIChat"
component={AIChat}
/>

<Stack.Screen
	name="EditProfile"
	component={EditProfile}
/>

<Stack.Screen
	name="ChangePassword"
	component={ChangePassword}
/>

<Stack.Screen
	name="ConnectedDevices"
	component={ConnectedDevices}
/>

<Stack.Screen
	name="Privacy"
	component={Privacy}
/>

<Stack.Screen
	name="NotificationSettings"
	component={NotificationSettings}
/>

<Stack.Screen
name="Insurance"
component={Insurance}
/>


<Stack.Screen
name="RenewInsurance"
component={RenewInsurance}
/>


<Stack.Screen
name="SubmitClaim"
component={SubmitClaim}
/>

<Stack.Screen
name="Finance"
component={Finance}
/>


<Stack.Screen
name="EMICalculator"
component={EMICalculator}
/>


<Stack.Screen
name="LoanApplication"
component={LoanApplication}
/>


<Stack.Screen
name="PaymentSchedule"
component={PaymentSchedule}
/>

<Stack.Screen
name="DrivingSchool"
component={DrivingSchool}
/>


<Stack.Screen
name="InstructorDetails"
component={InstructorDetails}
/>


<Stack.Screen
name="BookLesson"
component={BookLesson}
/>


<Stack.Screen
name="LearningProgress"
component={LearningProgress}
/>

<Stack.Screen

name="Notifications"

component={Notifications}

/>



<Stack.Screen

name="NotificationDetails"

component={NotificationDetails}

/>

</Stack.Navigator>



</NavigationContainer>


)

}