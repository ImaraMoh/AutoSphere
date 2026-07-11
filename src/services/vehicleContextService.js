import AsyncStorage from "@react-native-async-storage/async-storage";


export async function getVehicleContext(){

try{

const vehicles =
await AsyncStorage.getItem("vehicles");


const maintenance =
await AsyncStorage.getItem("maintenance");


const expenses =
await AsyncStorage.getItem("expenses");


const reminders =
await AsyncStorage.getItem("reminders");



return {

vehicle:
vehicles
?
JSON.parse(vehicles)
:
[],


maintenance:
maintenance
?
JSON.parse(maintenance)
:
[],


expenses:
expenses
?
JSON.parse(expenses)
:
[],


reminders:
reminders
?
JSON.parse(reminders)
:
[]

};


}
catch(error){

console.log(
"Vehicle context error",
error
);

return {};

}

}