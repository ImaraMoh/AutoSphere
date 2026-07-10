import React from "react";

import {
View,
Text,
TouchableOpacity
}
from "react-native";


import {
FileText,
Trash2
}
from "lucide-react-native";


export default function DocumentCard({
item,
onPress,
onDelete
}){


return(

<TouchableOpacity

onPress={onPress}

style={{

backgroundColor:"#fff",

padding:15,

borderRadius:15,

marginBottom:12,

flexDirection:"row",

alignItems:"center"

}}

>


<FileText
color="#F97316"
/>


<View style={{flex:1,marginLeft:15}}>


<Text
style={{
fontWeight:"700"
}}
>

{item.title}

</Text>


<Text>
{item.type}
</Text>


<Text>

Expiry:
{item.expiryDate || "No expiry"}

</Text>


</View>



<TouchableOpacity
onPress={onDelete}
>

<Trash2
color="red"
/>

</TouchableOpacity>



</TouchableOpacity>

);

}