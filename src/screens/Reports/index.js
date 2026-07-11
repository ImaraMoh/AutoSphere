import React, {
useEffect,
useState
}
from "react";


import {

View,
Text,
ScrollView,
Dimensions,
Platform,
ActivityIndicator

}

from "react-native";



import {

LineChart,
PieChart

}

from "react-native-gifted-charts";



import AppHeader
from "../../components/AppHeader";


import HealthScore
from "../../components/HealthScore";


import AnalyticsCard
from "../../components/AnalyticsCard";

import { saveHealthReport } from "../../services/aiHealthStorage";


import {

analyzeVehicleHealth

}

from "../../services/aiHealthService";



import {

getVehicleAnalytics

}

from "../../services/analyticsService";

import AIInsightCard 
from "../../components/AIInsightCard";

import {getAIHealth} from "../../services/aiCacheService"

import {
getExpenses
}
from "../../services/expenseStorage";
import { getMaintenance } from "../../services/maintenanceStorage";

import {
getHealthHistory
}
from "../../services/aiHealthStorage";


import HealthTrendChart
from "../../components/HealthTrendChart";
import styles
from "./styles";


export default function Reports({
navigation
}){



const [
health,
setHealth
]
=
useState(null);

const [
history,
setHistory
]=useState([]);

const [
loading,
setLoading
]
=
useState(true);




const analytics =
getVehicleAnalytics();


const [
expenses,
setExpenses
]
=
useState([]);


const [
pieData,
setPieData
]
=
useState([]);



const [
totalExpense,
setTotalExpense
]
=
useState(0);


useEffect(()=>{

loadHistory();
loadCachedHealth();
loadExpenses();

},[]);


async function loadHistory(){


const data =
await getHealthHistory();



setHistory(data);


}

async function loadExpenses(){


const result =
await getExpenses();



setExpenses(result);



calculateExpenseChart(result);


}




function calculateExpenseChart(data){



const categoryMap={};



data.forEach(item=>{


const category =
item.category || "Other";



if(categoryMap[category]){


categoryMap[category]
+= Number(item.amount);


}

else{


categoryMap[category]
=
Number(item.amount);


}



});





const total =

Object.values(categoryMap)

.reduce(

(a,b)=>a+b,

0

);



setTotalExpense(total);




const colors=[

"#F97316",

"#16A34A",

"#2563EB",

"#DC2626",

"#9333EA"

];





const chartData =

Object.keys(categoryMap)

.map(

(category,index)=>(


{


value:
categoryMap[category],


label:
category,



amount:
categoryMap[category],



percentage:

Math.round(

(categoryMap[category]/total)*100

),



color:

colors[index % colors.length]


}


)

);




setPieData(chartData);


}

async function loadCachedHealth(){



// Show old result instantly

const cached =
await getAIHealth();



if(cached){


setHealth(cached);

setLoading(false);


}





// Update silently

refreshAIHealth();



}

async function refreshAIHealth(){


try{


const result =
await analyzeVehicleHealth({

vehicle:{


brand:"Honda",

model:"Civic",

year:2022,

mileage:87000,

fuel:"Petrol"

},



maintenance:[

{

service:"Oil Change",

cost:5000

}

],



expenses:[

{

category:"Fuel",

amount:12000

}

]


});




setHealth(result);

await saveHealthReport(result);



}

catch(error){


console.log(
"Background AI Error",
error
);


}



}




const width =
Dimensions.get("window").width;






const lineData =

analytics.monthlyExpense.map(

item=>({

value:item.amount,

label:item.month

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








<Text style={styles.section}>

AI Vehicle Health Report

</Text>





{

loading ?



<View style={styles.loadingCard}>


<ActivityIndicator

size="small"

color="#F97316"

/>



<Text>

🤖 AI is analyzing your vehicle...

</Text>

<Text> Please wait... </Text> 
</View>



:



health &&

<HealthScore

score={health.score}

analysis={health.healthStatus}

healthStatus={health.healthStatus}

maintenancePrediction={
health.maintenancePrediction
}

drivingEfficiency={
health.drivingEfficiency
}

expenseBehaviour={
health.expenseBehaviour
}

recommendations={
health.recommendations
}

updatedAt={
health.updatedAt
}

/>

}


<HealthTrendChart

history={history}

/>



<Text style={styles.section}>

Expense Analytics

</Text>







<View style={styles.chartCard}>


{

Platform.OS==="web"

?


<WebExpenseChart

data={analytics.monthlyExpense}

/>


:


<LineChart


data={lineData}


width={width-80}


height={220}


thickness={3}


color="#F97316"


dataPointsColor="#F97316"


/>



}



</View>








<View style={styles.chartCard}>


<Text style={styles.chartTitle}>

Expense Breakdown

</Text>



<View style={styles.pieContainer}>


<PieChart

data={pieData}

donut

radius={95}

innerRadius={60}


centerLabelComponent={()=>(
<View>

<Text style={styles.totalAmount}>

Rs. {totalExpense.toLocaleString()}

</Text>


<Text style={styles.centerText}>

Total Expense

</Text>


</View>
)}

/>


</View>





<View style={styles.legendContainer}>


{

pieData.map(

(item,index)=>(


<View

key={index}

style={styles.legendItem}

>


<View

style={[

styles.dot,

{

backgroundColor:item.color

}

]}

/>



<View style={styles.legendText}>


<Text style={styles.category}>

{item.label}

</Text>



<Text style={styles.amount}>

Rs. {item.amount.toLocaleString()}

  • {item.percentage}%

</Text>


</View>



</View>


)

)


}



</View>




</View>

</ScrollView>


</View>



)


}









function extractPrediction(text){


if(!text)
return "No prediction";


const lines =
text.split("\n");



const match =
lines.find(

line=>

line.toLowerCase()
.includes("oil")

);



return match
?
match
:
"Vehicle maintenance looks normal";

}










function WebExpenseChart({
data
}){


const max =
Math.max(
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


width:`${

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


)


}