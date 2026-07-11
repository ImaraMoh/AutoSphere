import React from "react";


import {

View,
Text

}

from "react-native";


import styles from "./styles";





export default function HealthScore({

score,

analysis,

healthStatus,

maintenancePrediction,

drivingEfficiency,

expenseBehaviour,

recommendations,

updatedAt

}){



const getStatus = ()=>{


if(score >= 80)

return "Excellent Condition";


if(score >= 60)

return "Needs Attention";


return "Critical";

};



return(


<View style={styles.card}>


{/* Header */}

<View style={styles.header}>


<View style={styles.titleContainer}>


<Text style={styles.title}>

🤖 AI Vehicle Health

</Text>



<Text style={styles.status}>

{healthStatus || getStatus()}

</Text>


</View>





<View style={styles.scoreContainer}>


<Text style={styles.score}>

{score}%

</Text>



<Text style={styles.scoreLabel}>

Health Score

</Text>


</View>



</View>







{/* Progress Bar */}


<View style={styles.progressBg}>


<View

style={[

styles.progress,

{

width:`${score}%`

}

]}

/>


</View>







{/* AI Analysis */}


{

analysis &&


<View style={styles.analysisBox}>


<Text style={styles.sectionTitle}>

AI Summary

</Text>



<Text style={styles.analysisText}>

{analysis}

</Text>


</View>


}









{/* Predictions */}



<View style={styles.insights}>


<Text style={styles.sectionTitle}>

AI Predictions

</Text>







<View style={styles.item}>


<Text style={styles.icon}>

🔧

</Text>


<View style={styles.itemContent}>


<Text style={styles.itemTitle}>

Maintenance

</Text>



<Text style={styles.itemText}>

{maintenancePrediction || 
"Analyzing maintenance"}

</Text>


</View>


</View>








<View style={styles.item}>


<Text style={styles.icon}>

⛽

</Text>


<View style={styles.itemContent}>


<Text style={styles.itemTitle}>

Driving Efficiency

</Text>



<Text style={styles.itemText}>

{drivingEfficiency ||
"Analyzing driving pattern"}

</Text>


</View>


</View>







<View style={styles.item}>


<Text style={styles.icon}>

💰

</Text>


<View style={styles.itemContent}>


<Text style={styles.itemTitle}>

Expense Behaviour

</Text>



<Text style={styles.itemText}>

{expenseBehaviour ||
"Analyzing expenses"}

</Text>


</View>


</View>




</View>










{/* Recommendations */}



{

recommendations &&
recommendations.length > 0 &&



<View style={styles.recommendBox}>


<Text style={styles.sectionTitle}>

Recommendations

</Text>



{

recommendations.map(

(item,index)=>(


<Text

key={index}

style={styles.recommendation}

>

✓ {item}

</Text>


)

)

}



</View>


}







{/* Updated Time */}


{

updatedAt &&


<Text style={styles.updated}>

Last updated:

{" "}

{

new Date(updatedAt)

.toLocaleString()

}


</Text>


}





</View>


)


}