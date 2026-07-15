// NotificationDetails.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  useWindowDimensions
} from "react-native";
import { ChevronLeft, Bell, AlertTriangle, ShieldCheck, Wrench, CreditCard } from "lucide-react-native";
import styles from "./styles";

export default function NotificationDetails({ route, navigation }) {
  const item = route?.params?.item || {};
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 600;

  const responsiveWrapperStyle = isLargeScreen
    ? { maxWidth: 540, alignSelf: "center", width: "100%" }
    : { width: "100%" };

  // Helper to pick a fitting icon based on the notification type
  const getNotificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "insurance":
        return <ShieldCheck size={28} color="#F97316" />;
      case "maintenance":
      case "service":
        return <Wrench size={28} color="#F97316" />;
      case "finance":
      case "emi":
        return <CreditCard size={28} color="#F97316" />;
      default:
        return <Bell size={28} color="#F97316" />;
    }
  };

  const isHighPriority = item.priority?.toLowerCase() === "high";

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
          <ChevronLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Alert Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={responsiveWrapperStyle}>
          
          <View style={styles.card}>
            
            {/* Top Row with Icon & Priority Badge */}
            <View style={styles.cardTopRow}>
              <View style={styles.iconBox}>
                {getNotificationIcon(item.type)}
              </View>

              {item.priority && (
                <View style={[styles.priorityBadge, isHighPriority ? styles.priorityHigh : styles.priorityMedium]}>
                  <AlertTriangle size={12} color={isHighPriority ? "#EF4444" : "#D97706"} />
                  <Text style={[styles.priorityText, isHighPriority ? styles.priorityTextHigh : styles.priorityTextMedium]}>
                    {item.priority} Priority
                  </Text>
                </View>
              )}
            </View>

            <Text style={styles.heading}>{item.title || "Notification Update"}</Text>

            <Text style={styles.message}>
              {item.message || "No additional details available for this alert."}
            </Text>

            {/* Meta Information Block */}
            <View style={styles.metaContainer}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Category</Text>
                <Text style={styles.metaValue}>{item.type || "General"}</Text>
              </View>

              {item.date && (
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Timestamp</Text>
                  <Text style={styles.metaValue}>{item.date}</Text>
                </View>
              )}
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