import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import ExpenseCard from "../../components/ExpenseCard";
import { getExpenses } from "../../services/expenseStorage";
import styles from "./styles";

export default function Expenses({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const { width: windowWidth } = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const load = async () => {
    const data = await getExpenses();
    setExpenses(data || []);
  };

  const total = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  // Responsive center layout constraints for larger viewports
  const isLargeScreen = windowWidth > 600;
  const responsiveWrapperStyle = isLargeScreen 
    ? { maxWidth: 540, alignSelf: "center", width: "100%" } 
    : { width: "100%" };

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
            {expenses.length === 0 ? (
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
            onPress={() => navigation.navigate("AddExpense")}
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