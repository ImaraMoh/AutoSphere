import React from "react";

import {
View,
Text,
StyleSheet,
Image
}
from "react-native";


import {
colors,
fonts
}
from "../../theme";


export default function Splash({navigation}){


setTimeout(()=>{

navigation.replace("Login")

},2000);



return(

<View style={styles.container}>

<Image
source={require("../../assets/logo/logo.png")}
style={styles.appLogo}
/>

<Text style={styles.logo}>
AutoSphere
</Text>


<Text style={styles.tag}>
Vehicle Life Management AI Assistant
</Text>


</View>


)


}



const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:colors.primary,
justifyContent:"center",
alignItems:"center"
},

appLogo:{
width:100,
height:100,
resizeMode:"contain",
marginBottom:20
},

logo:{
fontSize:40,
color:colors.white,
fontFamily:fonts.heading
},


tag:{
color:colors.white,
marginTop:10,
fontFamily:fonts.body
}


})