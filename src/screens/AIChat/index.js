import React, {
useState,
useRef,
useEffect
} from "react";


import {

View,
ScrollView,
KeyboardAvoidingView,
Platform,
Alert

}
from "react-native";


import AIHeader 
from "../../components/AIHeader";


import AIQuickActions
from "../../components/AIQuickActions";


import AIMessageBubble
from "../../components/AIMessageBubble";


import AIInput
from "../../components/AIInput";


import TypingIndicator
from "../../components/TypingIndicator";


import {
askVehicleAI
}
from "../../services/aiService";



import styles 
from "./styles";



export default function AIChatScreen(){


const scrollRef = useRef();



const [input,setInput]=useState("");



const [loading,setLoading]=useState(false);



const [messages,setMessages]=useState([

{

id:1,

sender:"ai",

text:

"Hello 👋 I am AutoSphere AI.\n\nAsk me anything about your vehicle maintenance, fuel efficiency, repairs, or expenses."

}

]);




// Auto scroll

useEffect(()=>{


setTimeout(()=>{

scrollRef.current?.scrollToEnd({

animated:true

});


},100);


},[messages,loading]);





async function sendMessage(customText){


const text =
(customText || input).trim();



if(!text)
return;



const userMessage={


id:Date.now(),

sender:"user",

text:text


};



setMessages(prev=>[

...prev,

userMessage

]);



setInput("");

setLoading(true);



try{


const vehicleContext={


vehicle:

"Toyota Corolla 2022",


mileage:

"87000 KM",


fuel:

"Petrol"

};



const response =

await askVehicleAI(

text,

vehicleContext

);




const aiMessage={


id:Date.now()+1,

sender:"ai",

text:response


};



setMessages(prev=>[

...prev,

aiMessage

]);



}

catch(error){


setMessages(prev=>[

...prev,

{

id:Date.now(),

sender:"ai",

text:

"Sorry, I couldn't process your request."

}

]);


}

finally{


setLoading(false);


}


}





function deleteMessage(id){


Alert.alert(

"Delete Message",

"Do you want to remove this message?",

[

{
text:"Cancel"
},

{

text:"Delete",

onPress:()=>{


setMessages(prev=>

prev.filter(

item=>item.id!==id

)

);


}

}

]

);


}





function editMessage(message){


setInput(message);


}





return(


<KeyboardAvoidingView


style={styles.container}


behavior={

Platform.OS==="ios"

?

"padding"

:

undefined

}



>



<AIHeader />



<AIQuickActions


onSelect={(text)=>sendMessage(text)}


/>



<View style={styles.chatContainer}>


<ScrollView


ref={scrollRef}


showsVerticalScrollIndicator={false}


contentContainerStyle={styles.messages}



keyboardShouldPersistTaps="handled"



>


{


messages.map(item=>(



<AIMessageBubble



key={item.id}



message={item.text}



sender={item.sender}



onDelete={()=>deleteMessage(item.id)}



onEdit={()=>editMessage(item.text)}


/>


))


}



{

loading &&

<TypingIndicator/>

}



</ScrollView>



</View>




<AIInput



value={input}



setValue={setInput}



send={()=>sendMessage()}


/>



</KeyboardAvoidingView>


);

}