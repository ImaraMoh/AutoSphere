import React from "react";

import {
View,
Text
}
from "react-native";

import {
ShieldCheck,
Calendar,
Car
}
from "lucide-react-native";


export default function InsuranceCard({data}){


return(

<View
style={{
backgroundColor:"#FFFFFF",
borderRadius:22,
padding:20,
marginTop:20,
shadowColor:"#000",
shadowOpacity:0.08,
shadowRadius:10
}}
>


<View
style={{
flexDirection:"row",
alignItems:"center"
}}
>

<ShieldCheck
size={35}
color="#F97316"
/>


<View
style={{
marginLeft:12
}}
>

<Text
style={{
fontSize:18,
fontWeight:"700"
}}
>

{data.provider}

</Text>


<Text
style={{
color:"#16A34A"
}}
>

● Active Policy

</Text>


</View>


</View>



<View
style={{
marginTop:20
}}
>


<View
style={{
flexDirection:"row",
marginBottom:12
}}
>

<Car size={20}/>

<Text
style={{
marginLeft:10
}}
>

{data.vehicle}

</Text>


</View>



<View
style={{
flexDirection:"row"
}}
>

<Calendar size={20}/>

<Text
style={{
marginLeft:10
}}
>

Expiry:
{data.expiryDate}

</Text>


</View>



</View>



</View>

);


}