import React from "react";


import {
View,
Text,
TouchableOpacity,
Alert
}
from "react-native";


import {
createDocumentObject
}
from "../../services/documentAIService";


import {
saveDocument
}
from "../../services/documentStorage";


import {
createExpiryReminder
}
from "../../services/reminderStorage";


import styles from "./styles";



export default function DocumentAutoFill({
route,
navigation
}){


const {

vehicleData,

ocrText

}=route.params;



const saveData=async()=>{


const document =

createDocumentObject(

vehicleData,

ocrText

);



await saveDocument(
document
);



await createExpiryReminder(
document
);



Alert.alert(
"Success",
"Document saved successfully"
);



navigation.navigate(
"DocumentWallet"
);


};



return(

<View style={styles.container}>


<Text style={styles.title}>
Detected Information
</Text>


<Text>
Type:
Registration
</Text>


<Text>
Registration:
{vehicleData.registrationNumber}
</Text>


<Text>
Owner:
{vehicleData.ownerName}
</Text>


<Text>
Vehicle:
{vehicleData.vehicleModel}
</Text>


<Text>
Expiry:
{vehicleData.expiryDate}
</Text>



<TouchableOpacity

style={styles.button}

onPress={saveData}

>


<Text style={styles.buttonText}>
Save To Wallet
</Text>


</TouchableOpacity>



</View>

);

}