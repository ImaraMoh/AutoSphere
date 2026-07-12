import React, {
useState
}
from "react";


import {

View,
Text,
ScrollView,
TouchableOpacity,
Switch,
Alert

}
from "react-native";


import {
Ionicons
}
from "@expo/vector-icons";


import styles from "./styles";




export default function Security({
navigation
}){


const [
biometric,
setBiometric
]
=
useState(false);



const [
twoFactor,
setTwoFactor
]
=
useState(false);






function changePassword(){


navigation.navigate(
"ChangePassword"
);


}







function logoutDevices(){


Alert.alert(

"Logout Devices",

"Do you want to logout from all connected devices?",


[

{
text:"Cancel",
style:"cancel"
},


{

text:"Logout All",

style:"destructive",

onPress:()=>{

Alert.alert(
"Done",
"All devices logged out"
);

}

}

]

);


}








return(


<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity

style={styles.back}

onPress={()=>navigation.goBack()}

>

<Ionicons

name="arrow-back"

size={24}

color="#0F172A"

/>


</TouchableOpacity>



<Text style={styles.title}>

Security

</Text>



<View style={{width:40}}/>


</View>









<ScrollView

showsVerticalScrollIndicator={false}

contentContainerStyle={styles.scroll}

>







<View style={styles.securityHero}>


<View style={styles.securityIcon}>


<Ionicons

name="shield-checkmark"

size={45}

color="#F97316"

/>


</View>



<Text style={styles.heroTitle}>

Account Security

</Text>



<Text style={styles.heroText}>

Protect your AutoSphere account with advanced security settings.

</Text>


</View>









<SecurityItem

icon="key-outline"

title="Change Password"

description="Update your account password regularly"

onPress={changePassword}

/>









<SecuritySwitch

icon="finger-print-outline"

title="Biometric Login"

description="Use fingerprint or face authentication"

value={biometric}

onChange={setBiometric}

/>









<SecuritySwitch

icon="lock-closed-outline"

title="Two Factor Authentication"

description="Add an extra layer of account protection"

value={twoFactor}

onChange={setTwoFactor}

/>









<SecurityItem

icon="phone-portrait-outline"

title="Connected Devices"

description="Manage devices logged into your account"

onPress={()=>navigation.navigate(
"ConnectedDevices"
)}

/>








<SecurityItem

icon="log-out-outline"

title="Logout All Devices"

description="Remove access from all active sessions"

onPress={logoutDevices}

/>








</ScrollView>


</View>


)

}









function SecurityItem({

icon,

title,

description,

onPress

}){


return(


<TouchableOpacity

style={styles.card}

onPress={onPress}

activeOpacity={0.8}

>


<View style={styles.iconBox}>


<Ionicons

name={icon}

size={25}

color="#F97316"

/>


</View>





<View style={styles.content}>


<Text style={styles.cardTitle}>

{title}

</Text>



<Text style={styles.description}>

{description}

</Text>


</View>




<Ionicons

name="chevron-forward"

size={20}

color="#CBD5E1"

/>



</TouchableOpacity>


)

}









function SecuritySwitch({

icon,

title,

description,

value,

onChange

}){


return(


<View style={styles.card}>


<View style={styles.iconBox}>


<Ionicons

name={icon}

size={25}

color="#F97316"

/>


</View>





<View style={styles.content}>


<Text style={styles.cardTitle}>

{title}

</Text>



<Text style={styles.description}>

{description}

</Text>


</View>




<Switch

value={value}

onValueChange={onChange}

/>


</View>


)

}