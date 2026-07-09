import React,{
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
ChevronLeft
}
from "lucide-react-native";


import LoanCard from "../../components/LoanCard";


import styles from "./styles";



export default function Finance({
navigation
}){


const [loan,setLoan]=useState(null);



return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft size={30}/>

</TouchableOpacity>


<Text style={styles.title}>
Finance
</Text>


</View>



<View style={styles.hero}>


<Text style={styles.heroTitle}>

💳 Vehicle Finance

</Text>


<Text style={styles.heroText}>

Manage loans, EMI and payments

</Text>


</View>




{
loan ?

<LoanCard data={loan}/>


:

<View style={styles.empty}>


<Text style={styles.emptyIcon}>
💰
</Text>


<Text style={styles.emptyTitle}>
No Active Loan
</Text>


<Text>
Apply for vehicle finance easily
</Text>


</View>

}





<TouchableOpacity

style={styles.action}

onPress={()=>
navigation.navigate("EMICalculator")
}

>


<Text style={styles.actionText}>
🧮 EMI Calculator
</Text>


</TouchableOpacity>




<TouchableOpacity

style={styles.action}

onPress={()=>
navigation.navigate("LoanApplication")
}

>


<Text style={styles.actionText}>
📝 Apply Finance
</Text>


</TouchableOpacity>




<TouchableOpacity

style={styles.action}

onPress={()=>
navigation.navigate("PaymentSchedule")
}

>


<Text style={styles.actionText}>
📅 Payment Schedule
</Text>


</TouchableOpacity>



</View>


);


}