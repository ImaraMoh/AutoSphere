import React from "react";

import {
useFonts,
Poppins_700Bold,
Poppins_600SemiBold
}
from "@expo-google-fonts/poppins";


import {
PlusJakartaSans_400Regular,
PlusJakartaSans_500Medium,
PlusJakartaSans_700Bold
}
from "@expo-google-fonts/plus-jakarta-sans";


import AppNavigator from "./src/navigation/AppNavigator";


export default function App(){


const [loaded]=useFonts({

Poppins_700Bold,
Poppins_600SemiBold,

PlusJakartaSans_400Regular,
PlusJakartaSans_500Medium,
PlusJakartaSans_700Bold,

});


if(!loaded)
return null;



return <AppNavigator/>;


}