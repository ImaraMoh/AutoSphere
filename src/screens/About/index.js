import React from "react";

import {
View,
Text,
ScrollView,
TouchableOpacity,
Linking,
Image
}
from "react-native";


import {
Ionicons
}
from "@expo/vector-icons";


import styles from "./styles";



export default function AboutAutoSphere({

navigation

}){


function openPrivacy(){

navigation.navigate("Privacy");

}



function openTerms(){

Linking.openURL(
"https://autosphere.ai/terms"
);

}




return(

<View style={styles.container}>


{/* Header */}

<View style={styles.header}>


<TouchableOpacity

style={styles.backButton}

onPress={()=>navigation.goBack()}

>

<Ionicons

name="arrow-back"

size={24}

color="#0F172A"

/>

</TouchableOpacity>



<Text style={styles.title}>

About AutoSphere

</Text>


<View style={{width:40}}/>


</View>







<ScrollView

showsVerticalScrollIndicator={false}

contentContainerStyle={{
paddingBottom:40
}}

>




{/* Brand Card */}


<View style={styles.brandCard}>


<View style={styles.logoCircle}>


<Image
source={require("../../../assets/logo/logo.png")}
style={styles.logo}
/>


</View>




<Text style={styles.appName}>

AutoSphere

</Text>



<Text style={styles.tagline}>

Your Smart Vehicle Companion

</Text>



<View style={styles.versionBadge}>


<Text style={styles.versionText}>

Version 1.0.0

</Text>


</View>



</View>









{/* Description */}


<View style={styles.card}>


<Text style={styles.sectionTitle}>

About

</Text>



<Text style={styles.description}>


AutoSphere is an AI-powered vehicle management
platform that helps users maintain, monitor and
understand their vehicles digitally.


</Text>



<Text style={styles.description}>


Create vehicle profiles, track expenses,
manage documents and receive AI-based
maintenance recommendations.


</Text>


</View>









{/* Features */}



<Text style={styles.sectionHeading}>

Key Features

</Text>



<Feature

icon="car-outline"

title="Digital Vehicle Profile"

text="Manage cars, bikes, vans and trucks digitally."

/>



<Feature

icon="analytics-outline"

title="AI Vehicle Health"

text="Smart health scoring and maintenance prediction."

/>



<Feature

icon="wallet-outline"

title="Expense Tracking"

text="Monitor fuel and vehicle expenses."

/>



<Feature

icon="document-text-outline"

title="Document Wallet"

text="Store important vehicle documents."

/>









{/* Company */}


<View style={styles.card}>


<Text style={styles.sectionTitle}>

Developed By

</Text>



<Text style={styles.company}>

AutoSphere Technologies

</Text>



<Text style={styles.description}>

Building intelligent solutions for modern mobility.

</Text>


</View>









{/* Legal */}



<Text style={styles.sectionHeading}>

Legal

</Text>



<TouchableOpacity

style={styles.row}

onPress={openPrivacy}

>


<View style={styles.rowLeft}>


<Ionicons

name="shield-checkmark-outline"

size={22}

color="#F97316"

/>



<Text style={styles.rowText}>

Privacy Policy

</Text>


</View>



<Ionicons

name="chevron-forward"

size={20}

color="#CBD5E1"

/>



</TouchableOpacity>


<Text style={styles.copyright}>

© 2026 AutoSphere. All rights reserved.

</Text>




</ScrollView>


</View>

)

}










function Feature({

icon,
title,
text

}){


return(

<View style={styles.featureCard}>


<View style={styles.iconBox}>


<Ionicons

name={icon}

size={23}

color="#F97316"

/>


</View>



<View style={{flex:1}}>


<Text style={styles.featureTitle}>

{title}

</Text>



<Text style={styles.featureText}>

{text}

</Text>


</View>



</View>

)

}