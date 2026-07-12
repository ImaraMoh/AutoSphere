import React,{
useState
}
from "react";


import {

View,
Text,
TextInput,
TouchableOpacity,
Alert

}
from "react-native";


import {
Ionicons
}
from "@expo/vector-icons";


import styles from "./styles";



export default function ChangePassword({
navigation
}){


const [
oldPassword,
setOldPassword
]
=
useState("");



const [
newPassword,
setNewPassword
]
=
useState("");



const [
confirmPassword,
setConfirmPassword
]
=
useState("");





function updatePassword(){


if(!oldPassword || !newPassword){

Alert.alert(
"Error",
"Please fill all fields"
);

return;

}



if(newPassword!==confirmPassword){

Alert.alert(
"Error",
"Passwords do not match"
);

return;

}



Alert.alert(
"Success",
"Password updated successfully"
);


navigation.goBack();


}







return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity

onPress={()=>navigation.goBack()}

>

<Ionicons

name="arrow-back"

size={25}

color="#0F172A"

/>

</TouchableOpacity>


<Text style={styles.title}>
Change Password
</Text>


</View>







<Text style={styles.label}>
Current Password
</Text>


<TextInput

secureTextEntry

style={styles.input}

value={oldPassword}

onChangeText={setOldPassword}

/>







<Text style={styles.label}>
New Password
</Text>


<TextInput

secureTextEntry

style={styles.input}

value={newPassword}

onChangeText={setNewPassword}

/>







<Text style={styles.label}>
Confirm Password
</Text>


<TextInput

secureTextEntry

style={styles.input}

value={confirmPassword}

onChangeText={setConfirmPassword}

/>








<TouchableOpacity

style={styles.button}

onPress={updatePassword}

>


<Text style={styles.buttonText}>
Update Password
</Text>


</TouchableOpacity>





</View>


)

}