import AsyncStorage from "@react-native-async-storage/async-storage";


const KEY="insurance";


export const saveInsurance = async(data)=>{

await AsyncStorage.setItem(
KEY,
JSON.stringify(data)
);

};



export const getInsurance = async()=>{


const data =
await AsyncStorage.getItem(KEY);


return data ?
JSON.parse(data)
:
null;


};