import React from "react";


import {

View,
Text

}

from "react-native";



export default function AIStreamingMessage({
text
}){


return(

<View style={styles.container}>


<View style={styles.avatar}>

<Text>
🤖
</Text>

</View>



<View style={styles.message}>


<Text style={styles.text}>

{text}

<Text>
▋
</Text>


</Text>


</View>


</View>


)

}



const styles={


container:{

flexDirection:"row",

alignItems:"flex-start",

marginVertical:8,

paddingHorizontal:12

},


avatar:{

width:35,

height:35,

borderRadius:20,

backgroundColor:"#F97316",

alignItems:"center",

justifyContent:"center",

marginRight:8

},



message:{


backgroundColor:"#fff",

padding:14,

borderRadius:18,

maxWidth:"85%"

},



text:{


fontSize:15,

color:"#1F2937"

}


}