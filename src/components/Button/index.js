import React from "react";
import {
 TouchableOpacity,
 Text,
 StyleSheet
} from "react-native";

import {colors,fonts} from "../../theme";


export default function Button({
 title,
 onPress
}){


return(

<TouchableOpacity
onPress={onPress}
style={styles.button}
>

<Text style={styles.text}>
{title}
</Text>


</TouchableOpacity>

)

}



const styles=StyleSheet.create({

button:{
backgroundColor:colors.primary,
padding:16,
borderRadius:14,
alignItems:"center",
},

text:{
color:colors.white,
fontFamily:fonts.bold,
fontSize:16
}


});