import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function ChangePassword({ navigation }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility toggle states for enhanced security control UX
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;

  function updatePassword() {
    if (!oldPassword || !newPassword || !confirmPassword) {
      if (Platform.OS === "web") {
        alert("Please fill all required password parameters.");
      } else {
        Alert.alert("Error", "Please fill all fields");
      }
      return;
    }

    if (newPassword !== confirmPassword) {
      if (Platform.OS === "web") {
        alert("Your new passwords do not match.");
      } else {
        Alert.alert("Error", "Passwords do not match");
      }
      return;
    }

    if (Platform.OS === "web") {
      alert("🎉 Success! Your password has been updated securely.");
      navigation.goBack();
    } else {
      Alert.alert(
        "Success", 
        "Password updated successfully",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Balanced Navigation Header Layout */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.title}>Change Password</Text>
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
          {/* Main Content Interface Card */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name="lock-closed" size={26} color="#F97316" />
            </View>

            <Text style={styles.heading}>Update Credentials</Text>
            <Text style={styles.subheading}>
              Ensure your account stays secure by using a strong combination of keys.
            </Text>

            <View style={styles.formGroup}>
              {/* Current Password Field */}
              <PasswordField
                label="Current Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={!showOld}
                onToggleVisible={() => setShowOld(!showOld)}
                isVisible={showOld}
              />

              {/* New Password Field */}
              <PasswordField
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNew}
                onToggleVisible={() => setShowNew(!showNew)}
                isVisible={showNew}
              />

              {/* Confirm New Password Field */}
              <PasswordField
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                onToggleVisible={() => setShowConfirm(!showConfirm)}
                isVisible={showConfirm}
              />
            </View>

            {/* Form Execution Submission Control */}
            <TouchableOpacity 
              style={styles.button} 
              activeOpacity={0.8}
              onPress={updatePassword}
            >
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Subcomponent encapsulating styled password layout alongside inline visibility toggles
function PasswordField({ label, onToggleVisible, isVisible, ...inputProps }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.passwordInputWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          autoCorrect={false}
          {...inputProps}
        />
        <TouchableOpacity 
          style={styles.visibilityToggle} 
          onPress={onToggleVisible}
          activeOpacity={0.6}
        >
          <Ionicons 
            name={isVisible ? "eye-off-outline" : "eye-outline"} 
            size={20} 
            color="#64748B" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}