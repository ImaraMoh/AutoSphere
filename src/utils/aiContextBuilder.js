import {
getVehicles
}
from "../services/vehicleStorage";


import {
getMaintenance
}
from "../services/maintenanceStorage";


import {
getExpenses
}
from "../services/expenseStorage";


import {
getDocuments
}
from "../services/documentStorage";


import {
getReminders
}
from "../services/reminderStorage";




export async function buildAIContext(){


try{


const vehicles =
await getVehicles();


const maintenance =
await getMaintenance();


const expenses =
await getExpenses();


const documents =
await getDocuments();


const reminders =
await getReminders();





return {


vehicles,


maintenance,


expenses,


documents,


reminders


};



}

catch(error){


console.log(
"AI Context Error",
error
);



return {

vehicles:[],

maintenance:[],

expenses:[],

documents:[],

reminders:[]

};


}


}