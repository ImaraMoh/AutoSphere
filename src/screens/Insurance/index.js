import React,{
useEffect,
useState
}
from "react";


import {
View,
Text,
TouchableOpacity
}
from "react-native";


import {
ChevronLeft,
Plus,
FileText
}
from "lucide-react-native";


import InsuranceCard from "../../components/InsuranceCard";

import styles from "./styles";


export default function Insurance({
navigation
}){


const [insurance,setInsurance]=useState(null);



return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft
size={30}
/>

</TouchableOpacity>



<Text style={styles.title}>

Insurance

</Text>


</View>




<View style={styles.hero}>


<Text
style={styles.heroTitle}
>

🛡 Protect Your Vehicle

</Text>


<Text
style={styles.heroText}
>

Manage insurance policies,
renew plans and submit claims

</Text>


</View>





{

insurance ?

<InsuranceCard
data={insurance}
/>


:

<View style={styles.empty}>


<ShieldIcon/>


<Text
style={styles.emptyTitle}
>

No Insurance Added

</Text>


<Text
style={styles.emptyText}
>

Add your vehicle insurance
to track expiry and claims

</Text>



<TouchableOpacity
style={styles.primaryButton}
onPress={()=>navigation.navigate(
"RenewInsurance"
)}
>


<Plus color="white"/>

<Text
style={styles.buttonText}
>

Add Insurance

</Text>


</TouchableOpacity>



</View>


}




<View
style={styles.actions}
>



<TouchableOpacity
style={styles.card}
onPress={()=>navigation.navigate(
"RenewInsurance"
)}
>


<Text style={styles.icon}>
🔄
</Text>


<Text style={styles.cardTitle}>
Renew Insurance
</Text>


<Text>
Update your policy
</Text>


</TouchableOpacity>




<TouchableOpacity
style={styles.card}
onPress={()=>navigation.navigate(
"SubmitClaim"
)}
>


<Text style={styles.icon}>
📄
</Text>


<Text style={styles.cardTitle}>
Submit Claim
</Text>


<Text>
Report vehicle damage
</Text>


</TouchableOpacity>



</View>



</View>

);

}



function ShieldIcon(){

return(

<View
style={{
fontSize:50
}}
>

<Text>
🛡️
</Text>

</View>

)

}