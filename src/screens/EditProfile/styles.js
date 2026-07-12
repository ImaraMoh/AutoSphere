import {
StyleSheet,
Dimensions
}
from "react-native";


const {width}=Dimensions.get("window");

const isWeb=width>700;



export default StyleSheet.create({


container:{

flex:1,

backgroundColor:"#F8FAFC"

},



scroll:{

paddingHorizontal:isWeb?80:20,

paddingBottom:50

},




header:{

height:70,

flexDirection:"row",

alignItems:"center",

justifyContent:"space-between",

paddingHorizontal:20

},



backButton:{

height:42,

width:42,

borderRadius:14,

backgroundColor:"#FFFFFF",

alignItems:"center",

justifyContent:"center"

},



title:{

fontSize:24,

fontWeight:"900",

color:"#0F172A"

},







imageContainer:{

alignSelf:"center",

marginTop:20,

position:"relative"

},




avatar:{

width:150,

height:150,

borderRadius:75

},



placeholder:{

width:150,

height:150,

borderRadius:75,

backgroundColor:"#FFF7ED",

alignItems:"center",

justifyContent:"center"

},




camera:{

position:"absolute",

right:5,

bottom:10,

height:40,

width:40,

borderRadius:20,

backgroundColor:"#F97316",

alignItems:"center",

justifyContent:"center",

borderWidth:3,

borderColor:"#FFFFFF"

},





changePhoto:{

textAlign:"center",

marginTop:12,

color:"#F97316",

fontWeight:"700"

},








card:{

backgroundColor:"#FFFFFF",

borderRadius:28,

padding:20,

marginTop:30,

shadowColor:"#000",

shadowOpacity:0.05,

shadowRadius:12,

elevation:3

},








inputContainer:{

marginBottom:18

},



label:{

fontSize:13,

fontWeight:"700",

color:"#64748B",

marginBottom:8

},




inputBox:{

height:55,

borderRadius:16,

backgroundColor:"#F8FAFC",

flexDirection:"row",

alignItems:"center",

paddingHorizontal:15,

borderWidth:1,

borderColor:"#E2E8F0"

},




input:{

flex:1,

marginLeft:12,

fontSize:15,

color:"#0F172A"

},







saveButton:{

height:58,

backgroundColor:"#F97316",

borderRadius:20,

marginTop:30,

flexDirection:"row",

alignItems:"center",

justifyContent:"center",

gap:10,

shadowColor:"#F97316",

shadowOpacity:0.25,

shadowRadius:10,

elevation:5

},




saveText:{

color:"#FFFFFF",

fontSize:16,

fontWeight:"800"

}


});