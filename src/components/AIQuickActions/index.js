import React from "react";

import {
View,
TouchableOpacity,
Text,
ScrollView
}
from "react-native";


import {

Wrench,
Fuel,
Settings,
WalletCards

}
from "lucide-react-native";



export default function AIQuickActions({
onSelect
}){


const actions=[

{
title:"Diagnose",
icon:Wrench,
prompt:"Diagnose my vehicle problem"
},

{
title:"Fuel",
icon:Fuel,
prompt:"Give me fuel efficiency advice"
},

{
title:"Service",
icon:Settings,
prompt:"Give me maintenance tips"
},

{
title:"Expenses",
icon:WalletCards,
prompt:"Analyze my vehicle expenses"
}

];



return(

<View style={styles.wrapper}>


<ScrollView

horizontal

showsHorizontalScrollIndicator={false}

contentContainerStyle={styles.container}

>


{

actions.map(item=>{


const Icon=item.icon;


return(


<TouchableOpacity


activeOpacity={0.7}


key={item.title}


style={styles.chip}


onPress={()=>onSelect(item.prompt)}


>


<Icon

size={14}

strokeWidth={2}

color="#F97316"

/>



<Text style={styles.text}>

{item.title}

</Text>


</TouchableOpacity>


)

})

}



</ScrollView>


</View>

)

}



const styles={


wrapper:{


width:"100%",


},



container:{


paddingHorizontal:12,

paddingVertical:6,

alignItems:"center",

gap:8,


},



chip:{


height:34,


paddingHorizontal:13,


borderRadius:18,


backgroundColor:"#FFFFFF",


borderWidth:1,


borderColor:"#E5E7EB",


flexDirection:"row",


alignItems:"center",


justifyContent:"center",


gap:6,


// subtle shadow

shadowColor:"#000",

shadowOpacity:0.04,

shadowRadius:3,

elevation:1


},



text:{


fontSize:12,


fontWeight:"600",


color:"#334155"


}


};