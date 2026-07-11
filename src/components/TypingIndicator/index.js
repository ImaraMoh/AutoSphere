import React from "react";

import {
View,
Text
}
from "react-native";


export default function TypingIndicator(){

return(

<View style={styles.container}>

<Text style={styles.robot}>
🤖
</Text>


<Text style={styles.text}>
AutoSphere AI is thinking...
</Text>


</View>

)

}


const styles={

container:{

flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
padding:12,
borderRadius:20,
alignSelf:"flex-start",
margin:10

},


robot:{

fontSize:18,
marginRight:8

},


text:{

color:"#64748B"

}


}