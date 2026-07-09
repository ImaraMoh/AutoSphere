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

import {
createNativeStackNavigator
}
from "@react-navigation/native-stack";


import BottomNavigator from "./BottomNavigator";


import AddVehicle from "../screens/AddVehicle";

import VehicleProfile from "../screens/VehicleProfile";


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


</Stack.Navigator>



</NavigationContainer>


)

}