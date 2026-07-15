import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Platform,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import VehicleHealthCard from "../../components/VehicleHealthCard";
import { analyzeVehicleHealth } from "../../services/aiHealthService";
import Card from "../../components/Card";
import styles from "./styles";

export default function Dashboard({ navigation }) {
  const [health, setHealth] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(true);
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    loadHealth();
  }, []);

  async function loadHealth() {
    try {
      setLoadingHealth(true);
      const result = await analyzeVehicleHealth({
        vehicle: { brand: "Honda", model: "Civic", year: 2022, mileage: 87000, fuel: "Petrol" },
        maintenance: [
          { service: "Oil Change", date: "10-06-2026", cost: 5000 },
          { service: "Brake Inspection", date: "20-05-2026", cost: 3000 }
        ],
        expenses: [
          { category: "Fuel", amount: 12000 },
          { category: "Repair", amount: 5000 }
        ]
      });
      setHealth(result);
    } catch (error) {
      console.log("Health Error", error);
    } finally {
      setLoadingHealth(false);
    }
  }

  const coreUtilities = [
    { icon: "construct", title: "Maintenance", desc: "Logs & Schedule", route: "Maintenance" },
    { icon: "wallet", title: "Expenses", desc: "Track cashflows", route: "Expenses" },
    { icon: "notifications", title: "Reminders", desc: "Service alerts", route: "Reminder" },
    { icon: "scan", title: "OCR Scanner", desc: "Scan docs", route: "OCRScanner" },
  ];

  const servicesDocuments = [
    { icon: "analytics", title: "Reports", route: "Reports" },
    { icon: "shield", title: "Insurance", route: "Insurance" },
    { icon: "card", title: "Finance", route: "Finance" },
    { icon: "car-sport", title: "Driving School", route: "DrivingSchool" }
  ];

  // Dynamic max-width boundary layout constraints for larger screen scaling stability
  const centerContainerStyle = windowWidth > 600 ? { maxWidth: 540, alignSelf: "center", width: "100%" } : {};

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navbar Header */}
      <View style={styles.topBar}>
        <View style={styles.topBarInner}>
          <View style={styles.brandContainer}>
            <Image 
              source={require("../../../assets/logo/logo.png")} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <Text style={styles.brandName}>AutoSphere</Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("Notifications")}
            style={({ pressed }) => [styles.notificationIconButton, pressed && styles.elementPressed]}
          >
            <Ionicons name="notifications-outline" size={22} color="#0D1117" />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={centerContainerStyle}>
          
          {/* Welcome User Frame */}
          <View style={styles.headerContainer}>
            <Text style={styles.greetingText}>Hello Imara 👋</Text>
            <Text style={styles.subText}>Your smart digital vehicle assistant</Text>
          </View>

        {/* Core Target Primary Vehicle Display Module */}
        <View style={styles.heroVehicleCard}>
        <View style={styles.heroRow}>
            <View style={styles.heroMeta}>
            <Text style={styles.heroBadge}>PRIMARY VEHICLE</Text>
            <Text style={styles.heroVehicleTitle}>Honda Civic 2022</Text>
            <Text style={styles.heroVehicleSpecs}>87,000 KM • Petrol • WP CAB 1234</Text>
            </View>
            <View style={styles.heroIconWrapper}>
            <Ionicons name="car-sport" size={32} color="#F97316" />
            </View>
        </View>
        
        <View style={styles.heroFooter}>
            <View style={styles.statusIndicatorContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>System Status: Good Condition</Text>
            </View>
            <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
        </View>
        </View>

          {/* Core Utilities Static 2x2 Grid Layout */}
          <Text style={styles.sectionHeading}>Core Utilities</Text>
          <View style={styles.utilitiesGrid}>
            {coreUtilities.map((action, idx) => (
              <Pressable
                key={idx}
                onPress={() => navigation.navigate(action.route)}
                style={({ pressed }) => [styles.utilityGridCard, pressed && styles.cardPressed]}
              >
                <View style={styles.utilityIconBox}>
                  <Ionicons name={action.icon} size={22} color="#F97316" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.utilityCardTitle} numberOfLines={1}>{action.title}</Text>
                  <Text style={styles.utilityCardDesc} numberOfLines={1}>{action.desc}</Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Deep Feature Artificial Intelligence Core Module */}
          <Text style={styles.sectionHeading}>Intelligent Diagnosis</Text>
          <Pressable
            onPress={() => navigation.navigate("AI")}
            style={({ pressed }) => [styles.aiAssistantCard, pressed && styles.cardPressed]}
          >
            <View style={styles.aiLeftMarker} />
            <View style={styles.aiContentContainer}>
              <View style={styles.aiTitleRow}>
                <Text style={styles.aiAssistBadge}>AI COPILOT</Text>
                <Ionicons name="sparkles" size={14} color="#A855F7" />
              </View>
              <Text style={styles.aiMainHeading}>Ask AutoSphere AI</Text>
              <Text style={styles.aiBodyCopy}>Instantly diagnose system faults or scan physical dashboard trouble codes.</Text>
            </View>
          </Pressable>

          {/* Context Dynamic Render Diagnostics Frame */}
          {loadingHealth ? (
            <View containerStyle={styles.diagnosticLoadingCard}>
              <ActivityIndicator size="small" color="#A855F7" />
              <Text style={styles.loadingCopy}>Processing telemetry calculations...</Text>
            </View>
          ) : (
            health && (
              <View style={styles.healthCardWrapper}>
                <VehicleHealthCard score={health.score} analysis={health.analysis} />
              </View>
            )
          )}

          {/* Balanced Services & Documents Action Matrix Grid Area */}
          <Text style={styles.sectionHeading}>Services & Documents</Text>
          <View style={styles.compactActionGrid}>
            {servicesDocuments.map((action, idx) => (
              <Pressable
                key={idx}
                onPress={() => navigation.navigate(action.route)}
                style={({ pressed }) => [styles.compactGridButton, pressed && styles.elementPressed]}
              >
                {/* Icons updated globally to primary brand Vibrant Orange color */}
                <Ionicons name={action.icon} size={20} color="#F97316" />
                <Text style={styles.compactGridButtonText} numberOfLines={1}>{action.title}</Text>
              </Pressable>
            ))}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}