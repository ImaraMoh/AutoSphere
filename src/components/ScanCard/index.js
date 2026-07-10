import React from "react";

import {

View,

Text

}

from "react-native";



export default function ScanCard({

item

}){

return(

<View

style={{

padding:20,

backgroundColor:"white",

borderRadius:18,

marginBottom:15

}}

>

<Text

style={{

fontWeight:"700"

}}

>

{item.documentName}

</Text>



<Text>

{item.date}

</Text>


</View>

);

}