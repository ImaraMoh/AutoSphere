import React from "react";


import {
View,
Text,
TouchableOpacity
}
from "react-native";


import {
Car,
Star
}
from "lucide-react-native";


export default function SchoolCard({
school,
onPress
}){


return(

<TouchableOpacity

onPress={onPress}

style={{
backgroundColor:"#fff",
padding:20,
borderRadius:22,
marginTop:15
}}

>



<Text
style={{
fontSize:20,
fontWeight:"800"
}}
>

🏫 {school.name}

</Text>



<View
style={{
flexDirection:"row",
marginTop:10
}}
>

<Star
size={18}
color="#EAB308"
/>


<Text>

{school.rating}

</Text>


</View>




<Text
style={{
marginTop:10
}}
>

📍 {school.location}

</Text>




<Text>

🚗 {school.vehicles.join(", ")}

</Text>




<Text
style={{
color:"#F97316",
fontWeight:"700",
marginTop:10
}}
>

Rs {school.price}

</Text>



</TouchableOpacity>


);


}