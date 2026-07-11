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



return(

<View

style={

isUser
?
styles.userBubble
:
styles.aiBubble

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


<TouchableOpacity>

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


userBubble:{

backgroundColor:"#F97316",

padding:14,

borderRadius:18,

marginVertical:6,

alignSelf:"flex-end",

maxWidth:"82%"

},


aiBubble:{

backgroundColor:"#FFFFFF",

padding:15,

borderRadius:18,

marginVertical:6,

alignSelf:"flex-start",

maxWidth:"90%",


shadowColor:"#000",

shadowOpacity:.05,

shadowRadius:5,

elevation:2

},


userText:{

color:"#FFFFFF",

fontSize:15

},


actions:{

flexDirection:"row",

gap:18,

marginTop:10,

justifyContent:"flex-end"

}


}