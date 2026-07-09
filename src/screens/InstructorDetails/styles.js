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


profileCard:{
backgroundColor:"#fff",
padding:25,
borderRadius:25,
marginTop:25,
alignItems:"center"
},


avatar:{
width:90,
height:90,
borderRadius:45,
backgroundColor:"#FFF7ED",
alignItems:"center",
justifyContent:"center"
},


avatarText:{
fontSize:45
},


name:{
fontSize:22,
fontWeight:"800",
marginTop:15
},


row:{
flexDirection:"row",
gap:8,
marginTop:10
},


info:{
width:"100%",
marginTop:20
},


item:{
flexDirection:"row",
gap:10,
marginVertical:8
},


exp:{
marginTop:15,
fontSize:16
},


button:{
backgroundColor:"#F97316",
padding:16,
borderRadius:15,
width:"100%",
alignItems:"center",
marginTop:25
},


buttonText:{
color:"#fff",
fontWeight:"700"
}


});