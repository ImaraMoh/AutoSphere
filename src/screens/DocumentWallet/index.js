import React,{useState,useCallback} from "react";

import {
View,
Text,
ScrollView,
TouchableOpacity
} from "react-native";


import {
Ionicons
} from "@expo/vector-icons";


import {
useFocusEffect
} from "@react-navigation/native";


import AppHeader from "../../components/AppHeader";


import {
getDocuments
} from "../../services/documentStorage";


import styles from "./styles";


export default function DocumentWallet({navigation}){


const [documents,setDocuments]=useState([]);



useFocusEffect(

useCallback(()=>{

load();

},[])

);



const load=async()=>{

const data=await getDocuments();

setDocuments(data);

};



return(

<View style={styles.container}>


<AppHeader
title="Document Wallet"
navigation={navigation}
/>



<ScrollView
contentContainerStyle={{padding:20}}
>



{
documents.length===0 ?

<View style={styles.empty}>


<Ionicons
name="document-outline"
size={80}
color="#F97316"
/>


<Text>
No Documents Added
</Text>


</View>


:


documents.map(item=>(


<View
key={item.id}
style={styles.card}
>


<Text style={styles.title}>
{item.name}
</Text>


<Text>
Type : {item.type}
</Text>


<Text>
Expiry : {item.expiry}
</Text>


<Text style={styles.valid}>
● Valid
</Text>


</View>


))

}




<TouchableOpacity

style={styles.fab}

onPress={()=>navigation.navigate("UploadDocument")}

>

<Ionicons
name="add"
size={30}
color="white"
/>


</TouchableOpacity>


</ScrollView>


</View>

)

}