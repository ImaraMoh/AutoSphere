import React from "react";


import {
View,
Text,
TouchableOpacity,
FlatList
}
from "react-native";


import {
ChevronLeft
}
from "lucide-react-native";


import SchoolCard from "../../components/SchoolCard";


import styles from "./styles";



const schools=[


{
id:"1",
name:"ABC Driving Academy",
location:"Colombo",
rating:4.8,
vehicles:["Car","Bike"],
price:25000
},


{
id:"2",
name:"Smart Drive School",
location:"Kandy",
rating:4.6,
vehicles:["Car"],
price:30000
}


];



export default function DrivingSchool({
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
Driving School
</Text>


</View>




<View style={styles.hero}>


<Text style={styles.heroTitle}>

🚘 Learn Driving Easily

</Text>


<Text style={styles.heroText}>

Find trusted schools and instructors

</Text>


</View>




<FlatList

data={schools}

keyExtractor={
item=>item.id
}

renderItem={({item})=>(


<SchoolCard

school={item}

onPress={()=>navigation.navigate(
"InstructorDetails"
)}

/>


)}

/>



</View>

);


}