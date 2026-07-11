import AsyncStorage from 
"@react-native-async-storage/async-storage";



const AI_HEALTH_KEY =
"AUTOSPHERE_AI_HEALTH";



const AI_TIME_KEY =
"AUTOSPHERE_AI_HEALTH_TIME";





export async function saveAIHealth(data){


try{


await AsyncStorage.setItem(

AI_HEALTH_KEY,

JSON.stringify(data)

);



await AsyncStorage.setItem(

AI_TIME_KEY,

Date.now().toString()

);



}

catch(error){

console.log(
"AI Cache Save Error",
error
);

}


}







export async function getAIHealth(){


try{


const data =
await AsyncStorage.getItem(
AI_HEALTH_KEY
);



if(!data)
return null;



return JSON.parse(data);



}

catch(error){


console.log(
"AI Cache Read Error",
error
);


return null;


}

}









export async function getAIHealthTime(){


const time =
await AsyncStorage.getItem(
AI_TIME_KEY
);



return time
?
Number(time)
:
null;


}






export async function clearAIHealth(){


await AsyncStorage.removeItem(
AI_HEALTH_KEY
);


await AsyncStorage.removeItem(
AI_TIME_KEY
);


}