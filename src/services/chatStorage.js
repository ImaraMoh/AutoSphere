import AsyncStorage from
"@react-native-async-storage/async-storage";



const KEY="ai_chat_history";



export async function saveChat(messages){


await AsyncStorage.setItem(

KEY,

JSON.stringify(messages)

);


}



export async function loadChat(){


const data =
await AsyncStorage.getItem(KEY);



return data
?
JSON.parse(data)
:
[];


}