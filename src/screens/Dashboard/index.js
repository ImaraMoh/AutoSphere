import React, {
useEffect,
useState
} from "react";


import {

View,
Text,
ScrollView,
TouchableOpacity,
ActivityIndicator

}

from "react-native";



import {

Ionicons

}

from "@expo/vector-icons";



import VehicleHealthCard
from "../../components/VehicleHealthCard";



import {

analyzeVehicleHealth

}

from "../../services/aiHealthService";



import Card
from "../../components/Card";



import styles
from "./styles";





export default function Dashboard({
navigation
}){


const [
health,
setHealth
]
=
useState(null);



const [
loadingHealth,
setLoadingHealth
]
=
useState(true);





useEffect(()=>{


loadHealth();


},[]);






async function loadHealth(){


try{


setLoadingHealth(true);



const result =
await analyzeVehicleHealth({

vehicle:{


brand:"Honda",

model:"Civic",

year:2022,

mileage:87000,

fuel:"Petrol"

},



maintenance:[


{

service:"Oil Change",

date:"10-06-2026",

cost:5000

},


{

service:"Brake Inspection",

date:"20-05-2026",

cost:3000

}


],




expenses:[


{

category:"Fuel",

amount:12000

},


{

category:"Repair",

amount:5000

}


]


});



setHealth(result);



}

catch(error){


console.log(
"Health Error",
error
);


}

finally{


setLoadingHealth(false);


}


}






return(


<View style={styles.container}>


<ScrollView

showsVerticalScrollIndicator={false}

contentContainerStyle={styles.scroll}



>



{/* Header */}

<View style={styles.header}>


<View>


<Text style={styles.greeting}>

Hello Imara 👋

</Text>



<Text style={styles.sub}>

Your smart vehicle companion

</Text>


</View>





<TouchableOpacity

onPress={()=>navigation.navigate("Notifications")}

style={styles.notification}

>


<Ionicons

name="notifications-outline"

size={26}

color="#111827"

/>


</TouchableOpacity>


</View>





{/* Vehicle Card */}


<Card>


<View style={styles.vehicleHeader}>


<View style={styles.carIcon}>


<Ionicons

name="car-sport"

size={42}

color="#F97316"

/>


</View>





<View>


<Text style={styles.vehicle}>

Honda Civic 2022

</Text>


<Text style={styles.info}>

87,000 KM • Petrol

</Text>


<Text style={styles.info}>

Registration:
WP CAB 1234

</Text>


</View>



</View>





<View style={styles.divider}/>



<View style={styles.healthRow}>


<View>

<Text style={styles.label}>

Current Status

</Text>


<Text style={styles.good}>

Good Condition

</Text>


</View>



<Ionicons

name="checkmark-circle"

size={35}

color="#16A34A"

/>



</View>



</Card>






{/* AI Health */}



<Text style={styles.section}>

AI Vehicle Health

</Text>



{


loadingHealth ?



<Card>


<View style={styles.loading}>


<ActivityIndicator

size="small"

color="#F97316"

/>



<Text style={styles.loadingText}>

AI analyzing vehicle...

</Text>



</View>


</Card>



:


health &&



<VehicleHealthCard

score={health.score}

analysis={health.analysis}

/>



}







{/* Quick Actions */}



<Text style={styles.section}>

Quick Actions

</Text>




<View style={styles.grid}>


<Action

icon="construct"

title="Maintenance"

onPress={()=>

navigation.navigate("Maintenance")

}

/>




<Action

icon="notifications"

title="Reminder"

onPress={()=>

navigation.navigate("Reminder")

}

/>




<Action

icon="wallet"

title="Expenses"

onPress={()=>

navigation.navigate("Expenses")

}

/>




<Action

icon="analytics"

title="Reports"

onPress={()=>

navigation.navigate("Reports")

}

/>




<Action

icon="shield"

title="Insurance"

onPress={()=>

navigation.navigate("Insurance")

}

/>




<Action

icon="card"

title="Finance"

onPress={()=>

navigation.navigate("Finance")

}

/>




<Action

icon="car-sport"

title="Driving School"

onPress={()=>

navigation.navigate("DrivingSchool")

}

/>




<Action

icon="scan"

title="OCR Scanner"

onPress={()=>

navigation.navigate("OCRScanner")

}

/>



</View>







{/* AI Assistant */}



<Text style={styles.section}>

AI Assistant

</Text>




<TouchableOpacity

activeOpacity={0.85}

onPress={()=>navigation.navigate("AI")}

>


<Card>


<View style={styles.aiHeader}>


<View style={styles.aiIcon}>


<Text>

🤖

</Text>


</View>



<View>


<Text style={styles.aiTitle}>

Ask AutoSphere AI

</Text>



<Text style={styles.aiText}>

Get vehicle diagnosis and smart advice

</Text>


</View>



</View>



</Card>


</TouchableOpacity>






</ScrollView>


</View>


)

}









function Action({

icon,

title,

onPress

}){


return(


<TouchableOpacity

style={styles.action}

onPress={onPress}

activeOpacity={0.7}

>



<View style={styles.actionBox}>


<Ionicons

name={icon}

size={26}

color="#F97316"

/>


<Text style={styles.actionText}>

{title}

</Text>



</View>



</TouchableOpacity>


)


}