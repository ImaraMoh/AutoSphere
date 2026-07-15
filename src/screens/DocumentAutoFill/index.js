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
import { saveDocument } from "../../services/documentStorage";
import { createExpiryReminder } from "../../services/reminderStorage";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./styles";

export default function DocumentAutoFill({ route, navigation }) {
  const params = route?.params || {};
  const vehicleData = params.vehicleData || {};
  const ocrText = params.ocrText || "";
  const vehicleId = params.vehicleId || null;

  const [isSaving, setIsSaving] = useState(false);

  const saveData = async () => {
    if (isSaving) return;

    console.log("--- START SAVE PROCESS ---");
    console.log("Current User UID:", auth.currentUser ? auth.currentUser.uid : "NO USER FOUND");
    console.log("Extracted vehicleId from params:", vehicleId);

    if (!auth.currentUser) {
      Alert.alert("Authentication Error", "You must be logged in to save documents.");
      return;
    }

    if (!vehicleId) {
      Alert.alert("Missing Vehicle", "No vehicle was selected. Please go back and select a vehicle.");
      return;
    }

    try {
      setIsSaving(true);
      
      console.log("Step 1: Constructing document payload...");
      const fallbackDate = new Date();
      fallbackDate.setFullYear(fallbackDate.getFullYear() + 1);
      const defaultExpiry = fallbackDate.toISOString().split('T')[0];
      const resolvedExpiryDate = vehicleData.expiryDate || defaultExpiry;

      const documentPayload = {
        type: vehicleData.type || "Registration",
        title: `${vehicleData.type || "Registration"} Document`,
        registrationNumber: vehicleData.registrationNumber || "Pending ID",
        ownerName: vehicleData.ownerName || "Unknown Owner",
        vehicleModel: vehicleData.vehicleModel || "Vehicle Record",
        expiryDate: resolvedExpiryDate,
        engineNumber: vehicleData.engineNumber || "",
        chassisNumber: vehicleData.chassisNumber || "",
        rawText: ocrText || "",
        vehicleId: vehicleId,
        status: "Valid",
        date: new Date().toISOString()
      };

      console.log("Step 2: Calling saveDocument()...");
      // Pass vehicleId as the first parameter, and the payload as the second
      const savedDoc = await saveDocument(vehicleId, documentPayload);
      console.log("Saved Document Result:", savedDoc);

      console.log("Step 3: Calling createExpiryReminder()...");
      try {
        await createExpiryReminder({
          ...savedDoc,
          title: `${savedDoc.type || "Vehicle Document"} Expiry`,
          date: resolvedExpiryDate,
          targetId: vehicleId
        });
      } catch (reminderError) {
        console.log("Reminder Creation Warning (Non-Fatal):", reminderError);
      }

      console.log("Step 4: Prompting success and navigating...");
      Alert.alert(
        "Document Secured", 
        "Your document has been successfully saved to your digital wallet.",
        [
          { 
            text: "OK", 
            onPress: () => {
              navigation.navigate("DocumentWalletMain", { vehicleId: vehicleId });
            }
          }
        ]
      );
      
    } catch (error) {
      console.log("CRITICAL SAVE ERROR CAUGHT:", error);
      Alert.alert("Save Error", error.message || "Could not save the document. Check console.");
    } finally {
      setIsSaving(false);
      console.log("--- END SAVE PROCESS ---");
      navigation.goBack();
    }
  };

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
        <View style={styles.statusCard}>
          <View style={styles.iconCircle}>
            <ShieldCheck size={32} color="#10B981" />
          </View>
          <Text style={styles.statusTitle}>Data Extracted</Text>
          <Text style={styles.statusText}>
            Review the parsed information below before saving it to your secure wallet.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardSectionTitle}>Vehicle Document</Text>
          <View style={styles.divider} />
          
          {renderDataRow("Document Type", vehicleData.type || "Registration")}
          {renderDataRow("Registration No.", vehicleData.registrationNumber)}
          {renderDataRow("Owner Name", vehicleData.ownerName)}
          {renderDataRow("Vehicle Model", vehicleData.vehicleModel)}
          {renderDataRow("Expiry Date", vehicleData.expiryDate)}
        </View>
      </ScrollView>

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