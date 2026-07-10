import React,{useState} from "react";


import {
View,
Text,
TextInput,
TouchableOpacity,
Platform
}
from "react-native";


import {
ChevronLeft,
Upload,
Calendar
}
from "lucide-react-native";


import DateTimePicker from "@react-native-community/datetimepicker";


import * as ImagePicker from "expo-image-picker";

import * as DocumentPicker from "expo-document-picker";


import {
updateDocument
}
from "../../services/documentStorage";


import styles from "./styles";




export default function EditDocument({
route,
navigation
}){


const {document}=route.params;



const [data,setData]=useState(document);


const [showDate,setShowDate]=useState(false);




const changeFile=async(type)=>{


if(type==="image"){


const result=
await ImagePicker.launchImageLibraryAsync({

mediaTypes:["images"]

});


if(!result.canceled){

setData({

...data,

file:{

uri:result.assets[0].uri,

type:"image"

}

});

}

}


else{


const result=
await DocumentPicker.getDocumentAsync({

type:"application/pdf"

});


if(!result.canceled){

setData({

...data,

file:{

uri:result.assets[0].uri,

type:"pdf"

}

});

}


}


};





const save=async()=>{


await updateDocument(data);


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
Edit Document
</Text>


</View>




<TextInput

style={styles.input}

value={data.title}

onChangeText={
v=>setData({...data,title:v})
}

/>




<TextInput

style={styles.input}

value={data.vehicleModel}

onChangeText={
v=>setData({...data,vehicleModel:v})
}

/>




<TextInput

style={styles.input}

value={data.owner}

onChangeText={
v=>setData({...data,owner:v})
}

/>




<TouchableOpacity

style={styles.dateBox}

onPress={()=>setShowDate(true)}

>


<Calendar/>


<Text>

{data.expiryDate}

</Text>


</TouchableOpacity>





{
Platform.OS==="web"
&&
showDate

&&

<input

type="date"

onChange={(e)=>{

setData({

...data,

expiryDate:e.target.value

});

setShowDate(false);

}}

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

if(date)

setData({

...data,

expiryDate:
date.toLocaleDateString()

});

}}

/>

}




<TouchableOpacity

style={styles.upload}

onPress={()=>changeFile("image")}

>

<Upload/>

<Text>
Change Image
</Text>

</TouchableOpacity>




<TouchableOpacity

style={styles.upload}

onPress={()=>changeFile("pdf")}

>

<Text>
Change PDF
</Text>

</TouchableOpacity>




<TouchableOpacity

style={styles.save}

onPress={save}

>

<Text style={styles.saveText}>
Save Changes
</Text>


</TouchableOpacity>



</View>

);


}