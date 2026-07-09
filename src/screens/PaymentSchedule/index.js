import React from "react";


import {
View,
Text,
TouchableOpacity,
FlatList
}
from "react-native";


import {
ChevronLeft,
CheckCircle
}
from "lucide-react-native";


import styles from "./styles";


const payments=[

{
month:"January 2026",
amount:"45000",
status:"Paid"
},

{
month:"February 2026",
amount:"45000",
status:"Upcoming"
},

{
month:"March 2026",
amount:"45000",
status:"Upcoming"
}

];



export default function PaymentSchedule({
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
Payment Schedule
</Text>


</View>




<View style={styles.summary}>


<Text>
Loan Repayment
</Text>


<Text style={styles.amount}>
Rs 45000 / Month
</Text>


</View>




<FlatList

data={payments}

keyExtractor={
item=>item.month
}

renderItem={({item})=>(


<View style={styles.payment}>


<CheckCircle
size={25}
color={
item.status==="Paid"
?
"#16A34A"
:
"#EAB308"
}
/>



<View style={styles.details}>


<Text style={styles.month}>
{item.month}
</Text>


<Text>
Rs {item.amount}
</Text>


<Text>
{item.status}
</Text>


</View>


</View>


)}

/>



</View>


);


}