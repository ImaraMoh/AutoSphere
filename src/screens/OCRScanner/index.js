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
ChevronLeft,
Camera,
Images
}
from "lucide-react-native";


import * as ImagePicker
from "expo-image-picker";


import CameraComponent
from "../../components/CameraView";


import styles from "./styles";



export default function OCRScanner({
navigation
}){


const [openCamera,setOpenCamera]=useState(false);



const selectImage=async()=>{


const result=

await ImagePicker.launchImageLibraryAsync({

mediaTypes:
["images"],

quality:1

});



if(!result.canceled)
{


navigation.navigate(

"ScanPreview",

{

image:
result.assets[0].uri

}

);


}


};



if(openCamera)
{

return(

<CameraComponent

onClose={()=>

setOpenCamera(false)

}


onCapture={(uri)=>{


setOpenCamera(false);


navigation.navigate(

"ScanPreview",

{

image:uri

}

);


}}

/>

);

}



return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity

onPress={()=>navigation.goBack()}

>

<ChevronLeft size={30}/>

</TouchableOpacity>



<Text style={styles.title}>
OCR Scanner
</Text>


</View>



<View style={styles.hero}>


<Text style={styles.heroTitle}>

📷 Scan Vehicle Documents

</Text>


<Text style={styles.heroText}>

Capture registration cards,
insurance and licenses

</Text>


</View>



<TouchableOpacity

style={styles.scanButton}

onPress={()=>setOpenCamera(true)}

>


<Camera color="white"/>


<Text style={styles.buttonText}>

Open Camera

</Text>


</TouchableOpacity>




<TouchableOpacity

style={styles.galleryButton}

onPress={selectImage}

>


<Images color="#F97316"/>


<Text style={styles.galleryText}>

Choose Image

</Text>


</TouchableOpacity>



</View>

);


}