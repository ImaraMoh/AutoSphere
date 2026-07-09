import React from "react";

import {
View,
Text,
ScrollView,
TouchableOpacity
} from "react-native";


import {
Ionicons
} from "@expo/vector-icons";


import Card from "../../components/Card";


import styles from "./styles";



export default function Dashboard({navigation}){


return(

<View style={styles.container}>


<ScrollView showsVerticalScrollIndicator={false}>


<Text style={styles.greeting}>
Hello Imara 👋
</Text>


<Text style={styles.sub}>
Your smart vehicle companion
</Text>




<Card>

<View style={styles.vehicleHeader}>


<Ionicons
name="car-sport"
size={45}
color="#F97316"
/>


<View>

<Text style={styles.vehicle}>
Honda Civic 2022
</Text>


<Text>
87,000 KM
</Text>


</View>


</View>


<View style={styles.health}>

<Text>
Vehicle Health
</Text>


<Text style={styles.score}>
92%
</Text>


</View>


</Card>






<Text style={styles.section}>
Quick Actions
</Text>




<View style={styles.grid}>


<Action

icon="car"

title="Vehicle"

onPress={()=>navigation.navigate("Vehicles")}

/>



<Action

icon="document-text"

title="Documents"

onPress={()=>navigation.navigate("DocumentWallet")}

/>



<Action

icon="construct"

title="Maintenance"

onPress={()=>navigation.navigate("Maintenance")}

/>



<Action

icon="notifications"

title="Reminder"

onPress={()=>navigation.navigate("Reminder")}

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
icon="sparkles"
title="AI Assistant"
onPress={()=>
navigation.navigate("AIChat")
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

</View>







<Text style={styles.section}>
AI Assistant
</Text>

<Card>


<Text style={styles.ai}>
🤖 Ask AutoSphere AI
</Text>


<Text>
Get vehicle suggestions and maintenance advice
</Text>


</Card>




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
onPress={onPress}
style={styles.action}
>


<View style={styles.actionBox}>


<Ionicons
name={icon}
size={30}
color="#F97316"
/>


<Text>
{title}
</Text>


</View>


</TouchableOpacity>

)

}