import React from "react";


import {

View,
Text

}

from "react-native";



export default function VehicleHealthCard({

score,
analysis

}){


return(

<View style={styles.card}>


<Text style={styles.title}>

🚗 Vehicle Health

</Text>



<View style={styles.scoreBox}>


<Text style={styles.score}>

{score}%

</Text>



<Text>

Health Score

</Text>


</View>




<Text style={styles.result}>

{analysis}

</Text>



</View>

)

}




const styles={


card:{


backgroundColor:"#FFFFFF",

margin:12,

padding:18,

borderRadius:20,


},



title:{


fontSize:18,

fontWeight:"700",

color:"#0D1117"


},


scoreBox:{


marginVertical:15,

alignItems:"center"


},


score:{


fontSize:42,

fontWeight:"800",

color:"#F97316"


},



result:{


fontSize:14,

lineHeight:22,

color:"#374151"


}


}