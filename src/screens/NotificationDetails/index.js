import React from "react";


import {
View,
Text,
TouchableOpacity
}
from "react-native";


import {
ChevronLeft
}
from "lucide-react-native";


import styles from "./styles";


export default function NotificationDetails({
route,
navigation
}){


const item = route?.params?.item || {};



return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft size={30}/>

</TouchableOpacity>


<Text style={styles.title}>
Alert Details
</Text>


</View>




<View style={styles.card}>


<Text style={styles.icon}>
🔔
</Text>



<Text style={styles.heading}>
{item.title}
</Text>



<Text style={styles.message}>
{item.message}
</Text>



<Text style={styles.type}>
Category:
{item.type}
</Text>



</View>



</View>

);


}