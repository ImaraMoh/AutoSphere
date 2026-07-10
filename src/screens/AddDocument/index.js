import React, { useState } from "react";

import {
View,
Text,
TextInput,
TouchableOpacity,
ScrollView,
Alert
}
from "react-native";

import {
ChevronLeft,
Calendar,
Upload
}
from "lucide-react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
saveDocument
}
from "../../services/documentStorage";


import styles from "./styles";


export default function AddDocument({
navigation
}){


const [title,setTitle]=useState("");

const [type,setType]=useState("");

const [customType,setCustomType]=useState("");

const [expiryDate,setExpiryDate]=useState("");

const [showDate,setShowDate]=useState(false);


const types=[

"Insurance",
"Registration",
"License",
"Service",
"Warranty",
"Other"

];



const handleSave=async()=>{


const finalType =
type==="Other"
?
customType
:
type;



if(
!title ||
!finalType
){

Alert.alert(
"Missing Fields",
"Please complete required details"
);

return;

}



const document={


id:
Date.now().toString(),


title:title,


type:finalType,


expiryDate:
expiryDate,


status:
"Valid",


createdAt:
new Date().toISOString()


};



await saveDocument(document);



Alert.alert(
"Success",
"Document added successfully"
);



navigation.goBack();



};



return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft
size={28}
/>

</TouchableOpacity>



<Text style={styles.headerTitle}>
Add Document
</Text>


</View>



<ScrollView
showsVerticalScrollIndicator={false}
>



<Text style={styles.label}>
Document Title *
</Text>


<TextInput

style={styles.input}

placeholder="Example: Vehicle Insurance"

value={title}

onChangeText={setTitle}

/>



<Text style={styles.label}>
Document Type *
</Text>



<View style={styles.typeContainer}>


{
types.map(item=>(


<TouchableOpacity

key={item}

onPress={()=>setType(item)}

style={

type===item
?
styles.selectedType
:
styles.typeButton

}

>


<Text

style={

type===item
?
styles.selectedText
:
styles.typeText

}

>

{item}

</Text>


</TouchableOpacity>


))

}


</View>



{
type==="Other" &&


<>


<Text style={styles.label}>
Custom Document Type
</Text>


<TextInput

style={styles.input}

placeholder="Enter document type"

value={customType}

onChangeText={setCustomType}

/>


</>


}



<Text style={styles.label}>
Expiry Date
</Text>



<TouchableOpacity

style={styles.dateBox}

onPress={()=>setShowDate(true)}

>


<Calendar
size={22}
color="#F97316"
/>


<Text>

{
expiryDate
?
expiryDate
:
"Select expiry date"

}

</Text>


</TouchableOpacity>




{
showDate &&


<DateTimePicker

value={
new Date()
}

mode="date"

display="default"

onChange={(event,date)=>{


setShowDate(false);


if(date){


const formatted =

`${date.getDate()}/${
date.getMonth()+1
}/${
date.getFullYear()
}`;


setExpiryDate(formatted);


}


}}


/>


}




<Text style={styles.label}>
Upload Document
</Text>


<TouchableOpacity

style={styles.uploadBox}

>


<Upload
size={30}
color="#F97316"
/>


<Text>
Upload Image / PDF
</Text>


</TouchableOpacity>




<TouchableOpacity

style={styles.saveButton}

onPress={handleSave}

>


<Text style={styles.saveText}>
Save Document
</Text>


</TouchableOpacity>



</ScrollView>


</View>

);

}