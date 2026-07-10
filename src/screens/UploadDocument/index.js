import React,{useState} from "react";

import {
View,
Text,
TextInput,
TouchableOpacity,
ScrollView,
Alert,
Platform
}
from "react-native";


import {
ChevronLeft,
Calendar,
Upload
}
from "lucide-react-native";


import DateTimePicker from "@react-native-community/datetimepicker";


import * as ImagePicker from "expo-image-picker";

import * as DocumentPicker from "expo-document-picker";


import {
saveDocument
}
from "../../services/documentStorage";


import styles from "./styles";



export default function UploadDocument({
navigation
}){


const [title,setTitle]=useState("");

const [type,setType]=useState("");

const [customType,setCustomType]=useState("");

const [expiry,setExpiry]=useState("");

const [file,setFile]=useState(null);


const [vehicleModel,setVehicleModel]=useState("");

const [registrationNumber,setRegistrationNumber]=useState("");

const [owner,setOwner]=useState("");


const [showDate,setShowDate]=useState(false);



const types=[

"Insurance",
"Registration",
"License",
"Service",
"Warranty",
"Other"

];



const pickImage=async()=>{


const result =
await ImagePicker.launchImageLibraryAsync({

mediaTypes:["images"],

quality:0.8

});


if(!result.canceled){


setFile({

uri:result.assets[0].uri,

type:"image"

});


}

};





const pickPDF=async()=>{


const result =
await DocumentPicker.getDocumentAsync({

type:"application/pdf"

});


if(!result.canceled){


setFile({

uri:result.assets[0].uri,

type:"pdf"

});


}

};






const save=async()=>{


const finalType =
type==="Other"
?
customType
:
type;



if(
!title ||
!finalType ||
!file
){

Alert.alert(
"Missing",
"Document name, type and file are required"
);

return;

}




const document={


id:Date.now().toString(),


title,


type:finalType,


vehicleModel,

registrationNumber,

owner,


expiryDate:expiry,


file,


status:"Valid",


createdAt:
new Date().toISOString()

};



await saveDocument(document);



Alert.alert(
"Success",
"Document saved"
);



navigation.goBack();



};




return(


<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft/>

</TouchableOpacity>


<Text style={styles.title}>
Upload Document
</Text>


</View>



<ScrollView>


<Input

label="Document Name"

value={title}

setValue={setTitle}

placeholder="Insurance Certificate"

/>



<Input

label="Vehicle Model"

value={vehicleModel}

setValue={setVehicleModel}

placeholder="Toyota Corolla"

/>



<Input

label="Registration Number"

value={registrationNumber}

setValue={setRegistrationNumber}

placeholder="ABC123"

/>



<Input

label="Owner"

value={owner}

setValue={setOwner}

placeholder="Owner name"

/>



<Text style={styles.label}>
Document Type
</Text>



<View style={styles.types}>


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
styles.type
}

>

<Text>
{item}
</Text>


</TouchableOpacity>

))

}

</View>




{
type==="Other" &&

<TextInput

style={styles.input}

placeholder="Enter type"

value={customType}

onChangeText={setCustomType}

/>

}




<Text style={styles.label}>
Expiry Date
</Text>



<TouchableOpacity

style={styles.dateBox}

onPress={()=>setShowDate(true)}

>

<Calendar
color="#F97316"
/>

<Text>

{expiry || "Select Date"}

</Text>

</TouchableOpacity>




{
Platform.OS==="web"

&&

showDate

&&

<input

type="date"

style={{

marginTop:10,

padding:10

}}

onChange={(e)=>

{

setExpiry(e.target.value);

setShowDate(false);

}

}

/>

}





{
Platform.OS!=="web"
&&
showDate
&&

<DateTimePicker

value={new Date()}

mode="date"

onChange={(e,date)=>{


setShowDate(false);


if(date){

setExpiry(

date.toLocaleDateString()

);

}

}}

/>

}





<Text style={styles.label}>
Upload File
</Text>




<TouchableOpacity

style={styles.upload}

onPress={pickImage}

>

<Upload/>

<Text>

{
file?.type==="image"

?
"Image Selected"

:

"Upload Image"

}

</Text>


</TouchableOpacity>



<TouchableOpacity

style={styles.pdf}

onPress={pickPDF}

>


<Text>

{
file?.type==="pdf"

?
"PDF Selected"

:

"Upload PDF"

}

</Text>


</TouchableOpacity>




<TouchableOpacity

style={styles.save}

onPress={save}

>

<Text style={styles.saveText}>
Save Document
</Text>

</TouchableOpacity>



</ScrollView>


</View>


);

}




function Input({
label,
value,
setValue,
placeholder
}){


return(

<>

<Text style={styles.label}>
{label}
</Text>


<TextInput

style={styles.input}

value={value}

onChangeText={setValue}

placeholder={placeholder}

/>


</>

)

}