import AsyncStorage from "@react-native-async-storage/async-storage";


const CHAT_KEY = "autosphere_ai_chat_history";



export async function saveChat(messages){


try{


await AsyncStorage.setItem(

CHAT_KEY,

JSON.stringify(messages)

);


}

catch(error){

console.log(
"Save chat error:",
error
);

}


}





export async function loadChat(){


try{


const data =

await AsyncStorage.getItem(
CHAT_KEY
);



return data
?
JSON.parse(data)
:
[];



}

catch(error){


console.log(
"Load chat error:",
error
);


return [];


}


}





export async function clearChat(){


await AsyncStorage.removeItem(
CHAT_KEY
);


}