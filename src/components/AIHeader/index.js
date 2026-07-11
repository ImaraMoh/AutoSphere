import React from "react";

import {
View,
Text
}
from "react-native";


export default function AIHeader(){

return(

<View style={styles.container}>


<View style={styles.avatar}>

<Text>
🤖
</Text>

</View>


<View>

<Text style={styles.title}>
AutoSphere AI
</Text>


<Text style={styles.sub}>
Your Vehicle Intelligence Assistant
</Text>


</View>


</View>

)

}


const styles={


container:{

flexDirection:"row",
alignItems:"center",
padding:15,
backgroundColor:"#0D1117"

},


avatar:{

width:45,
height:45,
borderRadius:25,
backgroundColor:"#F97316",
alignItems:"center",
justifyContent:"center",
marginRight:12

},


title:{

color:"#fff",
fontSize:18,
fontWeight:"700"

},


sub:{

color:"#CBD5E1",
fontSize:12

}


}