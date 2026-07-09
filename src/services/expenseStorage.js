import AsyncStorage from "@react-native-async-storage/async-storage";


const EXPENSE_KEY="vehicle_expenses";


export const saveExpenses = async(expenses)=>{

try{

await AsyncStorage.setItem(
EXPENSE_KEY,
JSON.stringify(expenses)
);

}
catch(error){

console.log(
"Save expense error:",
error
);

}

};



export const getExpenses = async()=>{

try{

const data =
await AsyncStorage.getItem(
EXPENSE_KEY
);


return data ? JSON.parse(data):[];

}
catch(error){

console.log(
"Get expense error:",
error
);

return [];

}

};