import React from "react";


import {

View,
Text,
TouchableOpacity,
Image,
ScrollView,
useWindowDimensions

}
from "react-native";



import {

ChevronLeft,
Download,
FileText

}
from "lucide-react-native";



import * as Print from "expo-print";

import * as Sharing from "expo-sharing";



import styles from "./styles";




export default function DocumentPreview({
route,
navigation
}){


const {
document
}=route.params;



const {
width
}=useWindowDimensions();





const downloadPDF=async()=>{


const html=`

<html>

<body>

<h1>
🚗 AutoSphere
</h1>


<h2>
${document.title}
</h2>


<hr/>


<p>
<b>Document Type:</b>
${document.type}
</p>


<p>
<b>Vehicle:</b>
${document.vehicleModel || "-" }
</p>


<p>
<b>Owner:</b>
${document.owner || "-" }
</p>


<p>
<b>Expiry:</b>
${document.expiryDate || "-" }
</p>


<p>
<b>Status:</b>
${document.status || "Valid"}
</p>


</body>

</html>

`;



const file=

await Print.printToFileAsync({

html

});



Sharing.shareAsync(
file.uri
);


};






return(


<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity

onPress={()=>navigation.goBack()}

>

<ChevronLeft size={28}/>

</TouchableOpacity>




<Text style={styles.title}>
Document Preview
</Text>



</View>





<ScrollView


showsVerticalScrollIndicator={false}


contentContainerStyle={{

alignItems:"center",

paddingBottom:120

}}



>



<View

style={[

styles.pdfCard,

{

width:

width > 600

?

500

:

width-40

}

]

}


>



<View style={styles.brand}>


<Text style={styles.logo}>
🚗
</Text>


<Text style={styles.company}>
AutoSphere
</Text>


</View>





<Text style={styles.heading}>
{document.title}
</Text>



<View style={styles.line}/>





<Text style={styles.label}>
Document Type
</Text>


<Text style={styles.value}>
{document.type}
</Text>





<Text style={styles.label}>
Vehicle
</Text>


<Text style={styles.value}>
{
document.vehicleModel || "Not Available"
}
</Text>





<Text style={styles.label}>
Owner
</Text>


<Text style={styles.value}>
{
document.owner || "Not Available"
}
</Text>





<Text style={styles.label}>
Expiry Date
</Text>


<Text style={styles.value}>
{
document.expiryDate || "No Expiry"
}
</Text>





<Text style={styles.label}>
Status
</Text>


<Text style={styles.value}>
{
document.status || "Valid"
}
</Text>





<View style={styles.filePreview}>


{

document.file?.type==="image"


?


<Image

source={{

uri:document.file.uri

}}

style={styles.image}

/>



:


<>

<FileText

size={55}

color="#F97316"

/>


<Text style={styles.pdfText}>
PDF Document
</Text>


</>


}



</View>





</View>



</ScrollView>







<TouchableOpacity

style={styles.download}

onPress={downloadPDF}

>


<Download

color="white"

/>


<Text style={styles.downloadText}>
Download PDF
</Text>


</TouchableOpacity>



</View>


);

}