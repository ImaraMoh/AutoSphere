import React, {
useState
}
from "react";


import {

View,
Text,
ScrollView,
Image,
TouchableOpacity,
Alert,
ActivityIndicator

}
from "react-native";


import {

Ionicons

}
from "@expo/vector-icons";


import {

deleteVehicle

}
from "../../services/vehicleStorage";


import {

calculateVehicleHealth

}
from "../../services/vehicleHealthService";


import HealthScore from "../../components/HealthScore";


import styles from "./styles";





export default function VehicleProfile({

route,

navigation

}){


const {
vehicle
}
=
route.params;



const health = {

score:
vehicle.healthScore || 0,


healthStatus:
vehicle.healthScore >=80
?
"Excellent Condition"
:
vehicle.healthScore >=60
?
"Needs Attention"
:
"Critical",


analysis:
"AI analyzed your vehicle condition based on mileage, fuel type and maintenance history.",


maintenancePrediction:
vehicle.serviceStatus==="Upcoming"
?
"Service recommended soon"
:
"Vehicle maintenance looks good",


drivingEfficiency:
"Good",


expenseBehaviour:
"Normal",


recommendations:[

"Check engine oil regularly",

"Maintain tire pressure",

"Keep service records updated"

],


updatedAt:
vehicle.createdAt

};

const [
deleting,
setDeleting
]
=
useState(false);







function editVehicle(){


navigation.navigate(

"EditVehicle",

{

vehicle

}

);


}

function removeVehicle(){


console.log(
"DELETE CLICKED",
vehicle
);



const confirmDelete =
window.confirm(
`Remove ${vehicle.brand} ${vehicle.model}?`
);



if(!confirmDelete){

return;

}



deleteVehicle(
String(vehicle.id)
)
.then(result=>{


console.log(
"DELETE RESULT",
result
);



if(result){


alert(
"Vehicle deleted successfully"
);



navigation.reset({

index:0,

routes:[
{
name:"Vehicles"
}

]

});


}


})
.catch(error=>{


console.log(
"DELETE ERROR",
error
);


});


}






return(


<View style={styles.container}>


{/* Header */}


<View style={styles.header}>


<TouchableOpacity

onPress={()=>navigation.goBack()}

>


<Ionicons

name="arrow-back"

size={26}

color="#0F172A"

/>


</TouchableOpacity>





<Text style={styles.headerTitle}>

Vehicle Profile

</Text>




<View/>


</View>









<ScrollView

showsVerticalScrollIndicator={false}

contentContainerStyle={{

paddingBottom:40

}}

>





{/* Hero */}


<View style={styles.hero}>


{


vehicle.image ?


<Image

source={{
uri:vehicle.image
}}

resizeMode="cover"

style={styles.heroImage}

/>



:


<View style={styles.placeholder}>


<Ionicons

name="car-sport"

size={90}

color="#F97316"

/>


</View>


}





<Text style={styles.vehicleName}>

{vehicle.brand} {vehicle.model}

</Text>




<Text style={styles.registration}>

{vehicle.registration}

</Text>



<View style={styles.healthContainer}>


<HealthScore


score={health.score}


healthStatus={

health.healthStatus

}



analysis={

health.analysis

}



maintenancePrediction={

health.maintenancePrediction

}



drivingEfficiency={

health.drivingEfficiency

}



expenseBehaviour={

health.expenseBehaviour

}



recommendations={

health.recommendations

}



updatedAt={

health.updatedAt

}


/>



</View>


</View>

<Text style={styles.sectionTitle}>

Vehicle Information

</Text>





<View style={styles.infoGrid}>


<InfoCard

icon="car"

title="Type"

value={vehicle.type}

/>



<InfoCard

icon="calendar"

title="Year"

value={vehicle.year}

/>




<InfoCard

icon="speedometer"

title="Mileage"

value={`${vehicle.mileage} KM`}

/>




<InfoCard

icon="water"

title="Fuel"

value={vehicle.fuel}

/>



</View>









<Text style={styles.sectionTitle}>

Vehicle Status

</Text>





<View style={styles.statusCard}>


<StatusRow

icon="shield-checkmark"

title="Insurance"

value={vehicle.insuranceStatus || "Valid"}

color="#16A34A"

/>




<StatusRow

icon="construct"

title="Service"

value={vehicle.serviceStatus || "Upcoming"}

color="#EAB308"

/>



<StatusRow

icon="document-text"

title="Documents"

value="5 Uploaded"

color="#2563EB"

/>



</View>


{/* ACTION BUTTONS */}


<View style={styles.bottomActions}>


<TouchableOpacity

style={styles.editButton}

onPress={editVehicle}

activeOpacity={0.8}

>


<Ionicons

name="create-outline"

size={22}

color="white"

/>



<Text style={styles.editText}>

Edit Vehicle

</Text>



</TouchableOpacity>









<TouchableOpacity

style={styles.deleteButton}

onPress={removeVehicle}

activeOpacity={0.8}

disabled={deleting}

>


{

deleting

?

<ActivityIndicator

color="#EF4444"

/>


:

<Ionicons

name="trash-outline"

size={22}

color="#EF4444"

/>

}



<Text style={styles.deleteText}>

Delete

</Text>



</TouchableOpacity>



</View>







</ScrollView>


</View>


)

}









function InfoCard({

icon,

title,

value

}){


return(


<View style={styles.infoCard}>


<Ionicons

name={icon}

size={22}

color="#F97316"

/>



<Text style={styles.infoTitle}>

{title}

</Text>



<Text style={styles.infoValue}>

{value || "-"}

</Text>



</View>


)

}









function StatusRow({

icon,

title,

value,

color

}){


return(


<View style={styles.statusRow}>


<Ionicons

name={icon}

size={22}

color={color}

/>



<Text style={styles.statusTitle}>

{title}

</Text>



<Text

style={[

styles.statusValue,

{
color
}

]}

>

{value}

</Text>



</View>


)

}