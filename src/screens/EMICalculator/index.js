import React, {useState} from "react";

import {
View,
Text,
TextInput,
TouchableOpacity
} from "react-native";

import {
ChevronLeft,
Calculator
} from "lucide-react-native";

import styles from "./styles";


export default function EMICalculator({
navigation
}){


const [amount,setAmount]=useState("");

const [rate,setRate]=useState("");

const [years,setYears]=useState("");

const [emi,setEmi]=useState(null);



const calculateEMI=()=>{


const P=parseFloat(amount);

const annualRate=parseFloat(rate);

const N=parseFloat(years)*12;


if(!P || !annualRate || !N)
return;



const R=
annualRate/(12*100);



const value=
(P*R*Math.pow(1+R,N))/
(Math.pow(1+R,N)-1);



setEmi(
Math.round(value)
);


};



return(

<View style={styles.container}>


<View style={styles.header}>


<TouchableOpacity
onPress={()=>navigation.goBack()}
>

<ChevronLeft size={30}/>

</TouchableOpacity>



<Text style={styles.title}>
EMI Calculator
</Text>


</View>



<View style={styles.card}>


<Calculator
size={45}
color="#F97316"
/>



<Text style={styles.heading}>
Calculate Vehicle EMI
</Text>



<TextInput

placeholder="Loan Amount"

keyboardType="numeric"

style={styles.input}

value={amount}

onChangeText={setAmount}

/>



<TextInput

placeholder="Interest Rate (%)"

keyboardType="numeric"

style={styles.input}

value={rate}

onChangeText={setRate}

/>



<TextInput

placeholder="Loan Duration (Years)"

keyboardType="numeric"

style={styles.input}

value={years}

onChangeText={setYears}

/>



<TouchableOpacity

style={styles.button}

onPress={calculateEMI}

>

<Text style={styles.buttonText}>
Calculate EMI
</Text>

</TouchableOpacity>




{
emi &&

<View style={styles.result}>


<Text>
Monthly EMI
</Text>


<Text style={styles.amount}>

Rs {emi}

</Text>


</View>

}



</View>



</View>

);


}