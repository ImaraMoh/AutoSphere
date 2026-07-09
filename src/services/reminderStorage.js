import AsyncStorage from "@react-native-async-storage/async-storage";


const REMINDER_KEY = "reminders";


export const saveReminders = async(reminders)=>{

  try{

    await AsyncStorage.setItem(
      REMINDER_KEY,
      JSON.stringify(reminders)
    );

  }
  catch(error){

    console.log(error);

  }

};



export const getReminders = async()=>{

  try{

    const data = await AsyncStorage.getItem(
      REMINDER_KEY
    );


    return data ? JSON.parse(data) : [];

  }
  catch(error){

    console.log(error);

    return [];

  }

};