import AsyncStorage from "@react-native-async-storage/async-storage";



const VEHICLE_KEY="vehicles";



export const saveVehicle = async(vehicle)=>{

try{


const old =
await getVehicles();



const updated=[

...old,

vehicle

];



await AsyncStorage.setItem(

VEHICLE_KEY,

JSON.stringify(updated)

);



return true;


}
catch(error){

console.log(error);

return false;

}

};





export const getVehicles = async()=>{

try{


const data =
await AsyncStorage.getItem(
VEHICLE_KEY
);



return data
?
JSON.parse(data)
:
[];


}
catch(error){

console.log(error);

return [];

}

};





export const deleteVehicle = async(id)=>{


try{


const vehicles =
await getVehicles();



const updated =
vehicles.filter(

item=>

String(item.id)!==String(id)

);



await AsyncStorage.setItem(

VEHICLE_KEY,

JSON.stringify(updated)

);



return true;


}

catch(error){

console.log(error);

return false;

}


};


export const updateVehicle = async(vehicle)=>{

try{

const vehicles =
await getVehicles();


const updated =
vehicles.map(item=>

String(item.id)===String(vehicle.id)

?

vehicle

:

item

);



await AsyncStorage.setItem(

"vehicles",

JSON.stringify(updated)

);



return true;


}

catch(error){

console.log(error);

return false;

}

};