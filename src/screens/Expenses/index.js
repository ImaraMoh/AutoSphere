import React, { useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  ActivityIndicator
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import ExpenseCard from "../../components/ExpenseCard";
import { getExpenses } from "../../services/expenseStorage"; // or your updated expenseService path
import { VehicleContext } from "../../context/VehicleContext";
import styles from "./styles";

export default function Expenses({ navigation, route }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width: windowWidth } = useWindowDimensions();

  // Extract vehicleId from navigation route params or fallback to global VehicleContext
  const routeVehicleId = route?.params?.vehicleId || route?.params?.vehicle?.id;
  const { primaryVehicle } = useContext(VehicleContext) || {};
  const vehicleId = routeVehicleId || primaryVehicle?.id;

  useFocusEffect(
    useCallback(() => {
      if (vehicleId) {
        load(vehicleId);
      } else {
        setLoading(false);
        setExpenses([]);
      }
    }, [vehicleId])
  );

  const load = async (vId) => {
    try {
      setLoading(true);
      const data = await getExpenses(vId);
      setExpenses(data || []);
    } catch (error) {
      console.log("Error loading expenses screen:", error);
    } finally {
      setLoading(false);
    }
  };

  const total = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  // Responsive center layout constraints for larger viewports
  const isLargeScreen = windowWidth > 600;
  const responsiveWrapperStyle = isLargeScreen 
    ? { maxWidth: 540, alignSelf: "center", width: "100%" } 
    : { width: "100%" };

  if (!vehicleId) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <AppHeader title="Expense Tracker" navigation={navigation} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="car-outline" size={30} color="#F97316" />
          </View>
          <Text style={styles.emptyTitle}>No Vehicle Selected</Text>
          <Text style={[styles.emptySubtitle, { textAlign: "center", marginTop: 8 }]}>
            Please select a vehicle from your dashboard or profile to track expenses.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader title="Expense Tracker" navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={responsiveWrapperStyle}>
          
          {/* Premium Financial Summary Hero Card */}
          <View style={styles.premiumSummaryCard}>
            <View style={styles.summaryGlowEffect} />
            <View style={styles.summaryContentRow}>
              <View style={styles.summaryMeta}>
                <View style={styles.liveBadgeWrapper}>
                  <View style={styles.liveDot} />
                  <Text style={styles.summaryLabel}>Total Vehicle Spending</Text>
                </View>
                <Text style={styles.amount}>Rs. {total.toLocaleString()}</Text>
              </View>
              <View style={styles.summaryIconBox}>
                <Ionicons name="stats-chart" size={22} color="#EA580C" />
              </View>
            </View>
            
            <View style={styles.summaryDivider} />

            <View style={styles.summaryFooterRow}>
              <Text style={styles.summaryFooterText}>
                {expenses.length} {expenses.length === 1 ? "transaction" : "transactions"} logged
              </Text>
              <Text style={styles.summaryFooterSub}>Up to date</Text>
            </View>
          </View>

          <Text style={styles.sectionHeader}>Expense History</Text>

          {/* History List Content Area */}
          <View style={styles.listWrapper}>
            {loading ? (
              <View style={{ paddingVertical: 40, alignItems: "center" }}>
                <ActivityIndicator size="large" color="#F97316" />
              </View>
            ) : expenses.length === 0 ? (
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconCircle}>
                  <Ionicons name="receipt-outline" size={30} color="#F97316" />
                </View>
                <Text style={styles.emptyTitle}>No Expenses Found</Text>
                <Text style={styles.emptySubtitle}>
                  Keep track of fuel, maintenance, and tolls by logging your first expense.
                </Text>
              </View>
            ) : (
              expenses.map((item) => (
                <View key={item.id} style={styles.cardItemGutter}>
                  <ExpenseCard item={item} />
                </View>
              ))
            )}
          </View>

          {/* Premium Call to Action Floating Button Style */}
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
            onPress={() => navigation.navigate("AddExpense", { vehicleId })}
          >
            <View style={styles.buttonIcon}>
              <Ionicons name="add" size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.buttonText}>Add New Expense</Text>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}