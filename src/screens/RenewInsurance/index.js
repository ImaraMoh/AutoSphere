import React,{
useState
}
from "react";


import {
View,
Text,
TextInput,
TouchableOpacity
}
from "react-native";


import {
ChevronLeft
}
from "lucide-react-native";


import styles from "./styles";


export default function RenewInsurance({
navigation
}){


return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft size={30}/>

</TouchableOpacity>


<Text style={styles.title}>
Renew Insurance
</Text>


</View>



<View style={styles.card}>


<Text style={styles.heading}>
Insurance Details
</Text>



<TextInput
placeholder="Insurance Provider"
style={styles.input}
/>



<TextInput
placeholder="Policy Number"
style={styles.input}
/>



<TextInput
placeholder="Vehicle Registration"
style={styles.input}
/>



<TextInput
placeholder="Premium Amount"
style={styles.input}
/>




<TouchableOpacity
style={styles.button}
>


<Text style={styles.buttonText}>
Submit Renewal Request
</Text>


</TouchableOpacity>



</View>



</View>


);


}