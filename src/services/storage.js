import AsyncStorage from "@react-native-async-storage/async-storage";


export const saveVehicle = async(vehicle)=>{

try{

await AsyncStorage.setItem(
"vehicle",
JSON.stringify(vehicle)
);

}

catch(error){

console.log(error);

}

}



export const getVehicle = async()=>{

try{

const data = await AsyncStorage.getItem("vehicle");

return data ? JSON.parse(data) : null;

}

catch(error){

console.log(error);

return null;

}

}