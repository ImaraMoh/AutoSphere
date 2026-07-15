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
import { ChevronLeft, FileText, UploadCloud, CheckCircle } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";
import { saveLoan } from "../../services/financeStorage";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./styles";

export default function LoanApplication({ route, navigation }) {
  const vehicleId = route?.params?.vehicleId || null;

  const [vehicleModel, setVehicleModel] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // Functional Document Picker Handler
  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setUploadedFile(file);
      }
    } catch (error) {
      console.log("Error picking document:", error);
      Alert.alert("Error", "Could not select the document. Please try again.");
    }
  };

  const handleSubmitApplication = async () => {
    if (!auth.currentUser) {
      Alert.alert("Authentication Error", "You must be logged in to apply for a loan.");
      return;
    }

    if (!vehicleId) {
      Alert.alert("Missing Vehicle", "No target vehicle was selected. Please go back and select a vehicle.");
      return;
    }

    if (!vehicleModel || !loanAmount || !monthlyIncome || !employmentType) {
      Alert.alert("Missing Fields", "Please fill in all the required loan application details.");
      return;
    }

    const newLoan = {
      vehicleModel,
      amount: `Rs. ${Number(loanAmount).toLocaleString()}`,
      status: "Under Review",
      term: "36 Months",
      monthlyEMI: `Rs. ${Math.round(Number(loanAmount) * 0.035).toLocaleString()}`,
      documentName: uploadedFile ? uploadedFile.name : "No document attached"
    };

    try {
      await saveLoan(vehicleId, newLoan);
      navigation.goBack();
    } catch (error) {
      console.log("Error saving loan application:", error);
      Alert.alert("Error", "Failed to submit loan application. Please try again.");
    }
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
        <Text style={styles.title}>Finance Application</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        <View style={styles.formCard}>
          <View style={styles.formHeaderRow}>
            <FileText size={22} color="#F97316" />
            <Text style={styles.heading}>Loan Details</Text>
          </View>

          <Text style={styles.inputLabel}>Vehicle Model</Text>
          <TextInput
            placeholder="e.g. Toyota Aqua / Honda Vezel"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={vehicleModel}
            onChangeText={setVehicleModel}
          />

          <Text style={styles.inputLabel}>Loan Amount (Rs.)</Text>
          <TextInput
            placeholder="e.g. 2500000"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            style={styles.input}
            value={loanAmount}
            onChangeText={setLoanAmount}
          />

          <Text style={styles.inputLabel}>Monthly Income (Rs.)</Text>
          <TextInput
            placeholder="e.g. 150000"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            style={styles.input}
            value={monthlyIncome}
            onChangeText={setMonthlyIncome}
          />

          <Text style={styles.inputLabel}>Employment Type</Text>
          <TextInput
            placeholder="e.g. Salaried / Self-Employed"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={employmentType}
            onChangeText={setEmploymentType}
          />

          {/* Dynamic Upload Trigger Box */}
          <TouchableOpacity
            style={[styles.uploadBox, uploadedFile && styles.uploadBoxSuccess]}
            activeOpacity={0.7}
            onPress={handlePickDocument}
          >
            {uploadedFile ? (
              <>
                <CheckCircle size={20} color="#16A34A" />
                <Text style={styles.uploadTextSuccess} numberOfLines={1}>
                  {uploadedFile.name}
                </Text>
              </>
            ) : (
              <>
                <UploadCloud size={20} color="#F97316" />
                <Text style={styles.uploadText}>Upload Supporting Documents (Payslips/ID)</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSubmitApplication}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Submit Application</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}