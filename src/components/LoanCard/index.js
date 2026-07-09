import React from "react";

import {
View,
Text
}
from "react-native";


import {
CreditCard,
Calendar
}
from "lucide-react-native";


export default function LoanCard({
data
}){


return(

<View
style={{
backgroundColor:"#fff",
padding:20,
borderRadius:22,
marginTop:20
}}
>


<View
style={{
flexDirection:"row",
alignItems:"center"
}}
>

<CreditCard
size={35}
color="#F97316"
/>


<Text
style={{
fontSize:20,
fontWeight:"700",
marginLeft:12
}}
>

{data.bank}

</Text>


</View>



<Text
style={{
marginTop:20
}}
>

Vehicle:
{data.vehicle}

</Text>



<Text>

Loan Amount:
Rs {data.loanAmount}

</Text>



<Text>

Monthly EMI:
Rs {data.monthlyPayment}

</Text>



<Text>

Remaining:
{data.remainingMonths}
Months

</Text>



</View>


);

}