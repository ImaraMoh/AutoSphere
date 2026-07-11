import React from "react";


import {

View,
Text

}

from "react-native";


import styles from "./styles";



export default function AIInsightCard({

icon,

title,

value

}){


return(


<View style={styles.card}>


<View style={styles.iconBox}>


<Text style={styles.icon}>

{icon}

</Text>


</View>




<View style={styles.content}>


<Text style={styles.title}>

{title}

</Text>



<Text style={styles.value}>

{value || "Analyzing..."}

</Text>



</View>


</View>


)

}