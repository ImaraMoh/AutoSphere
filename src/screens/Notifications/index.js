// Notifications.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { ChevronLeft, Bell } from "lucide-react-native";
import NotificationCard from "../../components/NotificationCard";
import styles from "./styles";

export default function Notifications({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 600;

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setNotifications([
      {
        id: "1",
        title: "Insurance Expiring Soon",
        message: "Your insurance expires in 7 days",
        type: "Insurance",
        priority: "High",
        date: "Today, 10:45 AM"
      },
      {
        id: "2",
        title: "Service Reminder",
        message: "Vehicle service due after 500 KM",
        type: "Maintenance",
        priority: "Medium",
        date: "Yesterday, 3:20 PM"
      },
      {
        id: "3",
        title: "EMI Payment",
        message: "Your finance payment is due tomorrow",
        type: "Finance",
        priority: "High",
        date: "July 14, 9:00 AM"
      }
    ]);
  };

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
          <ChevronLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.headerSpacer} />
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
        renderItem={({ item }) => (
          <View style={responsiveWrapperStyle}>
            <View style={styles.cardWrapper}>
              <NotificationCard
                item={item}
                onPress={() =>
                  navigation.navigate("NotificationDetails", { item })
                }
              />
            </View>
          </View>
        )}
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