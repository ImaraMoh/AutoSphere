import React from "react";


import {
View,
Text
}
from "react-native";


export default function HealthScore({score}){


return(

<View

style={{

backgroundColor:"#FFFFFF",

height:160,

borderRadius:80,

justifyContent:"center",

alignItems:"center"

}}

>


<Text

style={{

fontSize:40,

fontWeight:"800",

color:"#16A34A"

}}

>

{score}%

</Text>



<Text>
Vehicle Health
</Text>


</View>

)

}