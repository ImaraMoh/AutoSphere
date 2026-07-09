import React from "react";
import AddVehicle from "../screens/AddVehicle";
import VehicleProfile from "../screens/VehicleProfile";
import {
createBottomTabNavigator
}
from "@react-navigation/bottom-tabs";

import {
Ionicons
}
from "@expo/vector-icons";


import Dashboard from "../screens/Dashboard";
import Vehicle from "../screens/Vehicle";
import DocumentWallet from "../screens/DocumentWallet";
import AIChat from "../screens/AIChat";
import Profile from "../screens/Profile";


const Tab=createBottomTabNavigator();



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

component={Dashboard}

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

component={Vehicle}

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

component={DocumentWallet}

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

component={Profile}

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