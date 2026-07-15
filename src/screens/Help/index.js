// HelpSupport.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function HelpSupport({ navigation }) {
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 600;

  function openEmail() {
    Linking.openURL("mailto:support@autosphere.dummy");
  }

  function openWebsite() {
    Linking.openURL("https://www.autosphere.dummy");
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
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={responsiveWrapperStyle}>
          
          {/* Hero Banner */}
          <View style={styles.hero}>
            <View style={styles.heroIconBox}>
              <Ionicons name="headset" size={32} color="#F97316" />
            </View>
            <Text style={styles.heroTitle}>How can we help you?</Text>
            <Text style={styles.heroText}>
              Get support, report issues, and learn more about AutoSphere.
            </Text>
          </View>

          {/* FAQ Section */}
          <View style={styles.sectionGroup}>
            <Text style={styles.sectionHeaderTitle}>Frequently Asked Questions</Text>
            <View style={styles.listContainer}>
              <FaqItem
                icon="car-outline"
                title="How to add my vehicle?"
                text="Go to My Garage and tap Add Vehicle to create your digital vehicle profile."
              />
              <FaqItem
                icon="analytics-outline"
                title="How is health score calculated?"
                text="AutoSphere AI analyzes vehicle details, mileage, maintenance, and expenses."
              />
              <FaqItem
                icon="shield-checkmark-outline"
                title="Are my vehicle details secure?"
                text="Your vehicle data is stored securely on your device."
              />
            </View>
          </View>

          {/* Contact Section */}
          <View style={styles.sectionGroup}>
            <Text style={styles.sectionHeaderTitle}>Contact Support</Text>
            <View style={styles.listContainer}>
              <ContactCard
                icon="mail-outline"
                title="Email Support"
                subtitle="support@autosphere.dummy"
                onPress={openEmail}
              />
              <ContactCard
                icon="globe-outline"
                title="Visit Website"
                subtitle="www.autosphere.dummy"
                onPress={openWebsite}
              />
            </View>
          </View>

          {/* Report Issue Button */}
          <TouchableOpacity
            style={styles.reportButton}
            onPress={openEmail}
            activeOpacity={0.85}
          >
            <View style={styles.reportIconBox}>
              <Ionicons name="bug-outline" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.reportText}>Report an Issue</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FaqItem({ icon, title, text }) {
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

function ContactCard({ icon, title, subtitle, onPress }) {
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
        <Text style={styles.descriptionText} numberOfLines={1}>{subtitle}</Text>
      </View>
      <View style={styles.chevronBox}>
        <Ionicons name="chevron-forward" size={16} color="#64748B" />
      </View>
    </TouchableOpacity>
  );
}