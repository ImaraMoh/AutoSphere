import {
StyleSheet
} from "react-native";


export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F8FAFC"
},


vehicleCard:{
backgroundColor:"#FFFFFF",
margin:20,
padding:25,
borderRadius:25
},


imageBox:{
height:150,
backgroundColor:"#FFF7ED",
borderRadius:20,
justifyContent:"center",
alignItems:"center"
},


name:{
fontSize:24,
fontWeight:"800",
marginTop:20
},


health:{
marginTop:20,
flexDirection:"row",
justifyContent:"space-between"
},


score:{
color:"#16A34A",
fontSize:22,
fontWeight:"bold"
},


button:{
margin:20,
backgroundColor:"#F97316",
padding:16,
borderRadius:30
},


buttonText:{
textAlign:"center",
color:"#FFFFFF",
fontWeight:"bold"
}

});