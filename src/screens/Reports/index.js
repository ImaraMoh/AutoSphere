import React from "react";


import {
View,
Text,
ScrollView,
Dimensions,
Platform
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



const width =
Dimensions.get("window").width;



const lineData =
data.monthlyExpense.map(
item=>({

value:item.amount,

label:item.month

})

);





const pieData =
data.expenseCategories.map(
item=>({

value:item.value,

text:item.name

})

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


{

Platform.OS==="web"

?


<WebExpenseChart

data={data.monthlyExpense}

/>


:


<LineChart


data={lineData}


width={width-80}


height={220}


color="#F97316"


thickness={3}


dataPointsColor="#F97316"


/>


}


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


centerLabelComponent={()=>(
<Text style={styles.centerText}>
Expense
</Text>
)}


/>


</View>








<Text style={styles.section}>
Vehicle Insights
</Text>







<AnalyticsCard

icon="🔧"

title="Services Completed"

value={data.serviceCount}

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





function WebExpenseChart({
data
}){


const max = Math.max(

...data.map(
item=>item.amount
)

);



return(

<View style={{

width:"100%",

height:220,

justifyContent:"flex-end"

}}>



{

data.map(
(item,index)=>(


<View

key={index}

style={{

flexDirection:"row",

alignItems:"center",

marginBottom:12

}}

>


<Text

style={{

width:40,

fontSize:12

}}

>

{item.month}

</Text>





<View

style={{

height:18,

backgroundColor:"#F97316",

borderRadius:10,

width:

`${

(item.amount/max)*70

}%`

}}

>



</View>




<Text

style={{

marginLeft:10,

fontSize:12

}}

>

Rs.{item.amount}

</Text>



</View>


)

)



}



</View>


);


}