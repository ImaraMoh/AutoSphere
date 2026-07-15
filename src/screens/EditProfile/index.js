import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getProfile, saveProfile } from "../../services/profileStorage";
import styles from "./styles";

export default function EditProfile({ navigation, route }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();
      if (data) {
        setProfile({
          name: data.name || data.fullname || "",
          email: data.email || "",
          phone: data.phone || "",
          image: data.image || null,
        });
      }
    } catch (error) {
      console.log("LOAD ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  function updateField(key, value) {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function pickImage() {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission Required", "Please allow photo access");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      let imageUri = asset.uri;

      if (Platform.OS === "web") {
        try {
          const response = await fetch(imageUri);
          const blob = await response.blob();
          imageUri = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (webError) {
          console.log("WEB IMAGE ERROR:", webError);
        }
      }

      setProfile((prev) => ({
        ...prev,
        image: imageUri,
      }));
    } catch (error) {
      console.log("IMAGE ERROR", error);
      Alert.alert("Error", "Unable to select image");
    }
  }

  function handleExit() {
    try {
      if (route?.params?.onProfileUpdated) {
        route.params.onProfileUpdated();
        return;
      }

      if (navigation && typeof navigation.goBack === "function" && navigation.canGoBack()) {
        navigation.goBack();
        return;
      }

      if (navigation && typeof navigation.navigate === "function") {
        navigation.navigate("Profile");
      }
    } catch (navError) {
      console.log("NAVIGATION EXIT ERROR:", navError);
    }
  }

  async function saveChanges() {
    if (saving) return;

    if (!profile.name || !profile.name.trim()) {
      Alert.alert("Missing Name", "Please enter your name");
      return;
    }

    try {
      setSaving(true);
      navigation.goBack();
      
      // Fixed async call to wait for proper Firestore storage execution before exiting
      await saveProfile(profile);

      Alert.alert("Success", "Profile updated successfully!", [
        {
          text: "OK",
          onPress: () => handleExit(),
        },
      ]);
    } catch (error) {
      console.log("SAVE ERROR:", error);
      Alert.alert("Error", "Unable to save profile changes.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleExit}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Profile</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* PROFILE IMAGE */}
        <View style={styles.imageWrapper}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={pickImage}
            activeOpacity={0.85}
          >
            {profile.image ? (
              <Image source={{ uri: profile.image }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons name="person" size={50} color="#F97316" />
              </View>
            )}

            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={14} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={styles.changePhoto}>Tap to change profile photo</Text>
        </View>

        {/* FORM CARD */}
        <View style={styles.card}>
          <Input
            label="Full Name"
            icon="person-outline"
            value={profile.name}
            onChangeText={(v) => updateField("name", v)}
          />

          <Input
            label="Email Address"
            icon="mail-outline"
            value={profile.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(v) => updateField("email", v)}
          />

          <Input
            label="Phone Number"
            icon="call-outline"
            value={profile.phone}
            keyboardType="phone-pad"
            onChangeText={(v) => updateField("phone", v)}
          />
        </View>

        {/* SAVE BUTTON */}
        <View style={{ marginTop: 10, marginBottom: 40 }}>
          <TouchableOpacity
            style={[styles.saveButton, saving && { opacity: 0.6 }]}
            disabled={saving}
            onPress={saveChanges}
            activeOpacity={0.85}
          >
            {saving ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.saveText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <Ionicons name={icon} size={20} color="#F97316" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={label}
          placeholderTextColor="#94A3B8"
          {...props}
        />
      </View>
    </View>
  );
}