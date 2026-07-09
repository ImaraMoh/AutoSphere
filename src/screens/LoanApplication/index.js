import React from "react";


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


export default function LoanApplication({
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
Finance Application
</Text>


</View>




<View style={styles.card}>


<Text style={styles.heading}>
Loan Details
</Text>



<TextInput

placeholder="Vehicle Model"

style={styles.input}

/>



<TextInput

placeholder="Loan Amount"

keyboardType="numeric"

style={styles.input}

/>



<TextInput

placeholder="Monthly Income"

keyboardType="numeric"

style={styles.input}

/>



<TextInput

placeholder="Employment Type"

style={styles.input}

/>




<TouchableOpacity
style={styles.upload}
>

<Text>
📎 Upload Documents
</Text>


</TouchableOpacity>




<TouchableOpacity
style={styles.button}
>

<Text style={styles.buttonText}>
Submit Application
</Text>


</TouchableOpacity>



</View>



</View>

);


}