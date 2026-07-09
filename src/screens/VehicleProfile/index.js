import React from "react";

import {
View,
Text,
Image
}
from "react-native";



export default function VehicleProfile({route}){


const {vehicle}=route.params;



return(

<View
style={{
padding:20
}}
>


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