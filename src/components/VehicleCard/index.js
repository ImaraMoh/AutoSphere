import React, {
useMemo
}
from "react";


import {

View,
Text,
Image,
TouchableOpacity

}
from "react-native";


import {

Ionicons

}
from "@expo/vector-icons";


import VehicleHealthBadge from "../VehicleHealthBadge";


import {

calculateVehicleHealth

}
from "../../services/vehicleHealthService";



export default function VehicleCard({

vehicle,

onPress

}){


const health = useMemo(()=>{


return calculateVehicleHealth(vehicle);


},[vehicle]);



return(


<TouchableOpacity

activeOpacity={0.9}

onPress={onPress}

style={styles.card}

>



{
vehicle.image ?


<Image

source={{
uri:vehicle.image
}}

style={styles.vehicleImage}

/>


:

<View style={styles.placeholder}>


<Ionicons

name="car-sport"

size={95}

color="#F97316"

/>


</View>


}





<View style={styles.content}>



<View style={styles.header}>


<View style={styles.vehicleInfo}>


<Text style={styles.vehicleName}>

{vehicle.brand} {vehicle.model}

</Text>



<Text style={styles.registration}>

{vehicle.registration}

</Text>


</View>




<VehicleHealthBadge

score={health.score}

/>


</View>







<View style={styles.details}>


<Detail

label="Mileage"

value={`${vehicle.mileage} KM`}

/>



<Detail

label="Fuel"

value={vehicle.fuel}

/>



<Detail

label="Year"

value={vehicle.year}

/>



</View>







<View style={styles.aiBox}>


<Ionicons

name="sparkles"

size={18}

color="#F97316"

/>



<Text style={styles.aiText}>

AI Health: {health.healthStatus}

</Text>



</View>








<View style={styles.footer}>


<View style={styles.insurance}>


<Ionicons

name="shield-checkmark"

size={18}

color="#22C55E"

/>


<Text style={styles.insuranceText}>

{vehicle.insuranceStatus || "Insurance Valid"}

</Text>


</View>





<Ionicons

name="chevron-forward"

size={22}

color="#CBD5E1"

/>



</View>




</View>






</TouchableOpacity>


)

}







function Detail({

label,

value

}){


return(


<View style={styles.detail}>


<Text style={styles.label}>

{label}

</Text>


<Text style={styles.value}>

{value || "-"}

</Text>


</View>


)

}







const styles={


card:{


backgroundColor:"#FFFFFF",

borderRadius:26,

overflow:"hidden",

marginBottom:18,


shadowColor:"#000",

shadowOpacity:0.08,

shadowRadius:15,

elevation:5


},



vehicleImage:{


width:"100%",

height:190


},



placeholder:{


height:190,

backgroundColor:"#FFF7ED",

alignItems:"center",

justifyContent:"center"


},




content:{


padding:18


},




header:{


flexDirection:"row",

justifyContent:"space-between",

alignItems:"center"


},




vehicleInfo:{


flex:1


},



vehicleName:{


fontSize:21,

fontWeight:"800",

color:"#0F172A"


},




registration:{


marginTop:5,

fontSize:14,

color:"#64748B"


},




details:{


flexDirection:"row",

justifyContent:"space-between",

marginTop:20,

paddingVertical:15,

borderTopWidth:1,

borderBottomWidth:1,

borderColor:"#F1F5F9"


},




detail:{


alignItems:"center",

flex:1


},



label:{


fontSize:12,

color:"#94A3B8"


},



value:{


fontSize:15,

fontWeight:"700",

color:"#0F172A",

marginTop:5


},




aiBox:{


marginTop:15,

backgroundColor:"#FFF7ED",

padding:12,

borderRadius:15,

flexDirection:"row",

alignItems:"center"


},



aiText:{


marginLeft:8,

fontSize:14,

fontWeight:"700",

color:"#9A3412"


},




footer:{


marginTop:15,

flexDirection:"row",

justifyContent:"space-between",

alignItems:"center"


},



insurance:{


flexDirection:"row",

alignItems:"center"


},



insuranceText:{


marginLeft:7,

color:"#22C55E",

fontWeight:"700",

fontSize:14


}



};