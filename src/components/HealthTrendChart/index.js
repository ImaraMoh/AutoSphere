import React from "react";


import {

View,
Text

}
from "react-native";


import {
LineChart
}
from "react-native-gifted-charts";


import styles from "./styles";



export default function HealthTrendChart({

history=[]

}){



const chartData =

history
.slice(0,7)
.reverse()
.map(item=>({


value:item.score,


label:

new Date(item.date)

.toLocaleDateString(
"en",
{
month:"short"
}

)


}));




if(history.length===0)

return null;




return(


<View style={styles.card}>


<Text style={styles.title}>

📈 Vehicle Health Trend

</Text>



<LineChart


data={chartData}


height={180}


thickness={3}


spacing={50}


initialSpacing={20}


color="#F97316"


dataPointsColor="#F97316"


/>


</View>


)

}