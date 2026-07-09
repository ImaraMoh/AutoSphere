import React from "react";

import {
View,
Text,
Image,
StyleSheet
}
from "react-native";

import Button from "../../components/Button";


export default function Login({navigation}){


return(

<View
style={styles.container}
>

<View style={styles.logoContainer}>
<Image
source={require("../../assets/logo/logo.png")}
style={styles.logo}
/>
</View>

<Text style={styles.title}>
Welcome to AutoSphere
</Text>


<Button

title="Login"

onPress={()=>navigation.replace("Dashboard")}

/>


</View>

)

}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
padding: 20,
backgroundColor: "#F8FAFC"
},
logoContainer: {
alignItems: "center",
marginBottom: 40
},
logo: {
width: 120,
height: 120,
resizeMode: "contain"
},
title: {
fontSize: 24,
fontWeight: "bold",
textAlign: "center",
marginBottom: 30,
color: "#0D1117"
}
});