import React,{useState} from "react";


import {
View,
Text,
TextInput,
TouchableOpacity,
Image
}
from "react-native";


import * as ImagePicker from "expo-image-picker";


import {saveVehicle} from "../../services/storage";



export default function AddVehicle({navigation}){


const [image,setImage]=useState(null);


const [vehicle,setVehicle]=useState({

brand:"",
model:"",
year:"",
fuel:"",
mileage:"",
registration:""

});




const pickImage=async()=>{


const result=
await ImagePicker.launchImageLibraryAsync({

mediaTypes:["images"],

quality:1

});


if(!result.canceled){

setImage(result.assets[0].uri);

}


}




const save=async()=>{


await saveVehicle({

...vehicle,

image

});


navigation.goBack();


}




return(

<View
style={{
padding:20
}}
>


<Text
style={{
fontSize:28,
fontWeight:"bold"
}}
>

Add Vehicle

</Text>



<TouchableOpacity
onPress={pickImage}
>

{
image ?

<Image

source={{
uri:image
}}

style={{
height:120,
width:120,
borderRadius:60
}}

/>

:

<Text>
Upload Vehicle Image
</Text>

}


</TouchableOpacity>




{
[
"brand",
"model",
"year",
"fuel",
"mileage",
"registration"

].map(item=>(


<TextInput

key={item}

placeholder={item}

style={{

borderWidth:1,

borderColor:"#ddd",

padding:12,

marginTop:10,

borderRadius:10

}}

onChangeText={(text)=>

setVehicle({

...vehicle,

[item]:text

})

}


/>


))

}





<TouchableOpacity

onPress={save}

style={{

backgroundColor:"#F97316",

padding:15,

marginTop:20,

borderRadius:10

}}

>


<Text
style={{
color:"white",
textAlign:"center"
}}
>

Save Vehicle

</Text>


</TouchableOpacity>




</View>


)


}