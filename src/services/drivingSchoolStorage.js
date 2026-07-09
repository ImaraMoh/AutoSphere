import AsyncStorage from "@react-native-async-storage/async-storage";


const KEY="driving";


export const saveBooking=async(data)=>{


await AsyncStorage.setItem(
KEY,
JSON.stringify(data)
);


};



export const getBooking=async()=>{


const data =
await AsyncStorage.getItem(KEY);


return data ?
JSON.parse(data)
:
null;


};