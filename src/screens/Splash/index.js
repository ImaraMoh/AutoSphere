import React from "react";

import {
View,
Text,
StyleSheet
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