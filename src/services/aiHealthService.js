import { askVehicleAI } from "./aiService";



export async function analyzeVehicleHealth(data){


try{


const prompt = `

You are AutoSphere AI vehicle expert.

Analyze vehicle health.

Vehicle:

${JSON.stringify(data.vehicle)}


Maintenance:

${JSON.stringify(data.maintenance)}


Expenses:

${JSON.stringify(data.expenses)}

Brand:
${data.vehicle.brand}

Model:
${data.vehicle.model}

Year:
${data.vehicle.year}

Mileage:
${data.vehicle.mileage}


Return ONLY JSON format:

{
"score":85,

"healthStatus":"Excellent Condition",

"maintenancePrediction":
"Oil change recommended within 1500 KM",

"drivingEfficiency":
"Good fuel efficiency",

"expenseBehaviour":
"Fuel expenses increased this month",

"analysis":
"Vehicle is in good condition but service should be planned",

"recommendations":[
"Check tire pressure",
"Schedule oil service"
]

}

`;



const response = await askVehicleAI(prompt);



// remove markdown if Gemini adds it

let cleaned = response
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();




// find JSON only

const start =
cleaned.indexOf("{");


const end =
cleaned.lastIndexOf("}");



if(
start === -1 ||
end === -1
){

throw new Error(
"Invalid AI response"
);

}



cleaned =
cleaned.substring(
start,
end + 1
);





return JSON.parse(text);



}

catch(error){


console.log(
"AI Health Error:",
error.message
);




return {


score:75,


healthStatus:"Good",


analysis:
"Vehicle analysis will update shortly.",


maintenancePrediction:
"Check regular service schedule",


drivingEfficiency:
"Good",


expenseBehaviour:
"Normal",


recommendations:[

"Maintain regular servicing",

"Monitor fuel consumption"

]


};


}

}