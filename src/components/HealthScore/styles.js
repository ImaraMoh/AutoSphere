import {
StyleSheet
}
from "react-native";



export default StyleSheet.create({


card:{


backgroundColor:"#FFFFFF",

borderRadius:24,

padding:20,

shadowColor:"#000",

shadowOpacity:0.06,

shadowRadius:12,

elevation:4,

marginBottom:15


},






header:{


flexDirection:"row",

justifyContent:"space-between",

alignItems:"center"


},





title:{


fontSize:18,

fontWeight:"800",

color:"#0D1117"


},





status:{


marginTop:6,

fontSize:14,

fontWeight:"700",

color:"#16A34A"


},






scoreContainer:{


alignItems:"center"


},



score:{


fontSize:42,

fontWeight:"900",

color:"#F97316"


},



scoreLabel:{


fontSize:12,

color:"#64748B"


},







progressBg:{


height:10,

backgroundColor:"#E5E7EB",

borderRadius:20,

overflow:"hidden",

marginVertical:18


},





progress:{


height:10,

backgroundColor:"#F97316",

borderRadius:20


},







analysisBox:{


backgroundColor:"#FFF7ED",

borderRadius:16,

padding:15,

marginBottom:15


},






sectionTitle:{


fontSize:15,

fontWeight:"800",

color:"#0D1117",

marginBottom:10


},






analysisText:{


fontSize:14,

lineHeight:22,

color:"#374151"


},






insights:{


marginTop:5


},






item:{


flexDirection:"row",

backgroundColor:"#F8FAFC",

padding:12,

borderRadius:16,

marginBottom:10,

alignItems:"center"


},





icon:{


fontSize:22,

width:35


},




itemContent:{


flex:1


},





itemTitle:{


fontSize:13,

fontWeight:"700",

color:"#64748B"


},





itemText:{


fontSize:14,

fontWeight:"600",

color:"#0D1117",

marginTop:3,

lineHeight:20


},








recommendBox:{


backgroundColor:"#F0FDF4",

borderRadius:16,

padding:15,

marginTop:10


},




recommendation:{


fontSize:14,

color:"#166534",

marginBottom:6,

lineHeight:20


},





updated:{


fontSize:12,

color:"#94A3B8",

marginTop:15,

textAlign:"right"


}



});