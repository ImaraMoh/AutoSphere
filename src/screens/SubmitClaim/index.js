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
import { ChevronLeft, FileText, AlertCircle } from "lucide-react-native";
import { saveClaim } from "../../services/claimsStorage";
import styles from "./styles";

export default function SubmitClaim({ navigation }) {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmitClaim = async () => {
    if (!description.trim() || !location.trim()) {
      Alert.alert("Missing Fields", "Please provide both the incident location and damage description.");
      return;
    }

    const newClaim = {
      id: Date.now().toString(),
      description: description.trim(),
      location: location.trim(),
      date: new Date().toLocaleDateString(),
      status: "Under Review"
    };

    try {
      await saveClaim(newClaim);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to submit your claim. Please try again.");
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
        <Text style={styles.title}>Submit Claim</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        <View style={styles.formCard}>
          <View style={styles.formHeaderRow}>
            <FileText size={22} color="#F97316" />
            <Text style={styles.heading}>Incident Report</Text>
          </View>

          <Text style={styles.inputLabel}>Incident Location</Text>
          <TextInput
            placeholder="e.g. Galle Road, Colombo 03"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />

          <Text style={styles.inputLabel}>Describe Accident or Damage</Text>
          <TextInput
            placeholder="Provide clear details regarding the collision, scratches, or component damage..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
            style={styles.textAreaInput}
          />

          <View style={styles.noticeBox}>
            <AlertCircle size={16} color="#D97706" style={{ marginTop: 2 }} />
            <Text style={styles.noticeText}>
              Submitting false reports may result in policy termination. Ensure all details are accurate before proceeding.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSubmitClaim}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Submit Claim</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}