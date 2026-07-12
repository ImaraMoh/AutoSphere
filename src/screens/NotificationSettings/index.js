import React,{
useEffect,
useState
}
from "react";


import {

View,
Text,
Switch,
TouchableOpacity

}
from "react-native";


import {
Ionicons
}
from "@expo/vector-icons";


import {

getSettings,
saveSettings

}
from "../../services/settingsStorage";


import styles from "./styles";



export default function NotificationSettings({
navigation
}){


const [settings,setSettings]
=
useState(null);



useEffect(()=>{

load();

},[]);




async function load(){

const data =
await getSettings();


setSettings(data);

}



async function toggle(key,value){


const updated={

...settings,

[key]:value

};


setSettings(updated);


await saveSettings(updated);


}



if(!settings)
return null;




return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<Ionicons

name="arrow-back"

size={25}

color="#0F172A"

/>


</TouchableOpacity>


<Text style={styles.title}>
Notification Settings
</Text>


</View>






<Option

title="Maintenance Reminder"

value={
settings.maintenanceReminder
}

onChange={(v)=>
toggle(
"maintenanceReminder",
v
)
}

/>




<Option

title="Fuel Alerts"

value={
settings.fuelAlert
}

onChange={(v)=>
toggle(
"fuelAlert",
v
)
}

/>




<Option

title="AI Recommendations"

value={
settings.aiRecommendation
}

onChange={(v)=>
toggle(
"aiRecommendation",
v
)
}

/>




</View>


)


}




function Option({
title,
value,
onChange
}){


return(

<View style={styles.row}>


<Text style={styles.text}>
{title}
</Text>


<Switch

value={value}

onValueChange={onChange}

/>


</View>


)

}