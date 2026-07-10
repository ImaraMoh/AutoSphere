import AsyncStorage from "@react-native-async-storage/async-storage";
import {
useFocusEffect
}
from "@react-navigation/native";


const KEY="AUTOSPHERE_DOCUMENTS";


export async function getDocuments(){

const data =
await AsyncStorage.getItem(KEY);

return data
?
JSON.parse(data)
:
[];

}



export async function saveDocument(document){

const documents =
await getDocuments();


documents.push(document);


await AsyncStorage.setItem(
KEY,
JSON.stringify(documents)
);


}



export async function updateDocument(updated){


const documents =
await getDocuments();



const newList =
documents.map(item=>

item.id===updated.id
?
updated
:
item

);



await AsyncStorage.setItem(
KEY,
JSON.stringify(newList)
);


}



export async function deleteDocument(id){


const documents =
await getDocuments();



const filtered =
documents.filter(
item=>item.id!==id
);



await AsyncStorage.setItem(
KEY,
JSON.stringify(filtered)
);


}