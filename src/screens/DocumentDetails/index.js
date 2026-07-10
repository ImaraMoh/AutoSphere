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


export default function DocumentDetails({
route,
navigation
}){


const {
document
}=route.params;



return(

<View style={styles.container}>


<View style={styles.header}>

<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft/>

</TouchableOpacity>


<Text style={styles.title}>
Document Details
</Text>


</View>



<View style={styles.card}>


<Text>
Type
</Text>

<Text style={styles.value}>
{document.type}
</Text>



<Text>
Vehicle
</Text>

<Text style={styles.value}>
{document.vehicleModel}
</Text>



<Text>
Registration
</Text>

<Text style={styles.value}>
{document.registrationNumber}
</Text>



<Text>
Owner
</Text>

<Text style={styles.value}>
{document.owner}
</Text>



<Text>
Expiry Date
</Text>

<Text style={styles.value}>
{document.expiryDate}
</Text>



</View>



</View>

);


}