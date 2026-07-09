import React from "react";

import {
View,
Text,
Image,
TouchableOpacity,
ScrollView
} from "react-native";


import {
Ionicons
} from "@expo/vector-icons";


import AppHeader from "../../components/AppHeader";


import styles from "./styles";


export default function Vehicles({navigation}){


return(

<View style={styles.container}>


<AppHeader
title="My Vehicles"
navigation={navigation}
/>



<ScrollView>


<View style={styles.vehicleCard}>


<View style={styles.imageBox}>


<Ionicons
name="car-sport"
size={70}
color="#F97316"
/>


</View>



<Text style={styles.name}>
Honda Civic 2022
</Text>


<Text>
Registration : ABC-1234
</Text>


<Text>
Mileage : 87000 KM
</Text>


<Text>
Fuel : Petrol
</Text>



<View style={styles.health}>


<Text>
Health Score
</Text>


<Text style={styles.score}>
92%
</Text>


</View>


</View>



<TouchableOpacity
style={styles.button}
onPress={()=>navigation.navigate("AddVehicle")}
>


<Text style={styles.buttonText}>
+ Add Vehicle
</Text>


</TouchableOpacity>


</ScrollView>


</View>

)

}