import AsyncStorage from "@react-native-async-storage/async-storage";


const PROFILE_KEY="autospehere_profile";



export async function saveProfile(profile){

try{


await AsyncStorage.setItem(

PROFILE_KEY,

JSON.stringify({

...profile,

updatedAt:new Date().toISOString()

})

);


return true;


}

catch(error){

console.log(
"PROFILE SAVE ERROR",
error
);


return false;

}

}







export async function getProfile(){


try{


const data =
await AsyncStorage.getItem(
PROFILE_KEY
);



return data
?
JSON.parse(data)
:
null;



}

catch(error){


console.log(
"PROFILE GET ERROR",
error
);


return null;


}

}