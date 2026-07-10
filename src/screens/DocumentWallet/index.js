import React,{useEffect,useState} from "react";

import {
View,
Text,
FlatList,
TouchableOpacity,
TextInput
}
from "react-native";


import {
Search,
FileText,
Trash2
}
from "lucide-react-native";


import {
getDocuments,
deleteDocument
}
from "../../services/documentStorage";


import styles from "./styles";



export default function DocumentWallet({
navigation
}){


const [documents,setDocuments]=useState([]);

const [search,setSearch]=useState("");

const [filter,setFilter]=useState("All");



useEffect(()=>{

load();

},[]);



const load=async()=>{

const data=
await getDocuments();

setDocuments(data);

};



const remove=async(id)=>{

await deleteDocument(id);

load();

};



const filtered =
documents.filter(doc=>{


const matchSearch =
doc.title
.toLowerCase()
.includes(
search.toLowerCase()
);



const matchFilter =
filter==="All"
||
doc.type===filter;



return matchSearch && matchFilter;


});



return(

<View style={styles.container}>


<Text style={styles.title}>
Document Wallet
</Text>



<View style={styles.searchBox}>


<Search size={20} color="#6B7280"/>


<TextInput

placeholder="Search documents"

placeholderTextColor="#6B7280"

value={search}

onChangeText={setSearch}

style={styles.searchInput}

/>


</View>



<View style={styles.filters}>


{
[
"All",
"Insurance",
"Registration",
"License",
"Service"
]
.map(item=>(


<TouchableOpacity

key={item}

onPress={()=>setFilter(item)}

style={
filter===item
?
styles.activeFilter
:
styles.filter
}

>

<Text style={filter===item ? styles.activeFilterText : styles.filterText}>
{item}
</Text>


</TouchableOpacity>


))

}


</View>



<FlatList

data={filtered}


keyExtractor={
item=>item.id
}


renderItem={({item})=>(


<TouchableOpacity

style={styles.card}

onPress={()=>navigation.navigate(

"DocumentDetails",

{
document:item
}

)}

>


<FileText
size={35}
color="#F97316"
/>



<View style={{flex:1}}>


<Text style={styles.name}>
{item.title}
</Text>


<Text style={styles.meta}>
Expiry:
{item.expiryDate || "No expiry"}
</Text>


<Text style={styles.status}>
{item.status}
</Text>


</View>



<TouchableOpacity

onPress={()=>remove(item.id)}

>

<Trash2
color="red"
/>


</TouchableOpacity>


</TouchableOpacity>


)}


/>


</View>

);


}