import React, {
useState,
useEffect
}
from "react";


import {

View,
Text,
TextInput,
ScrollView,
TouchableOpacity,
Image,
ActivityIndicator,
Alert,
Platform

}
from "react-native";


import {
Ionicons
}
from "@expo/vector-icons";


import * as ImagePicker from "expo-image-picker";


import {

getProfile,
saveProfile

}
from "../../services/profileStorage";


import styles from "./styles";





export default function EditProfile({

navigation

}){



const [profile,setProfile]=useState({

name:"",
email:"",
phone:"",
image:null

});



const [saving,setSaving]=useState(false);



const [loading,setLoading]=useState(true);





useEffect(()=>{

loadProfile();

},[]);





async function loadProfile(){


try{


const data =
await getProfile();



if(data){


setProfile({

name:data.name || "",

email:data.email || "",

phone:data.phone || "",

image:data.image || null

});


}


}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


}







function updateField(
key,
value
){


setProfile(prev=>({

...prev,

[key]:value

}));


}









async function pickImage(){


try{


const permission =
await ImagePicker.requestMediaLibraryPermissionsAsync();



if(!permission.granted){


Alert.alert(

"Permission Required",

"Please allow photo access"

);


return;

}





const result =
await ImagePicker.launchImageLibraryAsync({

mediaTypes:["images"],

allowsEditing:true,

aspect:[1,1],

quality:0.7


});





if(result.canceled)

return;





const asset =
result.assets[0];



let imageUri =
asset.uri;





/*
 WEB FIX

Blob URL disappears after reload.
Convert to Base64.

*/


if(Platform.OS==="web"){



const response =
await fetch(imageUri);



const blob =
await response.blob();



const reader =
new FileReader();



imageUri =
await new Promise((resolve)=>{


reader.onloadend=()=>{

resolve(reader.result);

};


reader.readAsDataURL(blob);


});



}






setProfile(prev=>({

...prev,

image:imageUri

}));




}

catch(error){


console.log(
"IMAGE ERROR",
error
);


Alert.alert(

"Error",

"Unable to select image"

);


}



}









async function saveChanges(){



if(saving)

return;




if(!profile.name.trim()){



Alert.alert(

"Missing Name",

"Please enter your name"

);


return;


}





try{


setSaving(true);



const result =
await saveProfile(profile);




Alert.alert(

"Success",

"Profile updated successfully",

[

{

text:"OK",

onPress:()=>navigation.goBack()

}

]

);



}

catch(error){


console.log(

"SAVE ERROR",

error

);



Alert.alert(

"Error",

"Unable to save profile"

);


}

finally{


setSaving(false);


}


}









if(loading){


return(


<View style={styles.loading}>


<ActivityIndicator

size="large"

color="#F97316"

/>


</View>


)

}









return(


<View style={styles.container}>


{/* HEADER */}


<View style={styles.header}>



<TouchableOpacity

style={styles.backButton}

onPress={()=>navigation.goBack()}

>


<Ionicons

name="arrow-back"

size={24}

color="#0F172A"

/>


</TouchableOpacity>





<Text style={styles.title}>

Edit Profile

</Text>




<View style={{width:40}}/>


</View>









<ScrollView


showsVerticalScrollIndicator={false}


contentContainerStyle={styles.scroll}


>







{/* PROFILE IMAGE */}



<TouchableOpacity


style={styles.imageContainer}


onPress={pickImage}


activeOpacity={0.8}


>



{


profile.image ?



<Image


source={{

uri:profile.image

}}


style={styles.avatar}


/>


:



<View style={styles.placeholder}>


<Ionicons

name="person"

size={65}

color="#F97316"

/>


</View>



}






<View style={styles.camera}>


<Ionicons

name="camera"

size={18}

color="white"

/>


</View>





</TouchableOpacity>








<Text style={styles.changePhoto}>

Tap to change profile photo

</Text>









{/* FORM CARD */}



<View style={styles.card}>


<Input

label="Full Name"

icon="person-outline"

value={profile.name}

onChangeText={(v)=>

updateField(

"name",

v

)

}

/>





<Input

label="Email"

icon="mail-outline"

value={profile.email}

keyboardType="email-address"

onChangeText={(v)=>

updateField(

"email",

v

)

}

/>






<Input

label="Phone Number"

icon="call-outline"

value={profile.phone}

keyboardType="phone-pad"

onChangeText={(v)=>

updateField(

"phone",

v

)

}

/>



</View>









{/* SAVE BUTTON */}



<TouchableOpacity


style={[

styles.saveButton,

saving && {
opacity:0.6
}

]}



disabled={saving}



onPress={saveChanges}



>



{


saving ?



<ActivityIndicator

color="white"

/>


:


<>


<Ionicons

name="save-outline"

size={20}

color="white"

/>



<Text style={styles.saveText}>

Save Changes

</Text>



</>


}



</TouchableOpacity>






</ScrollView>






</View>


)



}









function Input({

label,

icon,

...props

}){


return(



<View style={styles.inputContainer}>


<Text style={styles.label}>

{label}

</Text>



<View style={styles.inputBox}>


<Ionicons

name={icon}

size={20}

color="#F97316"

/>



<TextInput


style={styles.input}


placeholder={label}


placeholderTextColor="#94A3B8"


{...props}


/>



</View>



</View>



)

}