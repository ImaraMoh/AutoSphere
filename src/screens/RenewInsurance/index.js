import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert
} from "react-native";
import { ChevronLeft, ShieldCheck } from "lucide-react-native";
import { saveInsurance } from "../../services/insuranceStorage";
import styles from "./styles";

export default function RenewInsurance({ navigation }) {
  const [provider, setProvider] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [vehicleReg, setVehicleReg] = useState("");
  const [amount, setAmount] = useState("");

  const handleSaveInsurance = async () => {
    if (!provider || !policyNumber || !vehicleReg || !amount) {
      Alert.alert("Missing Fields", "Please fill in all the required insurance details.");
      return;
    }

    const newPolicy = {
      provider,
      policyNumber,
      vehicleReg,
      amount: `Rs. ${Number(amount).toLocaleString()}`,
      expiryDate: "2027-07-15",
      status: "Active"
    };

    // Save data to storage
    await saveInsurance(newPolicy);
    
    // Immediately go back to the previous screen
    navigation.goBack();
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
        <Text style={styles.title}>Renew Insurance</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        <View style={styles.formCard}>
          <View style={styles.formHeaderRow}>
            <ShieldCheck size={22} color="#F97316" />
            <Text style={styles.heading}>Insurance Details</Text>
          </View>

          <Text style={styles.inputLabel}>Insurance Provider</Text>
          <TextInput
            placeholder="e.g. Ceylinco Insurance / Allianz"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={provider}
            onChangeText={setProvider}
          />

          <Text style={styles.inputLabel}>Policy Number</Text>
          <TextInput
            placeholder="e.g. POL-998234-AX"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={policyNumber}
            onChangeText={setPolicyNumber}
          />

          <Text style={styles.inputLabel}>Vehicle Registration</Text>
          <TextInput
            placeholder="e.g. WP-CAA-1234"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={vehicleReg}
            onChangeText={setVehicleReg}
          />

          <Text style={styles.inputLabel}>Premium Amount (Rs.)</Text>
          <TextInput
            placeholder="e.g. 25000"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSaveInsurance}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Submit Renewal Request</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}