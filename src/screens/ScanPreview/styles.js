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
fontSize:24,
fontWeight:"800"
},


image:{
width:"100%",
height:350,
marginTop:20,
borderRadius:20
},


button:{
backgroundColor:"#F97316",
padding:16,
borderRadius:18,
marginTop:20,
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
gap:10
},


buttonText:{
color:"white",
fontWeight:"700",
fontSize:16
},


result:{
backgroundColor:"white",
marginTop:20,
padding:20,
borderRadius:20
},


resultTitle:{
fontSize:18,
fontWeight:"800",
marginBottom:10
}


});