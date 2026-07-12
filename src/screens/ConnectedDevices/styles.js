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
marginBottom:25
},


title:{
fontSize:24,
fontWeight:"900"
},


description:{
color:"#64748B",
marginBottom:25
},


deviceCard:{
backgroundColor:"white",
borderRadius:22,
padding:18,
flexDirection:"row",
alignItems:"center",
marginBottom:15
},


iconBox:{
height:45,
width:45,
borderRadius:14,
backgroundColor:"#FFF7ED",
alignItems:"center",
justifyContent:"center",
marginRight:15
},


deviceName:{
fontSize:16,
fontWeight:"800"
},


deviceType:{
color:"#64748B",
marginTop:4
}


});