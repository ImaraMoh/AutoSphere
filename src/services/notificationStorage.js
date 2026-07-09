import AsyncStorage from "@react-native-async-storage/async-storage";


const KEY="notifications";



export const saveNotifications=async(data)=>{


await AsyncStorage.setItem(
KEY,
JSON.stringify(data)
);


};



export const getNotifications=async()=>{


const data=
await AsyncStorage.getItem(KEY);



return data ?
JSON.parse(data)
:
[];


};



export const clearNotifications=async()=>{


await AsyncStorage.removeItem(KEY);


};