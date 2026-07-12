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
marginBottom:30
},


title:{
fontSize:23,
fontWeight:"900"
},


row:{
height:70,
backgroundColor:"white",
borderRadius:18,
paddingHorizontal:18,
flexDirection:"row",
alignItems:"center",
justifyContent:"space-between",
marginBottom:15
},


text:{
fontSize:16,
fontWeight:"700"
}


});