import React, {
useRef,
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
CameraView,
CameraType,
useCameraPermissions
}
from "expo-camera";


import {
Camera,
RefreshCcw,
Zap,
ZapOff,
X
}
from "lucide-react-native";


export default function CameraComponent({
onCapture,
onClose
}){


const cameraRef = useRef(null);


const [facing,setFacing]=useState("back");

const [flash,setFlash]=useState(false);


const [permission,
requestPermission]=useCameraPermissions();



if(!permission)
{
return null;
}



if(!permission.granted)
{

return(

<View
style={{
flex:1,
justifyContent:"center",
alignItems:"center"
}}
>


<Text>
Camera permission required
</Text>


<TouchableOpacity

onPress={requestPermission}

>

<Text>
Allow Camera
</Text>

</TouchableOpacity>


</View>

);

}



const captureImage=async()=>{


if(cameraRef.current)
{


const photo=

await cameraRef.current.takePictureAsync();


onCapture(photo.uri);


}


};



return(

<View
style={{
flex:1
}}
>


<CameraView

ref={cameraRef}

style={{
flex:1
}}

facing={facing}

enableTorch={flash}


/>



<View

style={{

position:"absolute",

bottom:40,

left:20,

right:20,

flexDirection:"row",

justifyContent:"space-around"

}}

>


<TouchableOpacity

onPress={()=>setFlash(!flash)}

>

{

flash?

<ZapOff
color="white"
/>

:

<Zap
color="white"
/>

}


</TouchableOpacity>




<TouchableOpacity

onPress={captureImage}

style={{

backgroundColor:"#F97316",

width:70,

height:70,

borderRadius:35,

alignItems:"center",

justifyContent:"center"

}}

>


<Camera

color="white"

size={35}

/>


</TouchableOpacity>




<TouchableOpacity

onPress={()=>

setFacing(

current=>

current==="back"

?

"front"

:

"back"

)

}

>

<RefreshCcw

color="white"

/>

</TouchableOpacity>




<TouchableOpacity

onPress={onClose}

>

<X

color="white"

/>

</TouchableOpacity>



</View>



</View>


);


}