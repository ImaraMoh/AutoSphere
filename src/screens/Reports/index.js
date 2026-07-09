import React from "react";


import {
View,
Text,
ScrollView
}
from "react-native";


import {
LineChart,
PieChart
}
from "react-native-chart-kit";


import {
Dimensions
}
from "react-native";


import AppHeader from "../../components/AppHeader";


import HealthScore from "../../components/HealthScore";


import AnalyticsCard from "../../components/AnalyticsCard";


import {
getVehicleAnalytics
}
from "../../services/analyticsService";


import styles from "./styles";



export default function Reports({navigation}){


const data =
getVehicleAnalytics();



const screenWidth =
Dimensions.get("window").width;



return(

<View style={styles.container}>


<AppHeader

title="Reports & Analytics"

navigation={navigation}

/>



<ScrollView

contentContainerStyle={{
padding:20
}}

>



<HealthScore

score={data.healthScore}

/>





<Text style={styles.section}>
Expense Analytics
</Text>





<LineChart

data={{

labels:data.monthlyExpense.map(
item=>item.month
),

datasets:[

{

data:data.monthlyExpense.map(
item=>item.amount
)

}

]

}}


width={screenWidth-40}


height={220}


chartConfig={{

backgroundGradientFrom:"#FFFFFF",

backgroundGradientTo:"#FFFFFF",

decimalPlaces:0,


color:()=>"#F97316"

}}


/>







<Text style={styles.section}>
Expense Breakdown
</Text>





<PieChart


data={

data.expenseCategories.map(
(item,index)=>(

{

name:item.name,

population:item.value,

color:"#F97316",

legendFontColor:"#333"

}

)

)

}


width={screenWidth-40}

height={220}


chartConfig={{

color:()=>"#F97316"

}}


accessor="population"


backgroundColor="transparent"


/>







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


)

}