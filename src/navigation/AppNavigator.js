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

</Stack.Navigator>



</NavigationContainer>


)

}