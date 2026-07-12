import {
Dimensions
}
from "react-native";


const {width}=Dimensions.get("window");


export default {


container:{

flex:1,

backgroundColor:"#F8FAFC",

paddingHorizontal:width>600?40:20

},



header:{

flexDirection:"row",

justifyContent:"space-between",

alignItems:"center",

paddingTop:20,

marginBottom:15

},



title:{

fontSize:26,

fontWeight:"800",

color:"#0F172A"

},



subtitle:{

fontSize:14,

color:"#64748B",

marginTop:4

},



notification:{

backgroundColor:"#FFFFFF",

padding:12,

borderRadius:50,

elevation:3

},





summary:{

backgroundColor:"#FFFFFF",

borderRadius:18,

padding:18,

flexDirection:"row",

justifyContent:"space-around",

marginBottom:15

},



summaryNumber:{

fontSize:22,

fontWeight:"800",

color:"#F97316"

},


summaryLabel:{

color:"#64748B",

fontSize:12

},






searchBox:{

height:48,

backgroundColor:"#FFFFFF",

borderRadius:14,

flexDirection:"row",

alignItems:"center",

paddingHorizontal:15,

marginBottom:12,

borderWidth:1,

borderColor:"#E2E8F0"

},



searchInput:{

flex:1,

marginLeft:10,

fontSize:15

},






filters:{

marginBottom:10

},



filter:{

paddingHorizontal:18,

paddingVertical:8,

borderRadius:20,

backgroundColor:"#FFFFFF",

marginRight:8

},



activeFilter:{

backgroundColor:"#F97316"

},


filterText:{

color:"#64748B",

fontWeight:"600"

},


activeFilterText:{

color:"#FFFFFF"

},





floatingButton:{

position:"absolute",

right:25,

bottom:30,

height:58,

width:58,

borderRadius:30,

backgroundColor:"#F97316",

justifyContent:"center",

alignItems:"center",

elevation:5

}



}