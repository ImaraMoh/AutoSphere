import React,{useState} from "react";

import {
View,
Text,
TextInput,
TouchableOpacity
} from "react-native";


import {
getExpenses,
saveExpenses
}
from "../../services/expenseStorage";


import AppHeader from "../../components/AppHeader";


import styles from "./styles";



export default function AddExpense({navigation}){


const [expense,setExpense]=useState({

title:"",
category:"",
amount:"",
date:""

});



const save=async()=>{


const old =
await getExpenses();



const newExpense={

id:Date.now(),

title:expense.title,

category:expense.category,

amount:Number(expense.amount),

date:expense.date

};



await saveExpenses([

...old,

newExpense

]);



navigation.goBack();


};



return(

<View style={styles.container}>


<AppHeader

title="Add Expense"

navigation={navigation}

/>



<View style={styles.form}>


<TextInput

placeholder="Expense Name"

style={styles.input}

onChangeText={(text)=>

setExpense({

...expense,

title:text

})

}

/>



<TextInput

placeholder="Category (Fuel/Repair/Service)"

style={styles.input}

onChangeText={(text)=>

setExpense({

...expense,

category:text

})

}

/>



<TextInput

placeholder="Amount"

keyboardType="numeric"

style={styles.input}

onChangeText={(text)=>

setExpense({

...expense,

amount:text

})

}

/>



<TextInput

placeholder="Date"

style={styles.input}

onChangeText={(text)=>

setExpense({

...expense,

date:text

})

}

/>




<TouchableOpacity

style={styles.button}

onPress={save}

>


<Text style={styles.buttonText}>
Save Expense
</Text>


</TouchableOpacity>


</View>


</View>

)

}