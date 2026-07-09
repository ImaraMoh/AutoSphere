import React from "react";

import {
View,
StyleSheet
} from "react-native";

import {
colors
} from "../../theme";


export default function Card({children}){


return(

<View style={styles.card}>

{children}

</View>

)

}



const styles=StyleSheet.create({

card:{
backgroundColor:colors.white,
borderRadius:20,
padding:16,
marginVertical:8,

shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:10,
elevation:3

}

});