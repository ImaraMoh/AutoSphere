import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
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
        console.log(
            "Sending Image:",
            image
        );
        setLoading(true);
        const result = await extractTextFromImage(image);
        setText(
            result.text
        );

        navigation.navigate(
        "Documents",
        {
            screen:"DocumentAutoFill",
            params:{
                vehicleData:result.vehicleData,
                ocrText:result.text
            }
        }
        );

      if (!result) {
        Alert.alert("OCR Failed", "No text found. Try a clearer image.");
      }
    } catch (error) {
      console.log("ScanPreview Error:", error);
      Alert.alert("Error", "Unable to extract text from image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Document OCR</Text>
      </View>

      <Image source={{ uri: image }} style={styles.image} />

      <TouchableOpacity style={styles.button} onPress={scanDocument}>
        <FileText color="white" />
        <Text style={styles.buttonText}>Extract Text</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#F97316" style={{ marginTop: 20 }} />}

      {text.length > 0 && (
        <ScrollView style={styles.result}>
          <Text style={styles.resultTitle}>Extracted Text</Text>
          <Text>{text}</Text>
        </ScrollView>
      )}
    </View>
  );
}