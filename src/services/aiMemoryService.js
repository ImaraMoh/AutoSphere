import {
askVehicleAI
}
from "./aiService";


import {
buildAIContext
}
from "../utils/aiContextBuilder";




export async function askAutoSphereAI(question){


const context =
await buildAIContext();




const response =
await askVehicleAI(

question,

context

);



return response;


}