import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Keyboard
} from "react-native";
import {
  ChevronLeft,
  Calculator as CalculatorIcon
} from "lucide-react-native";
import styles from "./styles";

export default function EMICalculator({ navigation }) {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const N = parseFloat(years) * 12;

    if (!P || !annualRate || !N) return;

    const R = annualRate / (12 * 100);

    const value =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    setEmi(Math.round(value));
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Toolbar Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>EMI Calculator</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        <View style={styles.formCard}>
          <View style={styles.formHeaderRow}>
            <CalculatorIcon size={22} color="#F97316" />
            <Text style={styles.heading}>Calculate Vehicle EMI</Text>
          </View>

          <Text style={styles.inputLabel}>Loan Amount (Rs.)</Text>
          <TextInput
            placeholder="e.g. 3000000"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
          />

          <Text style={styles.inputLabel}>Interest Rate (%)</Text>
          <TextInput
            placeholder="e.g. 14.5"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            style={styles.input}
            value={rate}
            onChangeText={setRate}
          />

          <Text style={styles.inputLabel}>Loan Duration (Years)</Text>
          <TextInput
            placeholder="e.g. 5"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            style={styles.input}
            value={years}
            onChangeText={setYears}
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={calculateEMI}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Calculate EMI</Text>
          </TouchableOpacity>

          {emi !== null && (
            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>Estimated Monthly EMI</Text>
              <Text style={styles.amountText}>
                Rs. {emi.toLocaleString()}
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}