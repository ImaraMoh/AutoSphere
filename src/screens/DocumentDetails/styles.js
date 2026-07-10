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

marginBottom:20

},



title:{

fontSize:23,

fontWeight:"800"

},



card:{

backgroundColor:"#FFFFFF",

borderRadius:20,

padding:20

},



fileHeader:{

flexDirection:"row",

alignItems:"center",

gap:15,

marginBottom:20

},



docTitle:{

fontSize:18,

fontWeight:"700"

},



type:{

color:"#6B7280",

marginTop:4

},




sectionTitle:{

fontSize:17,

fontWeight:"700",

marginTop:20,

marginBottom:12

},




previewBox:{

height:220,

borderRadius:18,

backgroundColor:"#F3F4F6",

overflow:"hidden",

justifyContent:"center",

alignItems:"center"

},



thumbnail:{

width:"100%",

height:"100%",

resizeMode:"cover"

},



pdfBox:{

alignItems:"center"

},



pdfText:{

marginTop:10,

fontWeight:"600"

},




info:{

marginBottom:15

},



label:{

fontSize:13,

color:"#6B7280"

},



value:{

fontSize:16,

fontWeight:"600",

marginTop:4

},




actions:{

flexDirection:"row",

gap:10,

marginTop:20,

flexWrap:"wrap"

},



button:{

flex:1,

minWidth:100,

height:55,

backgroundColor:"#FFFFFF",

borderRadius:15,

alignItems:"center",

justifyContent:"center",

flexDirection:"row",

gap:8

},



delete:{

borderWidth:1,

borderColor:"#FCA5A5"

},



deleteText:{

color:"#DC2626"

}


});