import React from "react";


import {
View,
Text,
TouchableOpacity
}
from "react-native";


import {
Bell,
ShieldCheck,
Wrench,
CreditCard
}
from "lucide-react-native";



export default function NotificationCard({
item,
onPress
}){


const getIcon=()=>{


if(item.type==="Insurance")
return <ShieldCheck color="#F97316"/>;


if(item.type==="Maintenance")
return <Wrench color="#F97316"/>;


if(item.type==="Finance")
return <CreditCard color="#F97316"/>;


return <Bell color="#F97316"/>;


};



return(

<TouchableOpacity

onPress={onPress}

style={{

backgroundColor:"#fff",

padding:18,

borderRadius:20,

marginVertical:8,

flexDirection:"row"

}}

>


<View>

{getIcon()}

</View>



<View
style={{
marginLeft:15,
flex:1
}}
>


<Text
style={{
fontWeight:"800",
fontSize:16
}}
>

{item.title}

</Text>



<Text
style={{
color:"#64748B",
marginTop:5
}}
>

{item.message}

</Text>



<Text
style={{
marginTop:8,
color:
item.priority==="High"
?
"#DC2626"
:
"#16A34A"
}}
>

{item.priority}

</Text>


</View>



</TouchableOpacity>


);


}