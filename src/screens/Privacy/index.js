// Privacy.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function Privacy({ navigation }) {
  const { width: windowWidth } = useWindowDimensions();

  const isLargeScreen = windowWidth > 600;
  const responsiveWrapperStyle = isLargeScreen
    ? { maxWidth: 540, alignSelf: "center", width: "100%" }
    : { width: "100%" };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Privacy</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={responsiveWrapperStyle}>
          
          {/* HERO SECTION */}
          <View style={styles.heroCard}>
            <View style={styles.heroGlowEffect} />
            
            <View style={styles.heroIconBox}>
              <Ionicons name="shield-checkmark" size={32} color="#F97316" />
            </View>

            <Text style={styles.heroTitle}>Your Privacy Matters</Text>
            <Text style={styles.heroText}>
              AutoSphere protects your vehicle data and personal information with robust secure storage standards.
            </Text>
          </View>

          {/* PRIVACY CARDS */}
          <PrivacyCard
            icon="person-circle-outline"
            title="Personal Information"
            description="Your profile details are stored securely and used exclusively to personalize your vehicle management experience."
          />

          <PrivacyCard
            icon="car-outline"
            title="Vehicle Data"
            description="All your vehicle profiles, tracking records, and maintenance logs are kept completely secure and private."
          />

          <PrivacyCard
            icon="lock-closed-outline"
            title="Data Protection"
            description="Your sensitive information is heavily shielded using modern secure local storage architectures."
          />

          <PrivacyCard
            icon="trash-outline"
            title="Delete Account Data"
            description="You stay in full control. You can request complete removal of your stored application info at any time."
          />

        </View>
      </ScrollView>
    </View>
  );
}

function PrivacyCard({ icon, title, description }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={20} color="#F97316" />
      </View>

      <View style={styles.content}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}