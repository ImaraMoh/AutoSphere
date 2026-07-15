// Security.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function Security({ navigation }) {
  const [biometric, setBiometric] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 600;

  function changePassword() {
    navigation.navigate("ChangePassword");
  }

  function logoutDevices() {
    Alert.alert(
      "Logout Devices",
      "Do you want to logout from all connected devices?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout All",
          style: "destructive",
          onPress: () => {
            Alert.alert("Done", "All devices logged out");
          }
        }
      ]
    );
  }

  const responsiveWrapperStyle = isLargeScreen
    ? { maxWidth: 540, alignSelf: "center", width: "100%" }
    : { width: "100%" };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Security</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={responsiveWrapperStyle}>
          
          {/* Security Hero Banner */}
          <View style={styles.securityHero}>
            <View style={styles.securityIconBox}>
              <Ionicons name="shield-checkmark" size={32} color="#F97316" />
            </View>
            <Text style={styles.heroTitle}>Account Security</Text>
            <Text style={styles.heroText}>
              Protect your AutoSphere account with advanced security settings.
            </Text>
          </View>

          {/* Action List Container */}
          <View style={styles.listContainer}>
            <SecurityItem
              icon="key-outline"
              title="Change Password"
              description="Update your account password regularly"
              onPress={changePassword}
            />

            <SecuritySwitch
              icon="finger-print-outline"
              title="Biometric Login"
              description="Use fingerprint or face authentication"
              value={biometric}
              onChange={setBiometric}
            />

            <SecuritySwitch
              icon="lock-closed-outline"
              title="Two Factor Authentication"
              description="Add an extra layer of account protection"
              value={twoFactor}
              onChange={setTwoFactor}
            />

            <SecurityItem
              icon="phone-portrait-outline"
              title="Connected Devices"
              description="Manage devices logged into your account"
              onPress={() => navigation.navigate("ConnectedDevices")}
            />

            <SecurityItem
              icon="log-out-outline"
              title="Logout All Devices"
              description="Remove access from all active sessions"
              onPress={logoutDevices}
              isDestructive={true}
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SecurityItem({ icon, title, description, onPress, isDestructive }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, isDestructive && styles.destructiveIconBox]}>
        <Ionicons
          name={icon}
          size={18}
          color={isDestructive ? "#EF4444" : "#F97316"}
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.cardTitle, isDestructive && styles.destructiveCardTitle]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.descriptionText} numberOfLines={2}>
          {description}
        </Text>
      </View>

      {!isDestructive && (
        <View style={styles.chevronBox}>
          <Ionicons name="chevron-forward" size={16} color="#64748B" />
        </View>
      )}
    </TouchableOpacity>
  );
}

function SecuritySwitch({ icon, title, description, value, onChange }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color="#F97316" />
      </View>

      <View style={styles.content}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.descriptionText} numberOfLines={2}>
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#E2E8F0", true: "#FED7AA" }}
        thumbColor={value ? "#F97316" : "#FFFFFF"}
        ios_backgroundColor="#E2E8F0"
        style={Platform.OS === "ios" ? { transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] } : {}}
      />
    </View>
  );
}