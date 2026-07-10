import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY="OCR_DOCUMENTS";



export const saveScan=async(scan)=>{

try{

const existing=await getScans();

existing.unshift(scan);

await AsyncStorage.setItem(

STORAGE_KEY,

JSON.stringify(existing)

);

}catch(error){

console.log(error);

}

};



export const getScans=async()=>{

try{

const data=

await AsyncStorage.getItem(STORAGE_KEY);

return data?

JSON.parse(data)

:[];

}catch(error){

return[];

}

};



export const deleteScan=async(id)=>{

const scans=

await getScans();

const filtered=

scans.filter(item=>item.id!==id);

await AsyncStorage.setItem(

STORAGE_KEY,

JSON.stringify(filtered)

);

};