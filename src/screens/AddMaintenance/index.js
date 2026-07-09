import React,{useState} from "react";


import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet
}
from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
getMaintenance,
saveMaintenance
}
from "../../services/maintenanceStorage";



export default function AddMaintenance({navigation}){


const [service,setService]=useState({

garage:"",
repair:"",
cost:"",
date:""

});



const save=async()=>{


const old=
await getMaintenance();



const newData={

id:Date.now(),

...service

};



await saveMaintenance([

...old,

newData

]);



navigation.goBack();


};



return(

<View style={styles.container}>

<View style={{
flexDirection:"row",
alignItems:"center",
gap:10,
marginBottom:15
}}>

<TouchableOpacity onPress={()=>navigation.goBack()}>
<Ionicons name="arrow-back" size={25} color="#0D1117" />
</TouchableOpacity>

<Text style={styles.title}>
Add Service Record
</Text>

</View>


<TextInput

placeholder="Garage Name"

style={styles.input}

onChangeText={(t)=>

setService({
...service,
garage:t
})

}

/>



<TextInput

placeholder="Repair Completed"

style={styles.input}

onChangeText={(t)=>

setService({
...service,
repair:t
})

}

/>



<TextInput

placeholder="Cost"

style={styles.input}

onChangeText={(t)=>

setService({
...service,
cost:t
})

}

/>



<TextInput

placeholder="Service Date"

style={styles.input}

onChangeText={(t)=>

setService({
...service,
date:t
})

}

/>



<TouchableOpacity

style={styles.button}

onPress={save}

>


<Text style={styles.buttonText}>
Save Service
</Text>


</TouchableOpacity>


</View>

)

}



const styles=StyleSheet.create({

container:{
padding:20
},

title:{
fontSize:28,
fontWeight:"bold"
},

input:{
borderWidth:1,
borderColor:"#ddd",
padding:12,
borderRadius:10,
marginTop:15
},

button:{
backgroundColor:"#F97316",
padding:15,
marginTop:20,
borderRadius:10
},

buttonText:{
color:"#fff",
textAlign:"center"
}

});