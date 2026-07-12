import React, {
useCallback,
useState,
useEffect
} from "react";

import {
useFocusEffect
}
from "@react-navigation/native";

import {

View,
Text,
ScrollView,
TouchableOpacity,
TextInput,
RefreshControl

}
from "react-native";


import {

Ionicons

}
from "@expo/vector-icons";


import VehicleCard from "../../components/VehicleCard";

import EmptyVehicleState from "../../components/EmptyVehicleState";
import HealthScore from "../../components/HealthScore";

import {

getVehicles

}
from "../../services/vehicleStorage";
import {
calculateVehicleHealth
}
from "../../services/vehicleHealthService";

import styles from "./styles";



export default function Vehicles({

navigation

}){


const [vehicles,setVehicles]=useState([]);

const [search,setSearch]=useState("");

const [filter,setFilter]=useState("All");

const [refreshing,setRefreshing]=useState(false);

useEffect(()=>{


const unsubscribe =
navigation.addListener(
"focus",
()=>{

loadVehicles();

}

);


return unsubscribe;


},[navigation]);

async function loadVehicles(){

const data =
await getVehicles();

setVehicles(data);

}



async function refresh(){

setRefreshing(true);

await loadVehicles();

setRefreshing(false);

}





const filteredVehicles = vehicles.filter(vehicle=>{


const matchesSearch =

(
vehicle.brand+
vehicle.model+
vehicle.registration
)

.toLowerCase()

.includes(

search.toLowerCase()

);



const matchesFilter =

filter==="All"

||

vehicle.type===filter;



return matchesSearch && matchesFilter;


});

const averageHealth =
vehicles.length
?
Math.round(

vehicles.reduce(

(total,item)=>

total + calculateVehicleHealth(item).score,

0

)

/
vehicles.length

)
:
0;



return(


<View style={styles.container}>


{/* Header */}

<View style={styles.header}>


<View>

<Text style={styles.title}>

My Vehicles 🚗

</Text>


<Text style={styles.subtitle}>

Manage your digital vehicles

</Text>

</View>

</View>


{/* Vehicle Summary */}


<View style={styles.summary}>


<View>

<Text style={styles.summaryNumber}>

{vehicles.length}

</Text>

<Text style={styles.summaryLabel}>

Vehicles

</Text>

</View>



<View>

<Text style={styles.summaryNumber}>

{

vehicles.filter(
v=>v.type==="Car"
).length

}

</Text>

<Text style={styles.summaryLabel}>

Cars

</Text>

</View>




<View>

<Text style={styles.summaryNumber}>
{averageHealth}%
</Text>

<Text style={styles.summaryLabel}>

Avg Health

</Text>

</View>



</View>







{/* Search */}


<View style={styles.searchBox}>


<Ionicons

name="search"

size={20}

color="#94A3B8"

/>


<TextInput

placeholder="Search vehicle..."

placeholderTextColor="#94A3B8"

value={search}

onChangeText={setSearch}

style={styles.searchInput}

/>


</View>







{/* Filters */}

<ScrollView
style={{flex:1}}
showsVerticalScrollIndicator={false}
>


{

[
"All",
"Car",
"Bike",
"Van",
"Truck"

].map(item=>(


<TouchableOpacity

key={item}

onPress={()=>setFilter(item)}

style={[

styles.filter,

filter===item && styles.activeFilter

]}

>


<Text

style={[

styles.filterText,

filter===item && styles.activeFilterText

]}

>

{item}

</Text>


</TouchableOpacity>


))


}



</ScrollView>







<ScrollView

showsVerticalScrollIndicator={false}

refreshControl={

<RefreshControl

refreshing={refreshing}

onRefresh={refresh}

/>

}


contentContainerStyle={{

paddingBottom:120

}}

>



{

filteredVehicles.length===0

?


<EmptyVehicleState

onPress={()=>navigation.navigate("AddVehicle")}

/>


:

filteredVehicles.map(vehicle=>(


<VehicleCard

key={vehicle.id}

vehicle={vehicle}

onPress={()=>


navigation.navigate(

"VehicleProfile",

{

vehicle

}

)


}

/>


))


}





</ScrollView>









{/* Floating Button */}


<TouchableOpacity


style={styles.floatingButton}


onPress={()=>navigation.navigate("AddVehicle")}


>


<Ionicons

name="add"

size={30}

color="white"

/>


</TouchableOpacity>






</View>


)

}