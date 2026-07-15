import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar
} from "react-native";
import { ChevronLeft, FileText } from "lucide-react-native";
import { extractTextFromImage } from "../../services/ocrService";
import styles from "./styles";

export default function ScanPreview({ route, navigation }) {
  const { image } = route.params;
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const scanDocument = async () => {
    try {
      console.log("Sending Image:", image);
      setLoading(true);
      
      const result = await extractTextFromImage(image);
      
      if (!result || !result.text) {
        Alert.alert("OCR Failed", "No valid text could be found. Please capture a clearer image under better lighting.");
        return;
      }

      setText(result.text);

      // Navigate immediately with the parsed vehicle metadata payload
      navigation.navigate("Documents", {
        screen: "DocumentAutoFill",
        params: {
          vehicleData: result.vehicleData || {},
          ocrText: result.text
        }
      });

    } catch (error) {
      console.log("ScanPreview Error:", error);
      Alert.alert("Extraction Error", "Unable to extract document text. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={styles.title}>Document Preview</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Document Image Wrapper */}
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        </View>

        {/* Action Controls Section */}
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={scanDocument}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <FileText color="white" size={20} />
              <Text style={styles.buttonText}>Extract Text</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Raw Extracted Data Text View Block */}
        {text.length > 0 && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Parsed OCR Text Results</Text>
            <View style={styles.resultCard}>
              <Text style={styles.resultBodyText}>{text}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}