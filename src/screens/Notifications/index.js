// Notifications.js
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
  Platform,
  Animated
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ChevronLeft, Bell, Trash2, CheckSquare, Square } from "lucide-react-native";
import { collection, query, getDocs, orderBy, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseConfig";
import { getReminders } from "../../services/reminderStorage";
import { saveNotification } from "../../services/notificationStorage";
import NotificationCard from "../../components/NotificationCard";
import styles from "./styles";

export default function Notifications({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [bannerAlert, setBannerAlert] = useState(null);

  const bannerAnim = useRef(new Animated.Value(-100)).current;
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 600;

  const triggerBanner = (message) => {
    setBannerAlert(message);
    Animated.timing(bannerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(bannerAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setBannerAlert(null));
    }, 4000);
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    // Realtime live snapshot for tracking new notifications arrivals
    const notificationsRef = collection(db, "users", currentUser.uid, "notifications");
    
    let isInitialLoad = true;

    const unsubscribe = onSnapshot(notificationsRef, (snapshot) => {
      if (isInitialLoad) {
        // Skip triggering banners for existing documents already sitting in Firestore on load
        isInitialLoad = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newDocData = change.doc.data();
          
          if (Platform.OS === "web" && typeof window !== "undefined" && "Notification" in window) {
            if (Notification.permission === "granted") {
              new Notification(newDocData.title || "New Notification", {
                body: newDocData.message || "You have a new vehicle alert.",
              });
            } else if (Notification.permission !== "denied") {
              Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                  new Notification(newDocData.title || "New Notification", {
                    body: newDocData.message || "You have a new vehicle alert.",
                  });
                }
              });
            }
          }

          triggerBanner(newDocData.title ? `${newDocData.title}: ${newDocData.message || ""}` : "New notification received!");
        }
      });
    });

    return () => unsubscribe();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserNotificationsAndReminders();
    }, [])
  );

  const fetchUserNotificationsAndReminders = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const reminders = typeof getReminders === "function" ? await getReminders() : [];
        if (reminders && reminders.length > 0) {
          for (const item of reminders) {
            const reminderDateStr = item.date || item.dueDate || item.dateTime;
            if (reminderDateStr) {
              await saveNotification({
                title: item.title || "Vehicle Reminder",
                message: `Upcoming due for ${item.type || "Service"} on ${reminderDateStr}`,
                type: item.type || "Maintenance",
                priority: item.priority || "Medium",
                date: reminderDateStr,
                reminderId: item.id || item._id,
                read: false
              });
            }
          }
        }
      } catch (reminderErr) {
        console.log("Could not auto-sync reminders into notifications:", reminderErr);
      }

      const notificationsRef = collection(db, "users", currentUser.uid, "notifications");
      const q = query(notificationsRef, orderBy("date", "desc"));

      const querySnapshot = await getDocs(q);
      const fetchedNotifications = [];
      
      querySnapshot.forEach((docItem) => {
        fetchedNotifications.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      setNotifications(fetchedNotifications);
    } catch (error) {
      console.log("Error fetching notifications from Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === notifications.length) {
      setSelectedIds(new Set());
    } else {
      const allIds = new Set(notifications.map(item => item.id));
      setSelectedIds(allIds);
    }
  };

  const toggleSelectNotification = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;

    const executeDeletion = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const deletePromises = Array.from(selectedIds).map((id) =>
          deleteDoc(doc(db, "users", currentUser.uid, "notifications", id))
        );

        await Promise.all(deletePromises);

        setNotifications(prev => prev.filter(item => !selectedIds.has(item.id)));
        setSelectedIds(new Set());
      } catch (error) {
        console.log("Error deleting notifications:", error);
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm(`Are you sure you want to delete ${selectedIds.size} notification(s)?`)) {
        executeDeletion();
      }
    } else {
      Alert.alert(
        "Delete Notifications",
        `Are you sure you want to delete ${selectedIds.size} notification(s)?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: executeDeletion }
        ]
      );
    }
  };

  const handleDeleteSingle = (id) => {
    const executeSingleDeletion = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        await deleteDoc(doc(db, "users", currentUser.uid, "notifications", id));
        setNotifications(prev => prev.filter(item => item.id !== id));
        
        const updatedSelected = new Set(selectedIds);
        updatedSelected.delete(id);
        setSelectedIds(updatedSelected);
      } catch (error) {
        console.log("Error deleting single notification:", error);
      }
    };

    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to delete this notification?")) {
        executeSingleDeletion();
      }
    } else {
      Alert.alert(
        "Delete Notification",
        "Are you sure you want to remove this notification?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: executeSingleDeletion }
        ]
      );
    }
  };

  const handleCardPress = async (item) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser && !item.read) {
        await updateDoc(doc(db, "users", currentUser.uid, "notifications", item.id), {
          read: true
        });
        setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
      }
    } catch (e) {
      console.log("Error marking notification as read:", e);
    }
    navigation.navigate("NotificationDetails", { item });
  };

  const responsiveWrapperStyle = isLargeScreen
    ? { maxWidth: 540, alignSelf: "center", width: "100%" }
    : { width: "100%" };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#F97316" />
      </SafeAreaView>
    );
  }

  const allSelected = notifications.length > 0 && selectedIds.size === notifications.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Floating In-App Banner Notification Alert */}
      {bannerAlert && (
        <Animated.View style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          transform: [{ translateY: bannerAnim }]
        }}>
          <View style={{
            backgroundColor: "#0F172A",
            padding: 16,
            margin: 16,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 6
          }}>
            <Bell size={20} color="#F97316" style={{ marginRight: 12 }} />
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", flex: 1 }} numberOfLines={2}>
              {bannerAlert}
            </Text>
          </View>
        </Animated.View>
      )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ChevronLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        
        {notifications.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <TouchableOpacity onPress={toggleSelectAll} activeOpacity={0.8}>
              {allSelected ? (
                <CheckSquare size={20} color="#F97316" />
              ) : (
                <Square size={20} color="#64748B" />
              )}
            </TouchableOpacity>
            {selectedIds.size > 0 && (
              <TouchableOpacity onPress={handleDeleteSelected} activeOpacity={0.8}>
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.headerSpacer} />
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={[styles.banner, responsiveWrapperStyle]}>
            <View style={styles.bannerIconBox}>
              <Bell size={20} color="#F97316" />
            </View>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Smart Vehicle Alerts</Text>
              <Text style={styles.bannerText}>
                Never miss crucial vehicle milestones, insurance renewals, or maintenance schedules.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const isSelected = selectedIds.has(item.id);
          return (
            <View style={responsiveWrapperStyle}>
              <View style={[styles.cardWrapper, { flexDirection: "row", alignItems: "center", gap: 8 }]}>
                <TouchableOpacity
                  onPress={() => toggleSelectNotification(item.id)}
                  style={{ padding: 4 }}
                >
                  {isSelected ? (
                    <CheckSquare size={20} color="#F97316" />
                  ) : (
                    <Square size={20} color="#CBD5E1" />
                  )}
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                  <NotificationCard
                    item={item}
                    onPress={() => handleCardPress(item)}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => handleDeleteSingle(item.id)}
                  style={{ padding: 8 }}
                >
                  <Trash2 size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>All caught up!</Text>
            <Text style={styles.emptySubText}>
              No pending alerts or notifications in your queue.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}