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
marginBottom:35
},


title:{
fontSize:24,
fontWeight:"900"
},


label:{
fontSize:14,
fontWeight:"800",
marginTop:18,
marginBottom:8
},


input:{
height:55,
backgroundColor:"#FFFFFF",
borderRadius:16,
paddingHorizontal:15,
borderWidth:1,
borderColor:"#E2E8F0"
},


button:{
height:55,
backgroundColor:"#F97316",
borderRadius:18,
alignItems:"center",
justifyContent:"center",
marginTop:35
},


buttonText:{
color:"white",
fontSize:16,
fontWeight:"800"
}


});