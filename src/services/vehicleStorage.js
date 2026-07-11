import AsyncStorage from "@react-native-async-storage/async-storage";


const VEHICLE_KEY = "AUTOSPHERE_VEHICLES";



export async function saveVehicles(vehicles){

try{

await AsyncStorage.setItem(
VEHICLE_KEY,
JSON.stringify(vehicles)
);

}

catch(error){

console.log(
"Vehicle save error",
error
);

}

}




export async function getVehicles(){

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

console.log(
"Vehicle load error",
error
);


return [];

}


}




export async function addVehicle(vehicle){


const vehicles =
await getVehicles();



const updated=[

...vehicles,

{

id:Date.now(),

...vehicle

}

];



await saveVehicles(updated);



return updated;


}





export async function deleteVehicle(id){


const vehicles =
await getVehicles();



const updated =
vehicles.filter(
item=>item.id!==id
);



await saveVehicles(updated);



return updated;


}