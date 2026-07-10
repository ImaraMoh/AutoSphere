import { StyleSheet } from "react-native";


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

marginBottom:25

},


headerTitle:{

fontSize:22,

fontWeight:"700",

color:"#0D1117"

},


label:{

fontSize:15,

fontWeight:"600",

marginTop:18,

marginBottom:8,

color:"#374151"

},


input:{

backgroundColor:"#fff",

borderRadius:12,

padding:15,

fontSize:15,

borderWidth:1,

borderColor:"#E5E7EB"

},


typeContainer:{

flexDirection:"row",

flexWrap:"wrap",

gap:10

},


typeButton:{

paddingHorizontal:15,

paddingVertical:10,

backgroundColor:"#fff",

borderRadius:20,

borderWidth:1,

borderColor:"#E5E7EB"

},


selectedType:{

paddingHorizontal:15,

paddingVertical:10,

backgroundColor:"#F97316",

borderRadius:20

},


typeText:{

color:"#374151"

},


selectedText:{

color:"#fff",

fontWeight:"600"

},


dateBox:{

height:55,

backgroundColor:"#fff",

borderRadius:12,

flexDirection:"row",

alignItems:"center",

gap:12,

paddingHorizontal:15,

borderWidth:1,

borderColor:"#E5E7EB"

},


uploadBox:{

height:120,

backgroundColor:"#fff",

borderRadius:15,

borderWidth:1,

borderStyle:"dashed",

borderColor:"#F97316",

justifyContent:"center",

alignItems:"center",

gap:10

},


saveButton:{

marginTop:30,

backgroundColor:"#F97316",

height:55,

borderRadius:15,

justifyContent:"center",

alignItems:"center",

marginBottom:30

},


saveText:{

color:"#fff",

fontSize:16,

fontWeight:"700"

}


});