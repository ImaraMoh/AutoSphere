// LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { registerUserWithFirebase, loginUserWithFirebase } from "../../firebase/authService";
import styles from "./styles";

export default function LoginScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  // Primary Vehicle Fields
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all mandatory fields.");
      return;
    }

    setLoading(true);

    try {
      if (activeTab === "register") {
        if (!fullName || !vehicleMake || !vehicleModel || !vehicleNumber) {
          Alert.alert("Incomplete Details", "Please fill in your name and primary vehicle information.");
          setLoading(false);
          return;
        }

        const primaryVehicleData = {
          make: vehicleMake,
          model: vehicleModel,
          year: vehicleYear,
          plateNumber: vehicleNumber,
        };

        // Register in Firebase Auth & Firestore
        await registerUserWithFirebase(email.trim().toLowerCase(), password, fullName, primaryVehicleData);

        setLoading(false);
        setActiveTab("login");
        Alert.alert("Success", "Account created successfully! Please sign in with your credentials.");
      } else {
        // Sign in via Firebase Auth
        await loginUserWithFirebase(email.trim().toLowerCase(), password);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // Explicitly log the full error object to your terminal for debugging
      console.log("FIREBASE AUTH ERROR CODE:", error.code);
      console.log("FIREBASE AUTH ERROR MESSAGE:", error.message);
      
      Alert.alert(
        "Authentication Error", 
        error.message || "Failed to process request. Check terminal logs."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Brand Header */}
        <View style={styles.headerContainer}>
          <View style={styles.iconWrapper}>
            <Image
              source={require("../../../assets/logo/logo.png")}
              style={{ width: 68, height: 68, borderRadius: 22,resizeMode: "contain" }}
            />
          </View>
          <Text style={styles.brandTitle}>AutoSphere</Text>
          <Text style={styles.brandSubtitle}>Manage your garage & rides seamlessly</Text>
        </View>

        {/* Tab Switcher Card */}
        <View style={styles.card}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "login" && styles.activeTab]}
              onPress={() => setActiveTab("login")}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === "login" && styles.activeTabText]}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "register" && styles.activeTab]}
              onPress={() => setActiveTab("register")}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === "register" && styles.activeTabText]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields Section */}
          {activeTab === "register" && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#94A3B8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Primary Vehicle Registration Fields */}
          {activeTab === "register" && (
            <View style={styles.vehicleSectionContainer}>
              <Text style={styles.sectionHeader}>Primary Vehicle Information</Text>
              
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Make</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. BMW"
                    placeholderTextColor="#94A3B8"
                    value={vehicleMake}
                    onChangeText={setVehicleMake}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Model</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. M3"
                    placeholderTextColor="#94A3B8"
                    value={vehicleModel}
                    onChangeText={setVehicleModel}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Year</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="2023"
                    placeholderTextColor="#94A3B8"
                    keyboardType="numeric"
                    value={vehicleYear}
                    onChangeText={setVehicleYear}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Plate Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="ABC-1234"
                    placeholderTextColor="#94A3B8"
                    value={vehicleNumber}
                    onChangeText={setVehicleNumber}
                  />
                </View>
              </View>
            </View>
          )}

          {/* Action Button */}
          <TouchableOpacity 
            style={[styles.submitButton, loading && { opacity: 0.7 }]} 
            onPress={handleSubmit} 
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.submitButtonText}>
                  {activeTab === "login" ? "Login" : "Complete Registration"}
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
              </>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}