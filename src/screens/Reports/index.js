import React from "react";


import {
View,
Text,
ScrollView,
Dimensions
}
from "react-native";


import {
LineChart,
PieChart
}
from "react-native-gifted-charts";


import AppHeader from "../../components/AppHeader";


import HealthScore from "../../components/HealthScore";


import AnalyticsCard from "../../components/AnalyticsCard";


import {
getVehicleAnalytics
}
from "../../services/analyticsService";


import styles from "./styles";




export default function Reports({
navigation
}){


const data =
getVehicleAnalytics();



const screenWidth =
Dimensions.get("window").width;





/*
 Monthly Expense Data

 Convert service data
 into chart format

*/

const lineData =

data.monthlyExpense.map(
(item)=>(

{

value:item.amount,

label:item.month

}

)

);







/*
 Expense Category Data

*/

const pieData =

data.expenseCategories.map(

(item)=>(

{

value:item.value,

text:item.name

}

)

);






return(


<View style={styles.container}>


<AppHeader

title="Reports & Analytics"

navigation={navigation}

/>





<ScrollView


showsVerticalScrollIndicator={false}


contentContainerStyle={{

padding:20,

paddingBottom:50

}}



>





<HealthScore

score={data.healthScore}

/>







<Text style={styles.section}>

Expense Analytics

</Text>





<View style={styles.chartCard}>


<LineChart


data={lineData}



width={
screenWidth-60
}



height={220}



spacing={50}



initialSpacing={20}



color="#F97316"



thickness={3}



hideRules={false}



hideDataPoints={false}



dataPointsColor="#F97316"



xAxisColor="#E5E7EB"



yAxisColor="#E5E7EB"



yAxisTextStyle={{

color:"#6B7280"

}}



xAxisLabelTextStyle={{

color:"#6B7280",

fontSize:12

}}



/>





</View>







<Text style={styles.section}>

Expense Breakdown

</Text>







<View style={styles.chartCard}>


<PieChart



data={pieData}



donut



radius={90}



innerRadius={55}



showText



textColor="#111827"



textSize={12}



centerLabelComponent={()=>(
<View>

<Text style={styles.centerText}>
Total
</Text>


<Text style={styles.centerValue}>
Expenses
</Text>

</View>
)}



/>



</View>









<Text style={styles.section}>

Vehicle Insights

</Text>








<AnalyticsCard


icon="🔧"


title="Services Completed"


value={

data.serviceCount

}


/>








<AnalyticsCard


icon="🤖"


title="AI Maintenance Prediction"


value="Oil change soon"


/>








<AnalyticsCard


icon="📊"


title="Driving Efficiency"


value="Good"


/>






</ScrollView>



</View>


);


}