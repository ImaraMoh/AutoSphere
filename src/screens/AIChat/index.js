import React,{
useState
}
from "react";


import {
View,
TextInput,
TouchableOpacity,
Text,
FlatList
}
from "react-native";


import ChatBubble from "../../components/ChatBubble";

import {
askVehicleAI
}
from "../../services/aiService";


import styles from "./styles";



export default function AIChat(){


const [message,setMessage]=useState("");

const [chat,setChat]=useState([

{
id:"1",
text:
"Hello 👋 I am AutoSphere AI Assistant. How can I help with your vehicle?",
user:false
}

]);



const sendMessage=async()=>{


if(!message.trim())
return;



const userMessage={

id:Date.now().toString(),

text:message,

user:true

};


setChat(prev=>[
...prev,
userMessage
]);



const response =
await askVehicleAI(message);



setChat(prev=>[

...prev,

{
id:
Date.now()+1,
text:response,
user:false
}

]);



setMessage("");

};



return(

<View style={styles.container}>


<Text style={styles.title}>

🤖 AutoSphere AI Assistant

</Text>



<FlatList

data={chat}

keyExtractor={
item=>item.id
}

renderItem={({item})=>(

<ChatBubble

message={item.text}

user={item.user}

/>

)}

/>



<View style={styles.inputContainer}>


<TextInput

value={message}

onChangeText={setMessage}

placeholder=
"Ask about your vehicle..."

style={styles.input}

/>



<TouchableOpacity

onPress={sendMessage}

style={styles.button}

>

<Text>

Send

</Text>

</TouchableOpacity>



</View>


</View>

);


}