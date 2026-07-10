import {
StyleSheet
}
from "react-native";


export default StyleSheet.create({


container:{

flex:1,

backgroundColor:"#F8FAFC",

paddingHorizontal:20,

paddingTop:20

},



header:{

flexDirection:"row",

alignItems:"center",

gap:15,

marginBottom:30

},



title:{

fontSize:24,

fontWeight:"800",

color:"#0D1117"

},



input:{

backgroundColor:"#FFFFFF",

height:52,

borderRadius:14,

paddingHorizontal:16,

fontSize:15,

color:"#111827",

marginBottom:16,


borderWidth:1,

borderColor:"#E5E7EB"


},




dateBox:{

height:55,

backgroundColor:"#FFFFFF",

borderRadius:14,

paddingHorizontal:16,

flexDirection:"row",

alignItems:"center",

gap:12,

marginBottom:18,


borderWidth:1,

borderColor:"#E5E7EB"

},



upload:{

height:55,

backgroundColor:"#FFFFFF",

borderRadius:14,

flexDirection:"row",

alignItems:"center",

justifyContent:"center",

gap:10,


marginBottom:15,


borderWidth:1,

borderColor:"#F97316"

},



save:{

height:58,

backgroundColor:"#F97316",

borderRadius:16,

alignItems:"center",

justifyContent:"center",

marginTop:20,


shadowColor:"#000",

shadowOpacity:0.15,

shadowRadius:5,

shadowOffset:{

width:0,

height:3

}

},



saveText:{

color:"#FFFFFF",

fontSize:16,

fontWeight:"700"

}


});