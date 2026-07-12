import React, {
useState
}
from "react";


import {

View,
Text,
ScrollView,
TouchableOpacity,
TextInput,
Image,
Alert

}
from "react-native";


import {

Ionicons

}
from "@expo/vector-icons";


import * as ImagePicker from "expo-image-picker";


import {

saveVehicle

}
from "../../services/vehicleStorage";
import * as FileSystem from "expo-file-system";

import styles from "./styles";





export default function AddVehicle({

navigation

}){



const [image,setImage]=useState(null);


const [vehicle,setVehicle]=useState({

type:"Car",

brand:"",

model:"",

year:"",

registration:"",

mileage:"",

fuel:""


});




const vehicleTypes=[

"Car",
"Bike",
"Van",
"Truck"

];



const fuelTypes=[

"Petrol",
"Diesel",
"Hybrid",
"Electric"

];





function updateField(
key,
value
){

setVehicle({

...vehicle,

[key]:value

});

}
const pickImage = async()=>{


const result =
await ImagePicker.launchImageLibraryAsync({

mediaTypes:["images"],

quality:0.7,

base64:true

});



if(!result.canceled){


const asset =
result.assets[0];



setImage({

uri:asset.uri,

base64:asset.base64

});


}


};
async function handleSave(){



if(
!vehicle.brand ||
!vehicle.model ||
!vehicle.registration
){

Alert.alert(

"Missing Information",

"Please enter vehicle brand, model and registration"

);

return;

}

await saveVehicle({

...vehicle,

image:image
?
`data:image/jpeg;base64,${image.base64}`
:
null,

id:Date.now().toString(),

healthScore:92,

createdAt:new Date().toISOString()

});


navigation.goBack();


}






return(


<View style={styles.container}>



{/* Header */}

<View style={styles.header}>


<TouchableOpacity

onPress={()=>navigation.goBack()}

>

<Ionicons

name="arrow-back"

size={26}

color="#0F172A"

/>


</TouchableOpacity>



<Text style={styles.title}>

Add Vehicle

</Text>


<View/>


</View>








<ScrollView

showsVerticalScrollIndicator={false}

contentContainerStyle={{

paddingBottom:40

}}

>




{/* Image Upload */}


<TouchableOpacity

style={styles.imagePicker}

onPress={pickImage}

>


{

image ?

<Image

source={{
uri:image
}}

style={styles.vehicleImage}

/>

:

<>

<Ionicons

name="camera"

size={45}

color="#F97316"

/>


<Text style={styles.uploadText}>

Upload Vehicle Image

</Text>

</>

}



</TouchableOpacity>








{/* Vehicle Type */}


<Text style={styles.label}>

Vehicle Type

</Text>



<View style={styles.row}>


{

vehicleTypes.map(item=>(


<TouchableOpacity

key={item}

style={[

styles.chip,

vehicle.type===item &&
styles.activeChip

]}

onPress={()=>updateField(
"type",
item
)}

>


<Text

style={[

styles.chipText,

vehicle.type===item &&
styles.activeChipText

]}

>

{item}

</Text>


</TouchableOpacity>


))


}


</View>








<Input

label="Brand"

placeholder="Toyota"

value={vehicle.brand}

onChangeText={
v=>updateField(
"brand",
v
)
}

/>




<Input

label="Model"

placeholder="Corolla"

value={vehicle.model}

onChangeText={
v=>updateField(
"model",
v
)
}

/>





<View style={styles.double}>


<Input

label="Year"

placeholder="2022"

keyboardType="numeric"

value={vehicle.year}

onChangeText={
v=>updateField(
"year",
v
)
}

/>



<Input

label="Mileage"

placeholder="87000"

keyboardType="numeric"

value={vehicle.mileage}

onChangeText={
v=>updateField(
"mileage",
v
)
}

/>



</View>







<Input

label="Registration Number"

placeholder="ABC-1234"

value={vehicle.registration}

onChangeText={
v=>updateField(
"registration",
v
)
}

/>







<Text style={styles.label}>

Fuel Type

</Text>




<View style={styles.row}>


{

fuelTypes.map(item=>(


<TouchableOpacity

key={item}

style={[

styles.chip,

vehicle.fuel===item &&
styles.activeChip

]}

onPress={()=>updateField(
"fuel",
item
)}

>


<Text

style={[

styles.chipText,

vehicle.fuel===item &&
styles.activeChipText

]}

>

{item}

</Text>


</TouchableOpacity>


))

}



</View>










<TouchableOpacity

style={styles.saveButton}

onPress={handleSave}

>


<Text style={styles.saveText}>

Save Vehicle

</Text>


</TouchableOpacity>






</ScrollView>







</View>


)

}





function Input({

label,

...props

}){


return(

<View style={styles.inputContainer}>


<Text style={styles.label}>

{label}

</Text>


<TextInput

style={styles.input}

{...props}

/>


</View>

)

}