import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Platform,
  useWindowDimensions,
  Alert
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import { getMaintenance, deleteMaintenance } from "../../services/maintenanceStorage";
import styles from "./styles";

export default function Maintenance({ navigation, route }) {
  const vehicleId = route?.params?.vehicleId;

  const [records, setRecords] = useState([]);
  const { width: windowWidth } = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      load();
    }, [vehicleId])
  );

  const load = async () => {
    if (!vehicleId) {
      setRecords([]);
      return;
    }
    const data = await getMaintenance(vehicleId);
    setRecords(data || []);
  };

  const executeDelete = async (recordId) => {
    const success = await deleteMaintenance(vehicleId, recordId);
    if (success) {
      setRecords((prev) => prev.filter((item) => item.id !== recordId));
    } else {
      if (Platform.OS === "web") {
        window.alert("Failed to delete the maintenance record. Please check console logs.");
      } else {
        Alert.alert("Error", "Failed to delete the maintenance record. Please try again.");
      }
    }
  };

  const handleDelete = (recordId) => {
    console.log("Delete triggered for record ID:", recordId);

    if (!recordId) {
      return;
    }

    // Web-safe confirmation fallback since native Alert.alert can misbehave on web browsers
    if (Platform.OS === "web") {
      const confirmDelete = window.confirm("Are you sure you want to delete this maintenance entry?");
      if (confirmDelete) {
        executeDelete(recordId);
      }
      return;
    }

    // Native Mobile Alert Box
    Alert.alert(
      "Delete Service Record",
      "Are you sure you want to delete this maintenance entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => executeDelete(recordId),
        },
      ]
    );
  };

  const isLargeScreen = windowWidth > 600;
  const responsiveWrapperStyle = isLargeScreen ? { maxWidth: 540, alignSelf: "center", width: "100%" } : { width: "100%" };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Maintenance History" navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={responsiveWrapperStyle}>
          
          {records.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="construct-outline" size={32} color="#94A3B8" />
              </View>
              <Text style={styles.emptyHeading}>No Service Records</Text>
              <Text style={styles.emptySub}>Log your vehicle maintenance history below.</Text>
            </View>
          ) : (
            records.map((item) => (
              <View style={styles.card} key={item.id}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconIndicatorBox}>
                    <Ionicons name="build" size={18} color="#F97316" />
                  </View>
                  <View style={{ flex: 1, marginHorizontal: 8 }}>
                    <Text style={styles.titleText}>{item.repair}</Text>
                    <Text style={styles.metaLabelText}>
                      Garage: <Text style={styles.metaValueText}>{item.garage}</Text>
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => handleDelete(item.id)}
                    style={({ pressed }) => [
                      { 
                        padding: 10, 
                        justifyContent: "center", 
                        alignItems: "center",
                        opacity: pressed ? 0.4 : 1 
                      }
                    ]}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </Pressable>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.cardFooter}>
                  <View style={styles.badgeColumn}>
                    <Text style={styles.subTextLabel}>TOTAL COST</Text>
                    <Text style={styles.costText}>Rs. {Number(item.cost).toLocaleString()}</Text>
                  </View>
                  <View style={styles.dateBadge}>
                    <Ionicons name="calendar-outline" size={14} color="#64748B" style={{ marginRight: 4 }} />
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>
              </View>
            ))
          )}

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => navigation.navigate("AddMaintenance", { vehicleId })}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.buttonText}>Add Service</Text>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}