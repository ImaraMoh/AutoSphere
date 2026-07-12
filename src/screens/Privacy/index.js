import React from "react";

import {
View,
Text,
ScrollView,
TouchableOpacity
}
from "react-native";


import {
Ionicons
}
from "@expo/vector-icons";


import styles from "./styles";



export default function Privacy({
navigation
}){


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

Privacy

</Text>



<View style={{width:40}}/>


</View>







<ScrollView

showsVerticalScrollIndicator={false}

contentContainerStyle={styles.scroll}

>





<View style={styles.hero}>


<View style={styles.heroIcon}>


<Ionicons

name="shield-checkmark"

size={45}

color="#F97316"

/>


</View>


<Text style={styles.heroTitle}>

Your Privacy Matters

</Text>


<Text style={styles.heroText}>

AutoSphere protects your vehicle data and personal information with secure storage.

</Text>


</View>









<PrivacyCard

icon="person-circle-outline"

title="Personal Information"

description="Your profile information is stored securely and only used to personalize your experience."

/>







<PrivacyCard

icon="car-outline"

title="Vehicle Data"

description="Vehicle profiles, maintenance records and expenses are stored safely."

/>








<PrivacyCard

icon="lock-closed-outline"

title="Data Protection"

description="Your information is protected using secure local storage."

/>









<PrivacyCard

icon="trash-outline"

title="Delete Account Data"

description="You can request removal of your stored information anytime."

/>







</ScrollView>



</View>


)

}








function PrivacyCard({

icon,

title,

description

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


</View>


)

}