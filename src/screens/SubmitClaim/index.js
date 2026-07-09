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


export default function SubmitClaim(){


const [description,setDescription]=useState("");



return(

<View
style={{
padding:20
}}
>


<Text
style={{
fontSize:24,
fontWeight:"700"
}}
>

Submit Claim

</Text>



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