import React,{
useEffect,
useState
}
from "react";


import {
View,
Text,
FlatList,
TouchableOpacity
}
from "react-native";


import {
ChevronLeft
}
from "lucide-react-native";


import NotificationCard from "../../components/NotificationCard";


import styles from "./styles";



export default function Notifications({
navigation
}){


const [notifications,setNotifications]=useState([]);



useEffect(()=>{


loadNotifications();


},[]);



const loadNotifications=()=>{


setNotifications([

{
id:"1",
title:"Insurance Expiring Soon",
message:
"Your insurance expires in 7 days",
type:"Insurance",
priority:"High"
},


{
id:"2",
title:"Service Reminder",
message:
"Vehicle service due after 500 KM",
type:"Maintenance",
priority:"Medium"
},


{
id:"3",
title:"EMI Payment",
message:
"Your finance payment is due tomorrow",
type:"Finance",
priority:"High"
}


]);


};



return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft size={30}/>

</TouchableOpacity>


<Text style={styles.title}>
Notifications
</Text>


</View>




<View style={styles.banner}>


<Text style={styles.bannerTitle}>
🔔 Smart Vehicle Alerts
</Text>


<Text style={styles.bannerText}>
Never miss important vehicle updates
</Text>


</View>




<FlatList

data={notifications}

keyExtractor={
item=>item.id
}

renderItem={({item})=>(

<NotificationCard

item={item}

onPress={()=>
navigation.navigate(
"NotificationDetails",
{
item
}
)
}

/>

)}

/>



</View>

);


}