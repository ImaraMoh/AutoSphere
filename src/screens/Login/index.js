import React from "react";

import {
View,
Text
}
from "react-native";

import Button from "../../components/Button";


export default function Login({navigation}){


return(

<View
style={{
flex:1,
justifyContent:"center",
padding:20
}}
>


<Text>
Welcome to AutoSphere
</Text>


<Button

title="Login"

onPress={()=>navigation.replace("Dashboard")}

/>


</View>

)


}