import React,{useState} from "react";

import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet
} from "react-native";


import {
getReminders,
saveReminders
}
from "../../services/reminderStorage";


export default function AddReminder({navigation}){


const [reminder,setReminder]=useState({

title:"",
date:"",
type:""

});



const save=async()=>{


const old =
await getReminders();



const newReminder={

id:Date.now(),

title:reminder.title,

date:reminder.date,

type:reminder.type,

status:"Upcoming"

};



await saveReminders([

...old,

newReminder

]);



navigation.goBack();


};



return(

<View style={styles.container}>


<Text style={styles.title}>
Add Reminder
</Text>



<TextInput

placeholder="Reminder Title"

style={styles.input}

onChangeText={(text)=>

setReminder({

...reminder,

title:text

})

}

/>



<TextInput

placeholder="Reminder Type"

style={styles.input}

onChangeText={(text)=>

setReminder({

...reminder,

type:text

})

}

/>



<TextInput

placeholder="Date"

style={styles.input}

onChangeText={(text)=>

setReminder({

...reminder,

date:text

})

}

/>



<TouchableOpacity

style={styles.button}

onPress={save}

>


<Text style={styles.buttonText}>
Save Reminder
</Text>


</TouchableOpacity>



</View>

)


}



const styles=StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:"#F8FAFC"
},

title:{
fontSize:28,
fontWeight:"bold"
},

input:{
backgroundColor:"#fff",
borderWidth:1,
borderColor:"#ddd",
padding:12,
borderRadius:10,
marginTop:15
},

button:{
backgroundColor:"#F97316",
padding:15,
borderRadius:10,
marginTop:20
},

buttonText:{
color:"#fff",
textAlign:"center",
fontWeight:"bold"
}

});