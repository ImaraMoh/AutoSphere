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

<View style={styles.header}>
	<Text style={styles.greeting}>Hello Imara 👋</Text>
	<TouchableOpacity onPress={() => navigation.navigate("Notifications") }>
		<Ionicons name="notifications-outline" size={28} color="#111827" />
	</TouchableOpacity>
</View>

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
onPress={() =>
navigation.navigate("OCRScanner")
}
/>

</View>







<Text style={styles.section}>
AI Assistant
</Text>

<TouchableOpacity onPress={() => navigation.navigate('AI') } activeOpacity={0.8}>
	<Card>
		<Text style={styles.ai}>🤖 Ask AutoSphere AI</Text>
		<Text>Get vehicle suggestions and maintenance advice</Text>
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