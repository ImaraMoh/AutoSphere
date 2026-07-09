import AsyncStorage from "@react-native-async-storage/async-storage";


const MAINTENANCE_KEY="maintenance";


export const saveMaintenance=async(data)=>{

await AsyncStorage.setItem(

MAINTENANCE_KEY,

JSON.stringify(data)

);

};



export const getMaintenance=async()=>{


const data=

await AsyncStorage.getItem(
MAINTENANCE_KEY
);



return data ? JSON.parse(data):[];


};