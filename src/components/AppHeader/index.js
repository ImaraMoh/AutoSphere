import React from "react";

import {
View,
Text,
TouchableOpacity,
StyleSheet
} from "react-native";

import {
Ionicons
} from "@expo/vector-icons";


export default function AppHeader({
title,
navigation,
showBack=true
}){

return(

<View style={styles.container}>


{
showBack &&

<TouchableOpacity
onPress={()=>navigation.goBack()}
style={styles.back}
>

<Ionicons
name="arrow-back"
size={25}
color="#0D1117"
/>

</TouchableOpacity>

}



<Text style={styles.title}>
{title}
</Text>


</View>

)

}


const styles=StyleSheet.create({

container:{
height:65,
flexDirection:"row",
alignItems:"center",
paddingHorizontal:20,
backgroundColor:"#FFFFFF"
},


back:{
marginRight:15
},


title:{
fontSize:22,
fontWeight:"700",
color:"#0D1117"
}

});