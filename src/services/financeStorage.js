import AsyncStorage from "@react-native-async-storage/async-storage";


const KEY="finance";


export const saveLoan = async(data)=>{

await AsyncStorage.setItem(
KEY,
JSON.stringify(data)
);

};



export const getLoan = async()=>{


const data =
await AsyncStorage.getItem(KEY);


return data ?
JSON.parse(data)
:
null;


};