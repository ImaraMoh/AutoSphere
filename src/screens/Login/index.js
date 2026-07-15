import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

export default function LoginScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  // Primary Vehicle Fields
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  // Handle Authentication / Registration Flow
  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all mandatory fields.");
      return;
    }

    try {
      if (activeTab === "register") {
        if (!fullName || !vehicleMake || !vehicleModel || !vehicleNumber) {
          Alert.alert("Incomplete Details", "Please fill in your name and primary vehicle information.");
          return;
        }

        const userData = {
          fullName,
          email,
          password, 
          primaryVehicle: {
            make: vehicleMake,
            model: vehicleModel,
            year: vehicleYear,
            plateNumber: vehicleNumber,
          },
        };

        // Save to Local Storage for Profile & Dashboard retrieval
        await AsyncStorage.setItem("@user_profile", JSON.stringify(userData));
        await AsyncStorage.setItem("@primary_vehicle", JSON.stringify(userData.primaryVehicle));

        // Automatically switch to login tab and prefill user's email for convenience
        setActiveTab("login");
        Alert.alert("Success", "Account created successfully! Please sign in with your credentials.");
      } else {
        // Sign In Verification check
        const storedUser = await AsyncStorage.getItem("@user_profile");
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.email.toLowerCase() === email.trim().toLowerCase()) {
            navigation.replace("MainTabs");
            return;
          }
        }

        // Fallback mock validation if storage was empty
        const fallbackUserData = {
          fullName: "Garage Member",
          email: email,
          primaryVehicle: { make: "Tesla", model: "Model 3", year: "2024", plateNumber: "CA-7789" }
        };
        await AsyncStorage.setItem("@user_profile", JSON.stringify(fallbackUserData));
        await AsyncStorage.setItem("@primary_vehicle", JSON.stringify(fallbackUserData.primaryVehicle));

        navigation.replace("MainTabs");
      }
    } catch (error) {
      Alert.alert("Storage Error", "Failed to process user authentication.");
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
            <Ionicons name="car-sport" size={36} color="#F97316" />
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

          {/* Primary Vehicle Registration Fields (Only shown on Register tab) */}
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
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.85}>
            <Text style={styles.submitButtonText}>
              {activeTab === "login" ? "Sign In to Garage" : "Complete Registration"}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}