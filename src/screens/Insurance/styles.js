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
gap:15
},


title:{
fontSize:26,
fontWeight:"800",
color:"#0D1117"
},



hero:{
backgroundColor:"#0D1117",
padding:22,
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
alignItems:"center",
marginTop:20
},


emptyTitle:{
fontSize:20,
fontWeight:"700",
marginTop:15
},


emptyText:{
textAlign:"center",
color:"#64748B",
marginVertical:10
},


primaryButton:{
backgroundColor:"#F97316",
padding:15,
borderRadius:15,
flexDirection:"row",
alignItems:"center",
gap:10
},


buttonText:{
color:"white",
fontWeight:"700"
},



actions:{
marginTop:20,
flexDirection:"row",
gap:15
},


card:{
flex:1,
backgroundColor:"white",
padding:18,
borderRadius:20
},


icon:{
fontSize:35
},


cardTitle:{
fontWeight:"700",
fontSize:16,
marginTop:10
}


});