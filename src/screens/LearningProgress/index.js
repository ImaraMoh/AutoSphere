import React from "react";


import {
View,
Text,
TouchableOpacity
}
from "react-native";


import {
ChevronLeft
}
from "lucide-react-native";


import styles from "./styles";



export default function LearningProgress({
navigation
}){


const progress=[

{
title:"Theory Lessons",
value:"80%"
},

{
title:"Parking Practice",
value:"60%"
},

{
title:"Road Driving",
value:"40%"
}

];



return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft size={30}/>

</TouchableOpacity>


<Text style={styles.title}>
Learning Progress
</Text>


</View>




<View style={styles.scoreCard}>


<Text style={styles.scoreTitle}>
Overall Progress
</Text>


<Text style={styles.score}>
60%
</Text>


</View>




{
progress.map((item,index)=>(


<View
key={index}
style={styles.progressCard}
>


<Text style={styles.name}>
{item.title}
</Text>


<View style={styles.barBackground}>


<View
style={[
styles.bar,
{
width:item.value
}
]}
/>


</View>



<Text>
{item.value}
</Text>


</View>


))

}




</View>


);


}