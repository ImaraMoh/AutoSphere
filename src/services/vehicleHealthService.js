export const calculateVehicleHealth=(vehicle)=>{


const mileage =
Number(vehicle.mileage || 0);



let score=100;



// mileage factor

if(mileage>100000){

score-=20;

}
else if(mileage>80000){

score-=10;

}



// service factor

if(vehicle.serviceStatus==="Upcoming"){

score-=5;

}



// insurance

if(vehicle.insuranceStatus!=="Valid"){

score-=10;

}




return {


score,


healthStatus:

score>=80

?

"Excellent Condition"

:

score>=60

?

"Needs Attention"

:

"Critical",



analysis:

score>=80

?

"Vehicle performance is currently healthy."

:

"Vehicle requires maintenance attention.",



maintenancePrediction:

vehicle.serviceStatus || 
"Service analysis pending",



drivingEfficiency:

"Good fuel efficiency",



expenseBehaviour:

"Normal spending pattern",



recommendations:[

"Maintain regular service schedule",

"Check tire pressure"

],


updatedAt:
new Date().toISOString()


};


};