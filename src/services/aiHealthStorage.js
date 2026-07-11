import AsyncStorage from "@react-native-async-storage/async-storage";


const AI_HEALTH_KEY =
"autosphere_ai_health_history";



export async function saveHealthReport(report){


try{


const oldData =
await AsyncStorage.getItem(
AI_HEALTH_KEY
);



const history =
oldData
?
JSON.parse(oldData)
:
[];




const newReport={


...report,


id:
Date.now(),


date:
new Date().toISOString()


};




history.unshift(newReport);




// keep latest 20 reports

const updated =
history.slice(0,20);



await AsyncStorage.setItem(

AI_HEALTH_KEY,

JSON.stringify(updated)

);



return true;



}

catch(error){


console.log(
"Health Save Error",
error
);


return false;


}

}







export async function getHealthHistory(){


try{


const data =
await AsyncStorage.getItem(
AI_HEALTH_KEY
);



return data
?
JSON.parse(data)
:
[];


}

catch(error){


return [];


}


}