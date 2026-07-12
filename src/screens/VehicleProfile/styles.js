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

marginBottom:20

},


headerTitle:{

fontSize:22,

fontWeight:"800"

},



hero:{

backgroundColor:"white",

borderRadius:30,

padding:20,

alignItems:"center",

marginBottom:25

},



heroImage:{

width:"100%",

height:240,

borderRadius:25

},



placeholder:{

height:240,

width:"100%",

backgroundColor:"#FFF7ED",

borderRadius:25,

alignItems:"center",

justifyContent:"center"

},



vehicleName:{

fontSize:28,

fontWeight:"900",

marginTop:18

},



registration:{

color:"#64748B",

marginVertical:8,

fontSize:15

},

healthContainer:{
width:"100%",
marginTop:10,

marginBottom:20,
alighSelf:"stretch"


},







sectionTitle:{


fontSize:19,

fontWeight:"900",

color:"#0F172A",

marginTop:18,

marginBottom:12


},

infoGrid:{

flexDirection:"row",

flexWrap:"wrap",

gap:12

},



infoCard:{

width:"47%",

backgroundColor:"white",

padding:18,

borderRadius:20

},



infoTitle:{

color:"#64748B",

marginTop:8,

fontSize:13

},



infoValue:{

fontSize:17,

fontWeight:"800",

marginTop:4

},



statusCard:{

backgroundColor:"white",

borderRadius:22,

padding:18

},



statusRow:{

flexDirection:"row",

alignItems:"center",

paddingVertical:14

},



statusTitle:{

fontWeight:"700"

},


statusValue:{

fontWeight:"800"

},




actions:{

flexDirection:"row",

flexWrap:"wrap",

gap:12

},



action:{

backgroundColor:"white",

width:"47%",

padding:20,

borderRadius:20,

alignItems:"center"

},



actionText:{

marginTop:8,

fontWeight:"700"

},

bottomActions:{


flexDirection:"row",

alignItems:"center",

gap:12,

marginTop:25,

marginBottom:35


},





editButton:{


flex:1,


height:55,


backgroundColor:"#F97316",


borderRadius:18,


flexDirection:"row",


justifyContent:"center",


alignItems:"center",


gap:10,


shadowColor:"#F97316",

shadowOffset:{

width:0,

height:6

},

shadowOpacity:0.25,

shadowRadius:8,

elevation:5


},






editText:{


color:"#FFFFFF",


fontSize:16,


fontWeight:"800"


},



deleteButton:{
flex:1,
height:55,
backgroundColor:"#FFF1F2",
borderRadius:18,
borderWidth:1,
borderColor:"#FECACA",
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
gap:8
},

deleteText:{


color:"#DC2626",


fontSize:15,


fontWeight:"800"


}
});