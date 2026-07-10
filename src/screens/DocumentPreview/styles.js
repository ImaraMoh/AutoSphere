import {
StyleSheet
}
from "react-native";


export default StyleSheet.create({


container:{

flex:1,

backgroundColor:"#F8FAFC",

padding:20

},



header:{

flexDirection:"row",

alignItems:"center",

gap:15,

marginBottom:15

},



title:{

fontSize:22,

fontWeight:"800",

flexShrink:1

},




pdfCard:{

backgroundColor:"#FFFFFF",

borderRadius:25,

padding:25,

marginTop:10,


shadowColor:"#000",

shadowOpacity:0.12,

shadowRadius:10,

shadowOffset:{

width:0,

height:4

}

},




brand:{

alignItems:"center",

marginBottom:20

},



logo:{

fontSize:45

},



company:{

fontSize:22,

fontWeight:"800",

color:"#F97316"

},



heading:{

fontSize:20,

fontWeight:"700",

textAlign:"center",

marginBottom:20

},




line:{

height:1,

backgroundColor:"#E5E7EB",

marginBottom:20

},




label:{

fontSize:13,

color:"#6B7280",

marginTop:12

},




value:{

fontSize:16,

fontWeight:"700",

marginTop:4

},




filePreview:{

height:220,

borderRadius:20,

backgroundColor:"#F3F4F6",

marginTop:25,

alignItems:"center",

justifyContent:"center",

overflow:"hidden"

},



image:{

width:"100%",

height:"100%",

resizeMode:"contain"

},



pdfText:{

marginTop:12,

fontWeight:"700"

},




download:{

position:"absolute",

bottom:20,

left:20,

right:20,

height:58,

backgroundColor:"#F97316",

borderRadius:18,

flexDirection:"row",

alignItems:"center",

justifyContent:"center",

gap:10

},



downloadText:{

color:"#FFFFFF",

fontSize:16,

fontWeight:"700"

}


});