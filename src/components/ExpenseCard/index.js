import React from "react";


import {
View,
Text
}
from "react-native";


export default function ExpenseCard({item}){


return(

<View

style={{

backgroundColor:"#FFFFFF",

padding:20,

borderRadius:20,

marginBottom:15

}}

>


<Text

style={{

fontSize:18,

fontWeight:"700"

}}

>

{item.title}

</Text>



<Text>
Category : {item.category}
</Text>



<Text>
Date : {item.date}
</Text>



<Text

style={{

color:"#F97316",

fontSize:18,

fontWeight:"700"

}}

>

Rs. {item.amount}

</Text>



</View>


)

}