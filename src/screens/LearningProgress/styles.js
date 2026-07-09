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
gap:10
},


title:{
fontSize:25,
fontWeight:"800"
},


scoreCard:{
backgroundColor:"#0D1117",
padding:30,
borderRadius:25,
marginTop:25,
alignItems:"center"
},


scoreTitle:{
color:"#CBD5E1",
fontSize:16
},


score:{
color:"#fff",
fontSize:40,
fontWeight:"900",
marginTop:10
},


progressCard:{
backgroundColor:"#fff",
padding:20,
borderRadius:20,
marginTop:15
},


name:{
fontWeight:"700",
fontSize:16
},


barBackground:{
height:10,
backgroundColor:"#E2E8F0",
borderRadius:10,
marginVertical:15
},


bar:{
height:10,
backgroundColor:"#F97316",
borderRadius:10
}


});