import {
StyleSheet
}
from "react-native";


export default StyleSheet.create({

card:{


backgroundColor:"#FFFFFF",

borderRadius:20,

padding:16,

flexDirection:"row",

alignItems:"center",

marginBottom:12,


shadowColor:"#000",

shadowOpacity:0.05,

shadowRadius:10,

elevation:3


},



iconBox:{


width:45,

height:45,

borderRadius:15,

backgroundColor:"#FFF7ED",

alignItems:"center",

justifyContent:"center"


},



icon:{


fontSize:22


},



content:{


flex:1,

marginLeft:14


},



title:{


fontSize:13,

color:"#64748B",

fontWeight:"600"


},



value:{


fontSize:15,

color:"#0D1117",

fontWeight:"700",

marginTop:5,

lineHeight:22


}



});