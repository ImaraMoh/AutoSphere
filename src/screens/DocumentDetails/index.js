import React from "react";


import {
View,
Text,
TouchableOpacity,
ScrollView,
Image,
Alert
}
from "react-native";


import {
ChevronLeft,
Eye,
Edit3,
Trash2,
FileText
}
from "lucide-react-native";


import {
deleteDocument
}
from "../../services/documentStorage";


import styles from "./styles";



export default function DocumentDetails({
route,
navigation
}){


const {
document
}=route.params;



const remove=()=>{


Alert.alert(

"Delete Document",

"Delete this document?",

[

{
text:"Cancel"
},

{

text:"Delete",

style:"destructive",

onPress:async()=>{

await deleteDocument(document.id);

navigation.goBack();

}

}

]

);


};




return(


<ScrollView

style={styles.container}

showsVerticalScrollIndicator={false}

>



<View style={styles.header}>


<TouchableOpacity

onPress={()=>navigation.goBack()}

>

<ChevronLeft size={28}/>

</TouchableOpacity>



<Text style={styles.title}>
Document Details
</Text>


</View>





<View style={styles.card}>


<View style={styles.fileHeader}>


<FileText

size={35}

color="#F97316"

/>


<View>

<Text style={styles.docTitle}>
{document.title}
</Text>


<Text style={styles.type}>
{document.type}
</Text>


</View>


</View>






<Text style={styles.sectionTitle}>
Document Preview
</Text>




<TouchableOpacity

style={styles.previewBox}

onPress={()=>


navigation.navigate(

"DocumentPreview",

{
document
}

)

}

>



{

document.file?.type==="image"

?


<Image

source={{

uri:document.file.uri

}}

style={styles.thumbnail}

/>



:


<View style={styles.pdfBox}>


<FileText

size={45}

color="#F97316"

/>


<Text style={styles.pdfText}>
PDF Document
</Text>


</View>


}



</TouchableOpacity>








<Text style={styles.sectionTitle}>
Information
</Text>




<Info

label="Document Type"

value={document.type}

/>



<Info

label="Vehicle"

value={
document.vehicleModel || "Not Available"
}

/>




<Info

label="Registration"

value={
document.registrationNumber || "Not Available"
}

/>




<Info

label="Owner"

value={
document.owner || "Not Available"
}

/>




<Info

label="Expiry Date"

value={
document.expiryDate || "No Expiry"
}

/>




</View>







<View style={styles.actions}>


<TouchableOpacity

style={styles.button}

onPress={()=>


navigation.navigate(

"DocumentPreview",

{
document
}

)

}

>

<Eye color="#F97316"/>

<Text>
Preview
</Text>


</TouchableOpacity>







<TouchableOpacity

style={styles.button}

onPress={()=>


navigation.navigate(

"EditDocument",

{
document
}

)

}

>


<Edit3 color="#2563EB"/>


<Text>
Edit
</Text>


</TouchableOpacity>







<TouchableOpacity

style={[
styles.button,
styles.delete
]}

onPress={remove}

>


<Trash2 color="#DC2626"/>


<Text style={styles.deleteText}>
Delete
</Text>


</TouchableOpacity>



</View>



</ScrollView>


);

}





function Info({
label,
value
}){


return(

<View style={styles.info}>


<Text style={styles.label}>
{label}
</Text>


<Text style={styles.value}>
{value}
</Text>


</View>

);

}