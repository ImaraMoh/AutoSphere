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



title:{

fontSize:26,

fontWeight:"800",

color:"#0F172A"

},





imagePicker:{

height:220,

borderRadius:25,

backgroundColor:"#FFF7ED",

alignItems:"center",

justifyContent:"center",

marginBottom:25

},



vehicleImage:{

height:"100%",

width:"100%",

borderRadius:25

},



uploadText:{

marginTop:10,

color:"#64748B",

fontWeight:"600"

},





label:{

fontSize:14,

fontWeight:"700",

color:"#334155",

marginBottom:8

},





row:{

flexDirection:"row",

flexWrap:"wrap",

marginBottom:18

},




chip:{

paddingHorizontal:18,

paddingVertical:10,

backgroundColor:"white",

borderRadius:25,

marginRight:10,

marginBottom:10,

borderWidth:1,

borderColor:"#E2E8F0"

},



activeChip:{

backgroundColor:"#F97316",

borderColor:"#F97316"

},



chipText:{

fontWeight:"600",

color:"#475569"

},



activeChipText:{

color:"white"

},





inputContainer:{

marginBottom:15

},



input:{

height:52,

backgroundColor:"white",

borderRadius:15,

paddingHorizontal:15,

fontSize:15,

borderWidth:1,

borderColor:"#E2E8F0"

},



double:{

flexDirection:"row",

gap:12

},



saveButton:{

height:55,

backgroundColor:"#F97316",

borderRadius:30,

alignItems:"center",

justifyContent:"center",

marginTop:20

},



saveText:{

color:"white",

fontSize:17,

fontWeight:"800"

}



});