export function calculateHealthScore(data){


let score = 100;



const vehicle =
data.vehicle;


const maintenance =
data.maintenance || [];


const expenses =
data.expenses || [];





// Vehicle age penalty

if(vehicle?.year){

const age =
new Date().getFullYear()
-
vehicle.year;


score -= age * 3;


}



// High mileage penalty

if(vehicle?.mileage){

if(vehicle.mileage > 100000){

score -= 20;

}

else if(vehicle.mileage > 70000){

score -= 10;

}


}





// Maintenance history

if(maintenance.length === 0){

score -= 15;

}


if(maintenance.length < 3){

score -= 10;

}





// Expense pattern

if(expenses.length > 10){

score -= 5;

}




if(score < 0)
score = 0;


return score;


}