import React from "react";


import {

View,
Text,
TouchableOpacity

}

from "react-native";


import {

Copy,
Trash2,
Pencil

}

from "lucide-react-native";


import Clipboard from "@react-native-clipboard/clipboard";


import Markdown from
"react-native-markdown-display";




export default function AIMessageBubble({

message,

sender,

onDelete,

onEdit

}){


const isUser =
sender==="user";



function copyText(){

Clipboard.setString(message);

}



return(


<View

style={
isUser
?
styles.user
:
styles.ai
}

>


{
isUser?

<Text style={styles.userText}>

{message}

</Text>


:

<Markdown>

{message}

</Markdown>

}



<View style={styles.actions}>


<TouchableOpacity
onPress={copyText}
>

<Copy
size={16}
color="#64748B"
/>

</TouchableOpacity>



{
isUser &&

<TouchableOpacity
onPress={onEdit}
>

<Pencil
size={16}
color="#64748B"
/>

</TouchableOpacity>

}



<TouchableOpacity
onPress={onDelete}
>

<Trash2
size={16}
color="#DC2626"
/>

</TouchableOpacity>


</View>


</View>


)

}




const styles={


user:{

backgroundColor:"#F97316",

padding:14,

borderRadius:18,

alignSelf:"flex-end",

maxWidth:"80%",

marginVertical:6

},



ai:{

backgroundColor:"#FFFFFF",

padding:14,

borderRadius:18,

alignSelf:"flex-start",

maxWidth:"90%",

marginVertical:6

},



userText:{

color:"#FFFFFF",

fontSize:15

},



actions:{

flexDirection:"row",

justifyContent:"flex-end",

gap:18,

marginTop:10

}


}