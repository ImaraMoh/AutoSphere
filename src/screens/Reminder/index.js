import React,{useState,useCallback} from "react";

import {
View,
Text,
ScrollView,
TouchableOpacity
} from "react-native";


import {
useFocusEffect
} from "@react-navigation/native";


import {
Ionicons
} from "@expo/vector-icons";


import AppHeader from "../../components/AppHeader";


import {
getReminders
} from "../../services/reminderStorage";


import styles from "./styles";


export default function Reminder({navigation}){


const [data,setData]=useState([]);



useFocusEffect(

useCallback(()=>{

load();

},[])

);



const load=async()=>{

setData(await getReminders());

};



return(

<View style={styles.container}>


<AppHeader
title="Smart Reminder"
navigation={navigation}
/>


<ScrollView
contentContainerStyle={{padding:20}}
>


{
data.length===0 ?

<Text>
No reminders
</Text>


:


data.map(item=>(


<View
style={styles.card}
key={item.id}
>


<Ionicons
name="notifications"
size={30}
color="#F97316"
/>


<Text style={styles.title}>
{item.title}
</Text>


<Text>
{item.type}
</Text>


<Text>
Due : {item.date}
</Text>


<Text style={styles.status}>
Upcoming
</Text>


</View>


))


}



<TouchableOpacity
style={styles.button}
onPress={()=>navigation.navigate("AddReminder")}
>


<Text style={styles.buttonText}>
+ Add Reminder
</Text>


</TouchableOpacity>


</ScrollView>


</View>

)

}