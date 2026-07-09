import React from "react";

import {
createNativeStackNavigator
}
from "@react-navigation/native-stack";


import Login from "../screens/Login";
import Splash from "../screens/Splash";


const Stack=createNativeStackNavigator();



export default function AuthNavigator(){


return(

<Stack.Navigator
screenOptions={{
headerShown:false
}}
>

<Stack.Screen
name="Splash"
component={Splash}
/>


<Stack.Screen
name="Login"
component={Login}
/>


</Stack.Navigator>

)


}