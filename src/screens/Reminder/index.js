import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Alert,
  Platform,
  useWindowDimensions
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import { getReminders, deleteReminder } from "../../services/reminderStorage"; 
import styles from "./styles";

export default function Reminder({ navigation }) {
  const [data, setData] = useState([]);
  const { width: windowWidth } = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const load = async () => {
    const reminders = await getReminders();
    setData(reminders || []);
  };

  const handleDelete = (id) => {
    const executeDeletion = async () => {
      try {
        // 1. Optimistically update local UI state immediately so it vanishes instantly
        setData((prevData) => prevData.filter((item) => item.id !== id));

        // 2. Perform the async storage update background task
        if (typeof deleteReminder === "function") {
          await deleteReminder(id);
        }
        
        // 3. Re-sync structural state from storage to make sure everything matches perfectly
        await load();
      } catch (error) {
        console.log("Delete error", error);
        // Fallback: reload original data if backend execution fails
        await load();
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
              // Wrapped inside a microtask context wrapper execution clear
              setTimeout(() => {
                executeDeletion();
              }, 1);
            } 
          }
        ]
      );
    }
  };

  // Safe fallback logic helper to parse date data variants safely
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

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Smart Reminder" navigation={navigation} />

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
              <View style={styles.cardGutter} key={item.id}>
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
                      onPress={() => handleDelete(item.id)}
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
            onPress={() => navigation.navigate("AddReminder")}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={styles.buttonText}>Add Reminder</Text>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}