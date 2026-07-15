import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView, 
  StatusBar, 
  ScrollView, 
  ActivityIndicator 
} from "react-native";
import { ChevronLeft, Save, ShieldCheck } from "lucide-react-native";
import { createDocumentObject } from "../../services/documentAIService";
import { saveDocument } from "../../services/documentStorage";
import { createExpiryReminder } from "../../services/reminderStorage";
import styles from "./styles";

export default function DocumentAutoFill({ route, navigation }) {
  // Add safe fallback defaults in case params are missing
  const { vehicleData = {}, ocrText = "" } = route.params || {};
  const [isSaving, setIsSaving] = useState(false);

  const saveData = async () => {
    try {
      setIsSaving(true);
      
      const document = createDocumentObject(vehicleData, ocrText);
      await saveDocument(document);
      await createExpiryReminder(document);

      Alert.alert(
        "Document Secured", 
        "Your document has been successfully saved to your digital wallet."
      );
      
      // Navigate back to the wallet home screen
      navigation.navigate("DocumentWalletMain");
      
    } catch (error) {
      console.log("Save Document Error:", error);
      Alert.alert("Save Error", "Could not save the document. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper to render table rows cleanly
  const renderDataRow = (label, value) => (
    <View style={styles.dataRow}>
      <Text style={styles.dataLabel}>{label}</Text>
      <Text style={styles.dataValue} numberOfLines={2}>
        {value ? value : "Not detected"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={28} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Confirm Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Success / Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.iconCircle}>
            <ShieldCheck size={32} color="#10B981" />
          </View>
          <Text style={styles.statusTitle}>Data Extracted</Text>
          <Text style={styles.statusText}>
            Review the parsed information below before saving it to your secure wallet.
          </Text>
        </View>

        {/* Data Review Table */}
        <View style={styles.infoCard}>
          <Text style={styles.cardSectionTitle}>Vehicle Document</Text>
          <View style={styles.divider} />
          
          {renderDataRow("Document Type", "Registration")}
          {renderDataRow("Registration No.", vehicleData.registrationNumber)}
          {renderDataRow("Owner Name", vehicleData.ownerName)}
          {renderDataRow("Vehicle Model", vehicleData.vehicleModel)}
          {renderDataRow("Expiry Date", vehicleData.expiryDate)}
        </View>

      </ScrollView>

      {/* Fixed Bottom Action Area */}
      <View style={styles.bottomActionDeck}>
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={saveData}
          disabled={isSaving}
          activeOpacity={0.8}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Save color="white" size={20} />
              <Text style={styles.saveButtonText}>Save To Wallet</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}