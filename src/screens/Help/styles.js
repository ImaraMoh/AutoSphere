import {
StyleSheet
}
from "react-native";


export default StyleSheet.create({

container:{

flex:1,

backgroundColor:"#F8FAFC",

paddingHorizontal:20

},



header:{

flexDirection:"row",

alignItems:"center",

justifyContent:"space-between",

marginTop:20,

marginBottom:25

},



backButton:{

width:42,

height:42,

borderRadius:14,

backgroundColor:"#FFFFFF",

alignItems:"center",

justifyContent:"center",

elevation:2

},



title:{

fontSize:24,

fontWeight:"900",

color:"#0F172A"

},





hero:{

backgroundColor:"#FFF7ED",

borderRadius:28,

padding:25,

alignItems:"center",

marginBottom:25

},



heroIcon:{

width:80,

height:80,

borderRadius:40,

backgroundColor:"#FFFFFF",

alignItems:"center",

justifyContent:"center",

marginBottom:15

},



heroTitle:{

fontSize:22,

fontWeight:"900",

color:"#0F172A"

},



heroText:{

textAlign:"center",

marginTop:8,

color:"#64748B",

lineHeight:22

},





sectionTitle:{

fontSize:19,

fontWeight:"900",

marginBottom:15,

marginTop:10,

color:"#0F172A"

},





faqCard:{

backgroundColor:"#FFFFFF",

borderRadius:20,

padding:16,

flexDirection:"row",

alignItems:"center",

marginBottom:12,

shadowColor:"#000",

shadowOpacity:0.05,

shadowRadius:10,

elevation:3

},





iconBox:{

width:45,

height:45,

borderRadius:15,

backgroundColor:"#FFF7ED",

alignItems:"center",

justifyContent:"center",

marginRight:12

},




faqTitle:{

fontWeight:"800",

fontSize:15,

color:"#0F172A"

},



faqText:{

marginTop:5,

color:"#64748B",

fontSize:13,

lineHeight:18

},





contactCard:{

backgroundColor:"#FFFFFF",

borderRadius:20,

padding:16,

flexDirection:"row",

alignItems:"center",

marginBottom:12

},



contactIcon:{

width:50,

height:50,

borderRadius:16,

backgroundColor:"#FFF7ED",

alignItems:"center",

justifyContent:"center",

marginRight:15

},



contactTitle:{

fontSize:16,

fontWeight:"800"

},



contactText:{

marginTop:4,

color:"#64748B"

},





reportButton:{

height:55,

borderRadius:18,

backgroundColor:"#F97316",

flexDirection:"row",

alignItems:"center",

justifyContent:"center",

gap:10,

marginTop:20

},



reportText:{

color:"#FFFFFF",

fontSize:16,

fontWeight:"800"

}


});