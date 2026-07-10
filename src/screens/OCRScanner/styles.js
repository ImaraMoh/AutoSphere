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

gap:12

},



title:{

fontSize:26,

fontWeight:"800",

color:"#0D1117"

},



hero:{

backgroundColor:"#0D1117",

padding:25,

borderRadius:25,

marginTop:30

},



heroTitle:{

color:"white",

fontSize:22,

fontWeight:"700"

},



heroText:{

color:"#CBD5E1",

marginTop:10,

lineHeight:22

},



scanButton:{

marginTop:35,

backgroundColor:"#F97316",

padding:18,

borderRadius:18,

flexDirection:"row",

justifyContent:"center",

alignItems:"center",

gap:10

},



buttonText:{

color:"white",

fontWeight:"700",

fontSize:17

},



galleryButton:{

marginTop:20,

backgroundColor:"white",

padding:18,

borderRadius:18,

flexDirection:"row",

justifyContent:"center",

alignItems:"center",

gap:10

},



galleryText:{

fontWeight:"700",

color:"#F97316",

fontSize:17

},



historyButton:{

marginTop:20,

alignItems:"center"

},



historyText:{

fontWeight:"700",

fontSize:16,

color:"#0D1117"

}

});