import React from "react";

import {
View,
Text,
Image,
TouchableOpacity
}
from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function VehicleProfile({route,navigation}){


const {vehicle}=route.params;



return(

<View
style={{
flex:1,
padding:20
}}
>

<View style={{
flexDirection:"row",
alignItems:"center",
gap:10,
marginBottom:20
}}>

<TouchableOpacity onPress={()=>navigation.goBack()}>
<Ionicons name="arrow-back" size={25} color="#0D1117" />
</TouchableOpacity>

<Text
style={{
fontSize:24,
fontWeight:"bold",
flex:1
}}
>
Vehicle Details
</Text>

</View>


{
vehicle.image &&

<Image

source={{
uri:vehicle.image
}}

style={{
height:150,
width:150,
borderRadius:20
}}

/>

}



<Text
style={{
fontSize:28,
fontWeight:"bold"
}}
>

{vehicle.brand} {vehicle.model}

</Text>



<Text>
Year : {vehicle.year}
</Text>


<Text>
Fuel : {vehicle.fuel}
</Text>


<Text>
Mileage : {vehicle.mileage}
</Text>


<Text>
Registration : {vehicle.registration}
</Text>



</View>


)

}