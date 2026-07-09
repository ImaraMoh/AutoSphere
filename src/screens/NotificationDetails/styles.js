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

message:{
marginTop:25,
    message:{
    color:"#6B7280"}
},
card:{
    padding:18,
    backgroundColor:'#FFFFFF',
    borderRadius:12,
    marginTop:20,
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.08,
    shadowRadius:6,
    elevation:3,
},
icon:{
    fontSize:36,
    marginBottom:8,
},
heading:{
    fontSize:20,
    fontWeight:'700',
    color:'#111827',
    marginTop:6,
},
type:{
    marginTop:12,
    fontSize:14,
    color:'#6B7280'
}

});