import AsyncStorage from "@react-native-async-storage/async-storage";


const SETTINGS_KEY = "autosphere_settings";



const defaultSettings = {

notifications:true,

marketing:false,

maintenanceReminder:true,

fuelAlert:true,

aiRecommendation:true

};





export async function saveSettings(settings){


try{


await AsyncStorage.setItem(

SETTINGS_KEY,

JSON.stringify(settings)

);


return true;


}

catch(error){

console.log(
"SETTINGS SAVE ERROR",
error
);

return false;

}


}







export async function getSettings(){


try{


const data =

await AsyncStorage.getItem(
SETTINGS_KEY
);



return data

?

JSON.parse(data)

:

defaultSettings;



}

catch(error){


return defaultSettings;


}



}