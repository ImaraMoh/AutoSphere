import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { saveVehicle } from "../../services/vehicleStorage";
import styles from "./styles";

export default function AddVehicle({ navigation }) {
  const [image, setImage] = useState(null);
  const [vehicle, setVehicle] = useState({
    type: "Car",
    brand: "",
    model: "",
    year: "",
    registration: "",
    mileage: "",
    fuel: "Petrol"
  });

  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;

  const vehicleTypes = ["Car", "Bike", "Van", "Truck"];
  const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];

  function updateField(key, value) {
    setVehicle({
      ...vehicle,
      [key]: value
    });
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions?.Images || ["images"],
      quality: 0.7,
      base64: true
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage({
        uri: asset.uri,
        base64: asset.base64
      });
    }
  };

  async function handleSave() {
    if (!vehicle.brand || !vehicle.model || !vehicle.registration) {
      Alert.alert(
        "Missing Information",
        "Please enter vehicle brand, model and registration number."
      );
      return;
    }

    await saveVehicle({
      ...vehicle,
      image: image ? `data:image/jpeg;base64,${image.base64}` : null,
      id: Date.now().toString(),
      healthScore: 92,
      createdAt: new Date().toISOString()
    });

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.title}>Add Vehicle</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContainer,
            isLargeScreen && styles.scrollContainerLarge
          ]}
        >
          {/* Image Picker */}
          <TouchableOpacity
            style={[styles.imagePicker, image && styles.imagePickerActive]}
            onPress={pickImage}
            activeOpacity={0.9}
          >
            {image ? (
              <Image source={{ uri: image.uri }} style={styles.vehicleImage} />
            ) : (
              <View style={{ alignItems: "center" }}>
                <View style={styles.cameraIconContainer}>
                  <Ionicons name="camera" size={28} color="#F97316" />
                </View>
                <Text style={styles.uploadText}>Upload Vehicle Image</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Vehicle Type Selection */}
          <Text style={styles.sectionLabel}>Vehicle Type</Text>
          <View style={styles.chipRow}>
            {vehicleTypes.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  vehicle.type === item && styles.activeChip
                ]}
                onPress={() => updateField("type", item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.chipText,
                    vehicle.type === item && styles.activeChipText
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form Inputs */}
          <View style={styles.formGroup}>
            <Input
              label="Brand"
              placeholder="e.g., Toyota"
              placeholderTextColor="#94A3B8"
              value={vehicle.brand}
              onChangeText={(v) => updateField("brand", v)}
            />

            <Input
              label="Model"
              placeholder="e.g., Corolla"
              placeholderTextColor="#94A3B8"
              value={vehicle.model}
              onChangeText={(v) => updateField("model", v)}
            />

            <View style={styles.doubleRow}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Year"
                  placeholder="2022"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  value={vehicle.year}
                  onChangeText={(v) => updateField("year", v)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Mileage"
                  placeholder="87000"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  value={vehicle.mileage}
                  onChangeText={(v) => updateField("mileage", v)}
                />
              </View>
            </View>

            <Input
              label="Registration Number"
              placeholder="e.g., ABC-1234"
              placeholderTextColor="#94A3B8"
              value={vehicle.registration}
              onChangeText={(v) => updateField("registration", v)}
            />
          </View>

          {/* Fuel Type Selection */}
          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Fuel Type</Text>
          <View style={styles.chipRow}>
            {fuelTypes.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  vehicle.fuel === item && styles.activeChip
                ]}
                onPress={() => updateField("fuel", item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.chipText,
                    vehicle.fuel === item && styles.activeChipText
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveText}>Save Vehicle</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Input({ label, ...props }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
}