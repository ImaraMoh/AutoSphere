import React from "react";

import {
View,
Text,
ScrollView,
TouchableOpacity,
Linking
}
from "react-native";

import {
Ionicons
}
from "@expo/vector-icons";

import styles from "./styles";


export default function HelpSupport({
navigation
}){


function openEmail(){

Linking.openURL(
"mailto:support@autosphere.ai"
);

}



function openWebsite(){

Linking.openURL(
"https://autosphere.ai"
);

}



return(

<View style={styles.container}>


{/* Header */}

<View style={styles.header}>


<TouchableOpacity

onPress={()=>navigation.goBack()}

style={styles.backButton}

>

<Ionicons

name="arrow-back"

size={24}

color="#0F172A"

/>

</TouchableOpacity>



<Text style={styles.title}>

Help & Support

</Text>


<View style={{width:40}}/>


</View>





<ScrollView

showsVerticalScrollIndicator={false}

contentContainerStyle={{
paddingBottom:40
}}

>



{/* Hero */}

<View style={styles.hero}>


<View style={styles.heroIcon}>

<Ionicons

name="headset"

size={45}

color="#F97316"

/>


</View>



<Text style={styles.heroTitle}>

How can we help you?

</Text>


<Text style={styles.heroText}>

Get support, report issues and learn more about AutoSphere

</Text>



</View>









{/* FAQ */}


<Text style={styles.sectionTitle}>

Frequently Asked Questions

</Text>



<FaqItem

icon="car-outline"

title="How to add my vehicle?"

text="Go to My Garage and tap Add Vehicle to create your digital vehicle profile."

/>



<FaqItem

icon="analytics-outline"

title="How is health score calculated?"

text="AutoSphere AI analyzes vehicle details, mileage, maintenance and expenses."

/>



<FaqItem

icon="shield-checkmark-outline"

title="Are my vehicle details secure?"

text="Your vehicle data is stored securely on your device."

/>









{/* Contact */}


<Text style={styles.sectionTitle}>

Contact Support

</Text>



<TouchableOpacity

style={styles.contactCard}

onPress={openEmail}

>


<View style={styles.contactIcon}>

<Ionicons

name="mail"

size={25}

color="#F97316"

/>

</View>



<View style={{flex:1}}>

<Text style={styles.contactTitle}>

Email Support

</Text>


<Text style={styles.contactText}>

support@autosphere.ai

</Text>

</View>



<Ionicons

name="chevron-forward"

size={20}

color="#CBD5E1"

/>


</TouchableOpacity>








<TouchableOpacity

style={styles.contactCard}

onPress={openWebsite}

>


<View style={styles.contactIcon}>

<Ionicons

name="globe"

size={25}

color="#F97316"

/>

</View>



<View style={{flex:1}}>

<Text style={styles.contactTitle}>

Visit Website

</Text>


<Text style={styles.contactText}>

www.autosphere.ai

</Text>

</View>



<Ionicons

name="chevron-forward"

size={20}

color="#CBD5E1"

/>


</TouchableOpacity>









{/* Report Issue */}


<TouchableOpacity

style={styles.reportButton}

onPress={openEmail}

>


<Ionicons

name="bug-outline"

size={20}

color="white"

/>


<Text style={styles.reportText}>

Report an Issue

</Text>


</TouchableOpacity>






</ScrollView>


</View>

)

}









function FaqItem({

icon,
title,
text

}){


return(

<View style={styles.faqCard}>


<View style={styles.iconBox}>


<Ionicons

name={icon}

size={22}

color="#F97316"

/>


</View>



<View style={{flex:1}}>


<Text style={styles.faqTitle}>

{title}

</Text>


<Text style={styles.faqText}>

{text}

</Text>


</View>


</View>


)


}