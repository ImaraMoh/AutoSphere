import {
StyleSheet,
Dimensions
}
from "react-native";


const {width}=Dimensions.get("window");


const isWeb =
width > 700;



export default StyleSheet.create({



container:{


flex:1,


backgroundColor:"#F8FAFC",


},






scroll:{


paddingHorizontal:isWeb ? 60 : 20,


paddingTop:25,


paddingBottom:50,


maxWidth:isWeb ? 900 : undefined,


width:"100%",


alignSelf:"center"


},







loading:{


flex:1,


justifyContent:"center",


alignItems:"center",


backgroundColor:"#F8FAFC"


},




loadingText:{


marginTop:12,


fontSize:15,


color:"#64748B",


fontWeight:"600"


},







/* HEADER */


header:{


flexDirection:"row",


justifyContent:"space-between",


alignItems:"center",


marginBottom:25


},




title:{


fontSize:24,


fontWeight:"1000",

color:"#0F172A",
marginLeft:20,
marginTop:20


},




subtitle:{
fontSize:14,
marginLeft:20,
color:"#64748B",

},





editButton:{

marginRight:20,
height:45,
marginTop:20,

width:45,


borderRadius:15,


backgroundColor:"#FFF7ED",


justifyContent:"center",


alignItems:"center"


},







/* PROFILE */


profileCard:{


backgroundColor:"#FFFFFF",


borderRadius:30,


padding:25,


flexDirection:isWeb ? "row":"column",


alignItems:"center",


shadowColor:"#000",


shadowOpacity:0.06,


shadowRadius:15,


elevation:4,
marginTop:-10,

marginBottom:20


},





avatarWrapper:{


position:"relative"


},




avatar:{


width:110,


height:110,


borderRadius:55,


backgroundColor:"#E2E8F0"


},





cameraButton:{


position:"absolute",


right:3,


bottom:5,


height:32,


width:32,


borderRadius:16,


backgroundColor:"#F97316",


alignItems:"center",


justifyContent:"center",


borderWidth:3,


borderColor:"#FFFFFF"


},







userDetails:{


marginLeft:isWeb ? 25:0,


alignItems:isWeb ? "flex-start":"center",


marginTop:isWeb ? 0:18


},






name:{


fontSize:25,


fontWeight:"900",


color:"#0F172A"


},




email:{


marginTop:6,


fontSize:14,


color:"#64748B"


},







profileEdit:{


marginTop:15,


backgroundColor:"#FFF7ED",


paddingHorizontal:15,


paddingVertical:9,


borderRadius:20,


flexDirection:"row",


alignItems:"center",


gap:6


},




profileEditText:{


fontSize:13,


fontWeight:"700",


color:"#F97316"


},







/* SECTION */


section:{


marginBottom:25


},




sectionTitle:{


fontSize:18,


fontWeight:"800",


color:"#0F172A",


marginBottom:12


},





card:{


backgroundColor:"#FFFFFF",


borderRadius:24,


overflow:"hidden",


paddingHorizontal:5,


shadowColor:"#000",


shadowOpacity:0.04,


shadowRadius:10,


elevation:3


},







/* ROW */


row:{


height:70,


paddingHorizontal:15,


flexDirection:"row",


justifyContent:"space-between",


alignItems:"center",


borderBottomWidth:1,


borderColor:"#F1F5F9"


},





left:{


flexDirection:"row",


alignItems:"center"


},






iconBox:{


height:42,


width:42,


borderRadius:14,


backgroundColor:"#FFF7ED",


justifyContent:"center",


alignItems:"center",


marginRight:14


},






rowText:{


fontSize:15,


fontWeight:"700",


color:"#1E293B"


},







/* LOGOUT */


logout:{


height:60,


backgroundColor:"#FFF1F2",


borderRadius:20,


flexDirection:"row",


justifyContent:"center",


alignItems:"center",


gap:10,


marginTop:10,


borderWidth:1,


borderColor:"#FECACA"


},





logoutText:{


fontSize:17,


fontWeight:"800",


color:"#EF4444"


}





});