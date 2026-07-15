// Reminder.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
  Platform,
  useWindowDimensions,
  Modal,
  TouchableOpacity
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import { getReminders, deleteReminder } from "../../services/reminderStorage"; 
import { getVehicles } from "../../services/vehicleStorage";
import { saveNotification } from "../../services/notificationStorage"; // Imported notification storage helper
import styles from "./styles";

export default function Reminder({ navigation }) {
  const [data, setData] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  
  const { width: windowWidth } = useWindowDimensions();

  // Load vehicles on mount to allow vehicle filtering / selection
  useEffect(() => {
    loadVehicles();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReminders();
    }, [selectedVehicleId])
  );

  const loadVehicles = async () => {
    try {
      const storedVehicles = typeof getVehicles === "function" ? await getVehicles() : [];
      setVehicles(storedVehicles || []);
      if (storedVehicles && storedVehicles.length > 0 && !selectedVehicleId) {
        setSelectedVehicleId(storedVehicles[0].id || storedVehicles[0]._id);
      }
    } catch (error) {
      console.log("Error loading vehicles", error);
    }
  };

  const loadReminders = async () => {
    try {
      const reminders = selectedVehicleId ? await getReminders(selectedVehicleId) : await getReminders();
      setData(reminders || []);

      // Automatically sync active reminders into Firestore notifications queue
      if (reminders && reminders.length > 0) {
        for (const item of reminders) {
          const reminderDateStr = item.date || item.dueDate || item.dateTime;
          if (reminderDateStr) {
            await saveNotification({
              title: item.title || "Vehicle Reminder",
              message: `Upcoming due for ${item.type || "Service"} on ${formatReminderDate(reminderDateStr)}`,
              type: item.type || "Maintenance",
              priority: item.priority || "Medium",
              date: reminderDateStr,
              reminderId: item.id || item._id,
              read: false
            });
          }
        }
      }
    } catch (error) {
      console.log("Error loading reminders", error);
      setData([]);
    }
  };

  const handleDelete = (id) => {
    const executeDeletion = async () => {
      try {
        setData((prevData) => prevData.filter((item) => item.id !== id && item._id !== id));

        if (typeof deleteReminder === "function") {
          if (selectedVehicleId) {
            await deleteReminder(selectedVehicleId, id);
          } else {
            await deleteReminder(id);
          }
        }
        
        await loadReminders();
      } catch (error) {
        console.log("Delete error", error);
        await loadReminders();
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to delete this reminder?")) {
        executeDeletion();
      }
    } else {
      Alert.alert(
        "Delete Reminder",
        "Are you sure you want to remove this notification alert?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Delete", 
            style: "destructive", 
            onPress: () => {
              setTimeout(() => {
                executeDeletion();
              }, 1);
            } 
          }
        ]
      );
    }
  };

  const formatReminderDate = (dateVal) => {
    if (!dateVal) return "Not Set";
    try {
      const parsedDate = new Date(dateVal);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split("T")[0];
      }
    } catch (e) {
      console.log("Date parsing skip", e);
    }
    return String(dateVal);
  };

  const isLargeScreen = windowWidth > 600;
  const responsiveWrapperStyle = isLargeScreen ? { maxWidth: 540, alignSelf: "center", width: "100%" } : { width: "100%" };

  const currentVehicle = vehicles.find(v => (v.id === selectedVehicleId || v._id === selectedVehicleId));

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Smart Reminder" navigation={navigation} />

      {/* Vehicle Selection Header Bar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 5 }}>
        <TouchableOpacity 
          style={{
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: "#E2E8F0",
            padding: 12,
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            shadowColor: "#0F172A",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.02,
            elevation: 1
          }}
          onPress={() => setShowVehicleModal(true)}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="car-outline" size={18} color="#F97316" />
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#0F172A" }}>
              {currentVehicle ? (currentVehicle.name || currentVehicle.model || "Selected Vehicle") : "Select Vehicle"}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={16} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={responsiveWrapperStyle}>
          
          {data.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="notifications-off-outline" size={30} color="#94A3B8" />
              </View>
              <Text style={styles.emptyText}>No reminders active</Text>
              <Text style={styles.emptySubText}>Create dynamic notifications for service actions.</Text>
            </View>
          ) : (
            data.map((item) => (
              <View style={styles.cardGutter} key={item.id || item._id}>
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={styles.iconCircleWrapper}>
                      <Ionicons name="notifications" size={20} color="#F97316" />
                    </View>
                    
                    <View style={styles.cardMetaContainer}>
                      <Text style={styles.titleText}>{item.title}</Text>
                      <Text style={styles.typeText}>{item.type || "General Reminder"}</Text>
                    </View>

                    <Pressable
                      onPress={() => handleDelete(item.id || item._id)}
                      style={({ pressed }) => [styles.deleteButton, pressed && styles.elementPressed]}
                      hitSlop={12}
                    >
                      <Ionicons name="trash-outline" size={18} color="#EF4444" />
                    </Pressable>
                  </View>

                  <View style={styles.dividerLine} />

                  <View style={styles.cardFooter}>
                    <View style={styles.dueFrame}>
                      <Ionicons name="calendar-outline" size={13} color="#64748B" />
                      <Text style={styles.dueLabel}>
                        Due: <Text style={styles.dueValue}>{formatReminderDate(item.date || item.dueDate || item.dateTime)}</Text>
                      </Text>
                    </View>

                    <View style={styles.statusBadge}>
                      <View style={styles.statusDot} />
                      <Text style={styles.statusText}>Upcoming</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => navigation.navigate("AddReminder", { vehicleId: selectedVehicleId })}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.buttonText}>Add Reminder</Text>
          </Pressable>

        </View>
      </ScrollView>

      {/* Vehicle Selection Modal */}
      <Modal
        visible={showVehicleModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowVehicleModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(15, 23, 42, 0.4)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#FFFFFF", width: "100%", maxWidth: 400, borderRadius: 20, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 15, color: "#0F172A" }}>Select Vehicle</Text>
            {vehicles.length === 0 ? (
              <Text style={{ color: "#64748B", marginBottom: 20 }}>No vehicles found. Please add a vehicle first.</Text>
            ) : (
              vehicles.map((v) => {
                const vId = v.id || v._id;
                const isSelected = vId === selectedVehicleId;
                return (
                  <TouchableOpacity
                    key={vId}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 12,
                      backgroundColor: isSelected ? "#F8FAFC" : "#FFFFFF",
                      borderWidth: isSelected ? 1 : 0,
                      borderColor: "#F97316",
                      marginBottom: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                    onPress={() => {
                      setSelectedVehicleId(vId);
                      setShowVehicleModal(false);
                    }}
                  >
                    <Text style={{ fontWeight: isSelected ? "700" : "500", color: "#0F172A" }}>
                      {v.name || v.model || "Vehicle"}
                    </Text>
                    {isSelected && <Ionicons name="checkmark" size={18} color="#F97316" />}
                  </TouchableOpacity>
                );
              })
            )}
            <TouchableOpacity
              style={{ backgroundColor: "#F1F5F9", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 10 }}
              onPress={() => setShowVehicleModal(false)}
            >
              <Text style={{ fontWeight: "600", color: "#475569" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}