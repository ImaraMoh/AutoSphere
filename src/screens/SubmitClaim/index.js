import React,{
useState
}
from "react";


import {
View,
TextInput,
TouchableOpacity,
Text
}
from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SubmitClaim({navigation}){


const [description,setDescription]=useState("");



return(

<View
style={{
flex:1,
padding:20
}}
>

<View style={{
flexDirection:"row",
alignItems:"center",
gap:10,
marginBottom:20
}}>

<TouchableOpacity onPress={()=>navigation.goBack()}>
<Ionicons name="arrow-back" size={25} color="#0D1117" />
</TouchableOpacity>

<Text
style={{
fontSize:24,
fontWeight:"700"
}}
>
Submit Claim
</Text>

</View>



<TextInput

placeholder="Describe accident or damage"

multiline

value={description}

onChangeText={setDescription}

style={{
borderWidth:1,
height:120,
marginTop:20,
padding:10
}}

/>



<TouchableOpacity

style={{
backgroundColor:"#F97316",
padding:15,
marginTop:20
}}

>

<Text>
Submit Claim
</Text>

</TouchableOpacity>



</View>


);


}