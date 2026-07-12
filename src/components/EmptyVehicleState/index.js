import React from "react";

import {
View,
Text,
TouchableOpacity
} from "react-native";

import {
Ionicons
} from "@expo/vector-icons";

export default function EmptyVehicleState({

onPress

}){

return(

<View
style={{
alignItems:"center",
paddingVertical:80,
paddingHorizontal:30
}}
>

<Ionicons

name="car-sport"

size={85}

color="#F97316"

/>

<Text
style={{
fontSize:25,
fontWeight:"700",
marginTop:25
}}
>
No Vehicles
</Text>

<Text
style={{
textAlign:"center",
marginTop:10,
color:"#64748B",
fontSize:15,
lineHeight:23
}}
>

Start building your digital garage by adding your first vehicle.

</Text>

<TouchableOpacity

style={{

marginTop:30,

backgroundColor:"#F97316",

paddingHorizontal:30,

paddingVertical:14,

borderRadius:50

}}

onPress={onPress}

>

<Text
style={{
color:"white",
fontWeight:"700"
}}
>

+ Add Vehicle

</Text>

</TouchableOpacity>

</View>

)

}