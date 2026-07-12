import React from "react";


import {

View,
Text,
TouchableOpacity

}
from "react-native";


import {
Ionicons
}
from "@expo/vector-icons";


import styles from "./styles";




export default function ConnectedDevices({
navigation
}){


const devices=[

{
name:"Chrome Browser",
type:"Web",
active:true
},


{
name:"iPhone",
type:"Mobile",
active:false
}


];





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
Connected Devices
</Text>


</View>







<Text style={styles.description}>

Manage devices connected to your AutoSphere account

</Text>








{

devices.map((item,index)=>(


<View

key={index}

style={styles.deviceCard}

>


<View style={styles.iconBox}>


<Ionicons

name={
item.type==="Web"
?
"desktop-outline"
:
"phone-portrait-outline"
}

size={25}

color="#F97316"

/>


</View>



<View style={{flex:1}}>


<Text style={styles.deviceName}>
{item.name}
</Text>


<Text style={styles.deviceType}>
{item.type}
</Text>


</View>




<TouchableOpacity>


<Ionicons

name="trash-outline"

size={22}

color="#EF4444"

/>


</TouchableOpacity>



</View>


))


}



</View>


)

}