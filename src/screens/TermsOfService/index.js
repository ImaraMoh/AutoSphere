import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function TermsOfService({ navigation }) {
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 600;

  const responsiveWrapperStyle = isLargeScreen
    ? { maxWidth: 540, alignSelf: "center", width: "100%" }
    : { width: "100%" };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Terms of Service</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={responsiveWrapperStyle}>
          
          <View style={styles.card}>
            <Text style={styles.lastUpdated}>Effective Date: July 15, 2026</Text>
            
            <Text style={styles.sectionHeaderTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.descriptionText}>
              By accessing or using AutoSphere, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use the application.
            </Text>

            <Text style={styles.sectionHeaderTitle}>2. Use of Service</Text>
            <Text style={styles.descriptionText}>
              AutoSphere provides an AI-powered digital vehicle management platform. You agree to use the app only for lawful purposes and in accordance with these terms. You are responsible for ensuring all vehicle data entered is accurate.
            </Text>

            <Text style={styles.sectionHeaderTitle}>3. AI Recommendations & Disclaimer</Text>
            <Text style={styles.descriptionText}>
              Maintenance insights, health scores, and predictions provided by AutoSphere AI are for informational purposes only and should not replace professional mechanical diagnosis or certified inspection.
            </Text>

            <Text style={styles.sectionHeaderTitle}>4. Data & Privacy</Text>
            <Text style={styles.descriptionText}>
              Your vehicle data is stored securely on your device. Please review our Privacy Policy to understand how information is handled within the ecosystem.
            </Text>

            <Text style={styles.sectionHeaderTitle}>5. Modifications</Text>
            <Text style={styles.descriptionText}>
              We reserve the right to modify these terms at any time. Continued use of AutoSphere following changes constitutes your formal acceptance of the updated terms.
            </Text>
          </View>

          <Text style={styles.copyrightText}>
            © 2026 AutoSphere. All rights reserved.
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}