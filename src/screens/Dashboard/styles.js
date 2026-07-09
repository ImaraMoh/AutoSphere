import {
StyleSheet
} from "react-native";


export default StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F8FAFC",
padding:20
},


greeting:{
fontSize:30,
fontWeight:"800"
},

header:{
	flexDirection:'row',
	justifyContent:'space-between',
	alignItems:'center',
	marginBottom:8
},


sub:{
color:"#6B7280",
marginBottom:20
},


vehicleHeader:{
flexDirection:"row",
alignItems:"center",
gap:15
},


vehicle:{
fontSize:20,
fontWeight:"700"
},


health:{
marginTop:25,
flexDirection:"row",
justifyContent:"space-between"
},


score:{
color:"#16A34A",
fontSize:22,
fontWeight:"bold"
},


section:{
fontSize:22,
fontWeight:"700",
marginTop:25,
marginBottom:15
},


grid:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between"
},


action:{
width:"48%",
marginBottom:15
},


actionBox:{
backgroundColor:"#FFFFFF",
height:110,
borderRadius:20,
justifyContent:"center",
alignItems:"center",
gap:10
},


ai:{
fontSize:18,
fontWeight:"700",
marginBottom:8
}

,
aiCard:{
	marginBottom:8
}

});