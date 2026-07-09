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
fontSize:26,
fontWeight:"800"
},


hero:{
backgroundColor:"#0D1117",
padding:25,
borderRadius:25,
marginTop:25
},


heroTitle:{
color:"white",
fontSize:22,
fontWeight:"700"
},


heroText:{
color:"#CBD5E1",
marginTop:8
},


empty:{
backgroundColor:"white",
padding:25,
borderRadius:25,
marginTop:20,
alignItems:"center"
},


emptyIcon:{
fontSize:45
},


emptyTitle:{
fontSize:20,
fontWeight:"700"
},


action:{
backgroundColor:"#F97316",
padding:18,
borderRadius:18,
marginTop:15
},


actionText:{
color:"white",
fontWeight:"700",
fontSize:16
}


});