import {StyleSheet} from "react-native";


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


title:{
fontSize:22,
fontWeight:"700"
},


label:{
fontSize:15,
fontWeight:"600",
marginTop:15
},


input:{
backgroundColor:"#fff",
padding:15,
borderRadius:12,
marginTop:8
},


types:{
flexDirection:"row",
flexWrap:"wrap",
gap:10,
marginTop:10
},


type:{
backgroundColor:"#fff",
padding:12,
borderRadius:20
},


selectedType:{
backgroundColor:"#F97316",
padding:12,
borderRadius:20
},


dateBox:{
backgroundColor:"#fff",
padding:15,
borderRadius:12,
flexDirection:"row",
gap:10,
marginTop:8
},


upload:{
height:100,
borderWidth:1,
borderStyle:"dashed",
borderColor:"#F97316",
justifyContent:"center",
alignItems:"center",
borderRadius:15,
marginTop:10
},


pdf:{
backgroundColor:"#fff",
padding:15,
alignItems:"center",
marginTop:10,
borderRadius:12
},


save:{
backgroundColor:"#F97316",
padding:17,
borderRadius:15,
marginTop:30,
alignItems:"center"
},


saveText:{
color:"#fff",
fontWeight:"700"
}


});