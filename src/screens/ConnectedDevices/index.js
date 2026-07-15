// ConnectedDevices.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function ConnectedDevices({ navigation }) {
  const [devices, setDevices] = useState([
    { id: 1, name: "Chrome Browser", type: "Web", active: true },
    { id: 2, name: "iPhone 15 Pro", type: "Mobile", active: false }
  ]);

  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 600;

  const handleDisconnectDevice = (id, name) => {
    const performRemoval = () => {
      setDevices(prevDevices => prevDevices.filter(device => device.id !== id));
    };

    if (Platform.OS === "web") {
      const confirmWeb = window.confirm(`Are you sure you want to log out of ${name}?`);
      if (confirmWeb) performRemoval();
    } else {
      Alert.alert(
        "Log Out Device",
        `Are you sure you want to terminate the active session on ${name}?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Log Out", style: "destructive", onPress: performRemoval }
        ]
      );
    }
  };

  const responsiveWrapperStyle = isLargeScreen
    ? { maxWidth: 540, alignSelf: "center", width: "100%" }
    : { width: "100%" };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Connected Devices</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={responsiveWrapperStyle}>
          
          {/* Descriptive Section Heading */}
          <Text style={styles.description}>
            Manage devices currently signed into your AutoSphere account and revoke access if necessary.
          </Text>

          {/* Dynamic Sessions Container Loop */}
          <View style={styles.devicesListContainer}>
            {devices.length > 0 ? (
              devices.map((item) => (
                <View key={item.id} style={styles.deviceCard}>
                  <View style={styles.iconBox}>
                    <Ionicons
                      name={item.type === "Web" ? "desktop-outline" : "phone-portrait-outline"}
                      size={20}
                      color="#F97316"
                    />
                  </View>

                  <View style={styles.deviceDetails}>
                    <View style={styles.nameStatusRow}>
                      <Text style={styles.deviceName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      {item.active && (
                        <View style={styles.activeBadge}>
                          <Text style={styles.activeBadgeText}>Active now</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.deviceType}>{item.type} Session</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    activeOpacity={0.7}
                    onPress={() => handleDisconnectDevice(item.id, item.name)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.emptyStateContainer}>
                <Ionicons name="shield-checkmark-outline" size={40} color="#94A3B8" />
                <Text style={styles.emptyStateText}>No active tracking sessions</Text>
              </View>
            )}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}