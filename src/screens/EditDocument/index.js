import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar
} from "react-native";
import { ChevronLeft, Upload, Calendar, FileText, Image as ImageIcon } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { updateDocument } from "../../services/documentStorage";
import styles from "./styles";

export default function EditDocument({ route, navigation }) {
  const { document } = route.params || {};
  const [data, setData] = useState(document);
  const [showDate, setShowDate] = useState(false);

  const changeFile = async (type) => {
    if (type === "image") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setData({
          ...data,
          file: {
            uri: result.assets[0].uri,
            type: "image"
          }
        });
      }
    } else {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf"
      });

      if (!result.canceled) {
        setData({
          ...data,
          file: {
            uri: result.assets[0].uri,
            type: "pdf"
          }
        });
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    // For iOS/Android, dismiss the picker immediately
    if (Platform.OS !== 'ios') {
      setShowDate(false);
    }
    
    if (selectedDate) {
      // Formats date cleanly as YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setData({
        ...data,
        expiryDate: formattedDate
      });
    }
  };

  const save = async () => {
    await updateDocument(data);
    navigation.goBack();
  };

  // Safe fallback date object generation logic for the picker
  const getInitialDate = () => {
    if (data.expiryDate) {
      const parsed = new Date(data.expiryDate);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Structural Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Document</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>
          
          {/* Document Title Input Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Document Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Comprehensive Insurance"
              placeholderTextColor="#94A3B8"
              value={data.title}
              onChangeText={(v) => setData({ ...data, title: v })}
            />
          </View>

          {/* Vehicle Model Input Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Vehicle Model</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Tesla Model 3"
              placeholderTextColor="#94A3B8"
              value={data.vehicleModel}
              onChangeText={(v) => setData({ ...data, vehicleModel: v })}
            />
          </View>

          {/* Registered Owner Input Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Registered Owner</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Jane Doe"
              placeholderTextColor="#94A3B8"
              value={data.owner}
              onChangeText={(v) => setData({ ...data, owner: v })}
            />
          </View>

          {/* Interactive Date Picker Row Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Expiry Date</Text>
            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => setShowDate(true)}
              activeOpacity={0.7}
            >
              <View style={styles.dateLeftBlock}>
                <Calendar size={20} color="#F97316" style={styles.dateIcon} />
                <Text style={data.expiryDate ? styles.dateText : styles.datePlaceholder}>
                  {data.expiryDate || "Select Expiry Date"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Web Engine Date Picker Native Input Layer */}
          {Platform.OS === "web" && showDate && (
            <input
              type="date"
              style={{
                padding: '12px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                marginTop: '-8px',
                marginBottom: '16px',
                fontFamily: 'inherit',
                width: '100%',
                boxSizing: 'border-box'
              }}
              value={data.expiryDate || ""}
              onChange={(e) => {
                setData({ ...data, expiryDate: e.target.value });
                setShowDate(false);
              }}
            />
          )}

          {/* Native Target Mobile Dynamic Modal Layer */}
          {Platform.OS !== "web" && showDate && (
            <View style={styles.pickerWrapper}>
              <DateTimePicker
                value={getInitialDate()}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={handleDateChange}
              />
              {Platform.OS === 'ios' && (
                <TouchableOpacity 
                  style={styles.closePickerButton} 
                  onPress={() => setShowDate(false)}
                >
                  <Text style={styles.closePickerText}>Confirm Date</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Upload and Attachment Selection Container */}
          <Text style={styles.sectionHeading}>Update Digital Proof Attachment</Text>
          
          <View style={styles.uploadRow}>
            <TouchableOpacity
              style={[styles.uploadButton, data.file?.type === 'image' && styles.activeUploadButton]}
              onPress={() => changeFile("image")}
              activeOpacity={0.8}
            >
              <ImageIcon size={20} color={data.file?.type === 'image' ? '#F97316' : '#64748B'} />
              <Text style={[styles.uploadButtonText, data.file?.type === 'image' && styles.activeUploadButtonText]}>
                {data.file?.type === 'image' ? "Image Selected" : "Upload Image"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.uploadButton, data.file?.type === 'pdf' && styles.activeUploadButton]}
              onPress={() => changeFile("pdf")}
              activeOpacity={0.8}
            >
              <FileText size={20} color={data.file?.type === 'pdf' ? '#F97316' : '#64748B'} />
              <Text style={[styles.uploadButtonText, data.file?.type === 'pdf' && styles.activeUploadButtonText]}>
                {data.file?.type === 'pdf' ? "PDF Selected" : "Upload PDF"}
              </Text>
            </TouchableOpacity>
          </View>

          {data.file?.uri && (
            <Text style={styles.fileUriIndicator} numberOfLines={1}>
              File Path: {data.file.uri}
            </Text>
          )}

        </View>
      </ScrollView>

      {/* Action Button Footer Block Layout */}
      <View style={styles.footerActionContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={save} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}