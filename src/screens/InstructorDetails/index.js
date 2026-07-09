import React from "react";

import {
View,
Text,
TouchableOpacity
}
from "react-native";


import {
ChevronLeft,
Star,
Calendar,
Car
}
from "lucide-react-native";


import styles from "./styles";


export default function InstructorDetails({
navigation
}){


const instructor={

name:"Kasun Perera",

experience:"8 Years",

rating:"4.9",

vehicle:"Car / Manual",

availability:"Monday - Friday"

};



return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft size={30}/>

</TouchableOpacity>


<Text style={styles.title}>
Instructor Profile
</Text>


</View>




<View style={styles.profileCard}>


<View style={styles.avatar}>

<Text style={styles.avatarText}>
👨‍🏫
</Text>

</View>



<Text style={styles.name}>
{instructor.name}
</Text>



<View style={styles.row}>

<Star
size={20}
color="#EAB308"
/>

<Text>
{instructor.rating} Rating
</Text>


</View>



<View style={styles.info}>


<View style={styles.item}>

<Car size={20}/>

<Text>
{instructor.vehicle}
</Text>

</View>




<View style={styles.item}>

<Calendar size={20}/>

<Text>
{instructor.availability}
</Text>

</View>


</View>



<Text style={styles.exp}>
Experience:
{instructor.experience}

</Text>




<TouchableOpacity

style={styles.button}

onPress={()=>navigation.navigate(
"BookLesson"
)}

>

<Text style={styles.buttonText}>
Book Driving Lesson
</Text>


</TouchableOpacity>



</View>



</View>


);


}