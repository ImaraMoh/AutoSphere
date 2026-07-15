// AboutAutoSphere.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  SafeAreaView,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function AboutAutoSphere({ navigation }) {
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 600;

  function openPrivacy() {
    navigation.navigate("Privacy");
  }

  function openTerms() {
    navigation.navigate("TermsOfService");
  }

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
        <Text style={styles.title}>About AutoSphere</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={responsiveWrapperStyle}>
          
          {/* Brand Identity Showcase */}
          <View style={styles.brandCard}>
            <View style={styles.logoBox}>
              <Image
                source={require("../../../assets/logo/logo.png")}
                style={styles.logo}
              />
            </View>
            <Text style={styles.appName}>AutoSphere</Text>
            <Text style={styles.tagline}>Your Smart Vehicle Companion</Text>
            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>Version 1.0.0</Text>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.standardCard}>
            <Text style={styles.sectionHeaderTitle}>About</Text>
            <Text style={styles.descriptionText}>
              AutoSphere is an AI-powered vehicle management platform that helps users maintain, monitor, and understand their vehicles digitally.
            </Text>
            <Text style={[styles.descriptionText, { marginTop: 10 }]}>
              Create vehicle profiles, track expenses, manage documents, and receive AI-based maintenance recommendations seamlessly.
            </Text>
          </View>

          {/* Key Features Section */}
          <View style={styles.sectionGroup}>
            <Text style={styles.sectionHeaderTitle}>Key Features</Text>
            <View style={styles.listContainer}>
              <Feature
                icon="car-outline"
                title="Digital Vehicle Profile"
                text="Manage cars, bikes, vans and trucks digitally."
              />
              <Feature
                icon="analytics-outline"
                title="AI Vehicle Health"
                text="Smart health scoring and maintenance prediction."
              />
              <Feature
                icon="wallet-outline"
                title="Expense Tracking"
                text="Monitor fuel and vehicle expenses effortlessly."
              />
              <Feature
                icon="document-text-outline"
                title="Document Wallet"
                text="Store important vehicle papers securely."
              />
            </View>
          </View>

          {/* Developed By Section */}
          <View style={styles.standardCard}>
            <Text style={styles.sectionHeaderTitle}>Developed By</Text>
            <Text style={styles.companyTitle}>AutoSphere Technologies</Text>
            <Text style={[styles.descriptionText, { marginTop: 4 }]}>
              Building intelligent solutions for modern mobility.
            </Text>
          </View>

          {/* Legal Section */}
          <View style={styles.sectionGroup}>
            <Text style={styles.sectionHeaderTitle}>Legal</Text>
            <View style={styles.listContainer}>
              <LegalRow
                icon="shield-checkmark-outline"
                title="Privacy Policy"
                onPress={openPrivacy}
              />
              <LegalRow
                icon="document-lock-outline"
                title="Terms of Service"
                onPress={openTerms}
              />
            </View>
          </View>

          <Text style={styles.copyrightText}>
            © 2026 AutoSphere. All rights reserved.
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Feature({ icon, title, text }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color="#F97316" />
      </View>
      <View style={styles.content}>
        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.descriptionText}>{text}</Text>
      </View>
    </View>
  );
}

function LegalRow({ icon, title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color="#F97316" />
      </View>
      <View style={styles.content}>
        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.chevronBox}>
        <Ionicons name="chevron-forward" size={16} color="#64748B" />
      </View>
    </TouchableOpacity>
  );
}