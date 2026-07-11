import {
StyleSheet,
Dimensions
}
from "react-native";


const width =
Dimensions.get("window").width;



export default StyleSheet.create({


container:{

flex:1,

backgroundColor:"#F8FAFC"

},



scroll:{

paddingBottom:40

},



section:{

fontSize:18,

fontWeight:"800",

color:"#0D1117",

marginTop:22,

marginBottom:12

},





loadingCard:{

backgroundColor:"#FFFFFF",

borderRadius:20,

padding:25,

alignItems:"center",

justifyContent:"center",

shadowColor:"#000",

shadowOpacity:0.05,

shadowRadius:10,

elevation:3


},



loadingText:{

marginTop:10,

fontSize:14,

color:"#64748B"

},





chartCard:{

backgroundColor:"#FFFFFF",

borderRadius:22,

padding:18,

marginBottom:10,

shadowColor:"#000",

shadowOpacity:0.05,

shadowRadius:10,

elevation:3,

overflow:"hidden"

},





centerText:{

fontSize:15,

fontWeight:"700",

color:"#0D1117"

},





/* AI Health */

healthCard:{

backgroundColor:"#FFFFFF",

borderRadius:24,

padding:20,

shadowColor:"#000",

shadowOpacity:0.06,

shadowRadius:12,

elevation:4

},



healthHeader:{

flexDirection:"row",

alignItems:"center",

justifyContent:"space-between"

},



healthTitle:{

fontSize:17,

fontWeight:"800",

color:"#0D1117"

},



healthScore:{

fontSize:42,

fontWeight:"900",

color:"#F97316"

},



healthStatus:{

fontSize:14,

fontWeight:"600",

color:"#16A34A"

},



analysisBox:{

marginTop:15,

backgroundColor:"#FFF7ED",

padding:14,

borderRadius:16

},



analysisText:{

fontSize:14,

lineHeight:22,

color:"#374151"

},





/* Analytics Cards */



analyticsContainer:{

flexDirection:"row",

flexWrap:"wrap",

justifyContent:"space-between"

},



analyticsCard:{

backgroundColor:"#FFFFFF",

width:

width>500

?

"48%"

:

"100%",


borderRadius:20,

padding:18,

marginBottom:12,


shadowColor:"#000",

shadowOpacity:0.05,

shadowRadius:10,

elevation:3


},





analyticsTitle:{

fontSize:13,

color:"#64748B",

marginBottom:8

},



analyticsValue:{

fontSize:17,

fontWeight:"800",

color:"#0D1117"

},





aiBadge:{

backgroundColor:"#F3E8FF",

paddingHorizontal:10,

paddingVertical:5,

borderRadius:20

},



aiText:{

fontSize:12,

fontWeight:"700",

color:"#9333EA"

},

chartTitle:{

fontSize:17,

fontWeight:"800",

color:"#0D1117",

marginBottom:15

},



pieContainer:{

alignItems:"center",

justifyContent:"center",

marginVertical:10

},



centerBox:{

alignItems:"center",

justifyContent:"center"

},



totalAmount:{

fontSize:16,

fontWeight:"800",

color:"#0D1117"

},



centerText:{

fontSize:12,

color:"#64748B",

marginTop:3

},




legendContainer:{

marginTop:20

},




legendItem:{

flexDirection:"row",

alignItems:"center",

marginBottom:14

},




dot:{

width:12,

height:12,

borderRadius:10,

marginRight:12

},




legendText:{

flex:1

},




category:{

fontSize:14,

fontWeight:"700",

color:"#0D1117"

},




amount:{

fontSize:13,

color:"#64748B",

marginTop:3

},
loadingCard:{


backgroundColor:"#FFFFFF",

borderRadius:22,

padding:25,

alignItems:"center",

marginBottom:20,

elevation:4


},



loadingText:{


fontSize:16,

fontWeight:"700",

color:"#F97316"


}

});