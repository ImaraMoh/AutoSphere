import AsyncStorage from "@react-native-async-storage/async-storage";


const KEY="AUTOSPHERE_DOCUMENTS";


export async function getDocuments(){

const data =
await AsyncStorage.getItem(KEY);

return data
? JSON.parse(data)
: [];

}



export async function saveDocument(document){

const documents =
await getDocuments();


documents.push(document);


await AsyncStorage.setItem(
KEY,
JSON.stringify(documents)
);


return true;

}



export async function deleteDocument(id){

const documents =
await getDocuments();


const updated =
documents.filter(
item=>item.id!==id
);


await AsyncStorage.setItem(
KEY,
JSON.stringify(updated)
);


return true;

}