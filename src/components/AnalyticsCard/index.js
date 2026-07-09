import React from "react";


import {
View,
Text
}
from "react-native";


export default function AnalyticsCard({
title,
value,
icon
}){


return(

<View

style={{

backgroundColor:"#FFFFFF",

padding:20,

borderRadius:20,

marginBottom:15

}}

>


<Text

style={{

fontSize:16

}}

>

{icon} {title}

</Text>



<Text

style={{

fontSize:28,

fontWeight:"800",

marginTop:10

}}

>

{value}

</Text>


</View>


)

}