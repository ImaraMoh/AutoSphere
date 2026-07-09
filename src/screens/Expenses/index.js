import React,{useState,useCallback} from "react";


import {
View,
Text,
ScrollView,
TouchableOpacity
}
from "react-native";


import {
useFocusEffect
}
from "@react-navigation/native";


import AppHeader from "../../components/AppHeader";


import ExpenseCard from "../../components/ExpenseCard";


import {
getExpenses
}
from "../../services/expenseStorage";


import styles from "./styles";



export default function Expenses({navigation}){


const [expenses,setExpenses]=useState([]);



useFocusEffect(

useCallback(()=>{

load();

},[])

);



const load=async()=>{

setExpenses(
await getExpenses()
);

};



const total =
expenses.reduce(
(sum,item)=>
sum+item.amount,
0
);



return(

<View style={styles.container}>


<AppHeader

title="Expense Tracker"

navigation={navigation}

/>



<ScrollView

contentContainerStyle={{
padding:20
}}

>


<View style={styles.summary}>


<Text>
Total Vehicle Expense
</Text>


<Text style={styles.amount}>
Rs. {total}
</Text>


</View>




<Text style={styles.section}>
Expense History
</Text>



{

expenses.length===0 ?


<Text>
No expenses added
</Text>


:

expenses.map(item=>(

<ExpenseCard

key={item.id}

item={item}

/>

))


}




<TouchableOpacity

style={styles.button}

onPress={()=>navigation.navigate("AddExpense")}

>


<Text style={styles.buttonText}>
+ Add Expense
</Text>


</TouchableOpacity>



</ScrollView>



</View>

)

}