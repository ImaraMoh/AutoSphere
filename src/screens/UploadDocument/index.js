// UploadDocument.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { saveDocument } from "../../services/documentStorage";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./styles";

export default function UploadDocument({ route, navigation }) {
  const vehicleId = route?.params?.vehicleId || null;

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [customType, setCustomType] = useState("");
  const [expiry, setExpiry] = useState("");
  const [file, setFile] = useState(null);

  const [vehicleModel, setVehicleModel] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [owner, setOwner] = useState("");

  const [showDate, setShowDate] = useState(false);
  const { width: windowWidth } = useWindowDimensions();

  const types = ["Insurance", "Registration", "License", "Service", "Warranty", "Other"];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setFile({
        uri: result.assets[0].uri,
        type: "image",
      });
    }
  };

  const pickPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled) {
      setFile({
        uri: result.assets[0].uri,
        type: "pdf",
      });
    }
  };

  const save = async () => {
    console.log("Save button clicked");

    if (!auth.currentUser) {
      console.log("Blocked: No authenticated user");
      Alert.alert("Authentication Error", "You must be logged in to save documents.");
      return;
    }

    if (!vehicleId) {
      console.log("Blocked: No vehicleId provided");
      Alert.alert("Missing Vehicle", "No target vehicle was selected. Please go back and select a vehicle.");
      return;
    }

    const finalType = type === "Other" ? customType : type;

    if (!title || !finalType || !file) {
      console.log("Blocked: Missing fields", { title, finalType, file });
      Alert.alert("Missing Information", "Document name, type and file are required.");
      return;
    }

    const document = {
      id: Date.now().toString(),
      title,
      type: finalType,
      vehicleModel,
      registrationNumber,
      owner,
      expiryDate: expiry,
      file,
      status: "Valid",
      createdAt: new Date().toISOString(),
    };

    try {
      console.log("Attempting to save document to storage for vehicle:", vehicleId);
      await saveDocument(vehicleId, document);
      console.log("Document saved successfully");
      Alert.alert("Success", "Document saved successfully.");
      navigation.goBack();
    } catch (error) {
      console.log("Error inside saveDocument catch block:", error);
      Alert.alert("Error", `Failed to save document: ${error.message || error}`);
    }
  };

  const isLargeScreen = windowWidth > 600;
  const responsiveWrapperStyle = isLargeScreen
    ? { maxWidth: 540, alignSelf: "center", width: "100%" }
    : { width: "100%" };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Document</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={responsiveWrapperStyle}>
          
          <View style={styles.formCard}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="document-text" size={16} color="#F97316" />
              <Text style={styles.sectionTitle}>Document Details</Text>
            </View>

            <Input
              label="Document Name"
              value={title}
              setValue={setTitle}
              placeholder="e.g., Comprehensive Insurance"
            />

            <Input
              label="Vehicle Model"
              value={vehicleModel}
              setValue={setVehicleModel}
              placeholder="e.g., Honda Civic"
            />

            <Input
              label="Registration Number"
              value={registrationNumber}
              setValue={setRegistrationNumber}
              placeholder="e.g., ABC-1234"
            />

            <Input
              label="Owner Name"
              value={owner}
              setValue={setOwner}
              placeholder="e.g., John Doe"
            />

            <Text style={styles.label}>Document Type</Text>
            <View style={styles.typesContainer}>
              {types.map((item) => {
                const isSelected = type === item;
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setType(item)}
                    activeOpacity={0.8}
                    style={[
                      styles.typeChip,
                      isSelected ? styles.selectedTypeChip : styles.unselectedTypeChip,
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeChipText,
                        isSelected ? styles.selectedTypeText : styles.unselectedTypeText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {type === "Other" && (
              <TextInput
                style={[styles.input, { marginTop: 10 }]}
                placeholder="Enter custom document type"
                placeholderTextColor="#94A3B8"
                value={customType}
                onChangeText={setCustomType}
              />
            )}

            <Text style={styles.label}>Expiry Date</Text>
            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => setShowDate(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="calendar-outline" size={18} color="#F97316" />
              <Text style={styles.dateText}>{expiry || "Select Expiry Date"}</Text>
            </TouchableOpacity>

            {Platform.OS === "web" && showDate && (
              <input
                type="date"
                style={{
                  marginTop: 10,
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#F8FAFC",
                  fontFamily: "inherit",
                }}
                onChange={(e) => {
                  setExpiry(e.target.value);
                  setShowDate(false);
                }}
              />
            )}

            {Platform.OS !== "web" && showDate && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                onChange={(e, date) => {
                  setShowDate(false);
                  if (date) {
                    setExpiry(date.toLocaleDateString());
                  }
                }}
              />
            )}
          </View>

          <View style={styles.formCard}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="cloud-upload" size={16} color="#F97316" />
              <Text style={styles.sectionTitle}>Attachment</Text>
            </View>

            <View style={styles.uploadRow}>
              <TouchableOpacity
                style={[
                  styles.uploadOptionBtn,
                  file?.type === "image" && styles.uploadOptionActive,
                ]}
                onPress={pickImage}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="image-outline"
                  size={20}
                  color={file?.type === "image" ? "#F97316" : "#64748B"}
                />
                <Text
                  style={[
                    styles.uploadOptionText,
                    file?.type === "image" && styles.uploadOptionTextActive,
                  ]}
                >
                  {file?.type === "image" ? "Image Selected" : "Upload Image"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.uploadOptionBtn,
                  file?.type === "pdf" && styles.uploadOptionActive,
                ]}
                onPress={pickPDF}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="document-outline"
                  size={20}
                  color={file?.type === "pdf" ? "#F97316" : "#64748B"}
                />
                <Text
                  style={[
                    styles.uploadOptionText,
                    file?.type === "pdf" && styles.uploadOptionTextActive,
                  ]}
                >
                  {file?.type === "pdf" ? "PDF Selected" : "Upload PDF"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={save} activeOpacity={0.9}>
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
            <Text style={styles.saveText}>Save Document</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

function Input({ label, value, setValue, placeholder }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
      />
    </View>
  );
}