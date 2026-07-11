import React from "react";

import {

View,
TextInput,
TouchableOpacity,
Text,
Platform

}
from "react-native";


export default function AIInput({

value,
setValue,
send

}){


function handleKey(e){

if(
e.nativeEvent.key==="Enter"
&&
!e.nativeEvent.shiftKey
){

e.preventDefault();

send();

}

}



return(

<View style={styles.container}>


<TextInput

value={value}

onChangeText={setValue}

placeholder="Ask AutoSphere AI..."

multiline

onKeyPress={(e)=>{


if(
Platform.OS==="web"
&&
e.nativeEvent.key==="Enter"
&&
!e.nativeEvent.shiftKey
){

e.preventDefault();

send();

}


}}

style={styles.input}

/>


<TouchableOpacity

onPress={send}

style={styles.button}

>

<Text>
➤
</Text>

</TouchableOpacity>


</View>


)

}



const styles={


container:{

flexDirection:"row",
backgroundColor:"#fff",
borderRadius:30,
padding:8,
margin:10,
alignItems:"center"

},


input:{

flex:1,
paddingHorizontal:15,
maxHeight:100

},


button:{

backgroundColor:"#F97316",
width:45,
height:45,
borderRadius:25,
alignItems:"center",
justifyContent:"center"

}


}