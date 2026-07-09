import React,{
useState
}
from "react";


import {
View,
Text,
TextInput,
TouchableOpacity
}
from "react-native";


import {
ChevronLeft,
CalendarDays
}
from "lucide-react-native";


import styles from "./styles";


export default function BookLesson({
navigation
}){


const [name,setName]=useState("");

const [phone,setPhone]=useState("");

const [date,setDate]=useState("");

const [vehicle,setVehicle]=useState("");



return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft size={30}/>

</TouchableOpacity>


<Text style={styles.title}>
Book Lesson
</Text>


</View>



<View style={styles.card}>


<CalendarDays
size={45}
color="#F97316"
/>



<Text style={styles.heading}>
Lesson Booking Details
</Text>




<TextInput

placeholder="Student Name"

value={name}

onChangeText={setName}

style={styles.input}

/>



<TextInput

placeholder="Phone Number"

keyboardType="numeric"

value={phone}

onChangeText={setPhone}

style={styles.input}

/>



<TextInput

placeholder="Preferred Date"

value={date}

onChangeText={setDate}

style={styles.input}

/>



<TextInput

placeholder="Vehicle Type"

value={vehicle}

onChangeText={setVehicle}

style={styles.input}

/>




<TouchableOpacity
style={styles.button}
>


<Text style={styles.buttonText}>
Confirm Booking
</Text>


</TouchableOpacity>



</View>



</View>


);


}