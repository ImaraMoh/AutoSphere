import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function ExpenseCard({ item }) {
  // Helper to assign a dynamic icon and color depending on the expense category
  const getCategoryConfig = (category = "") => {
    const cat = category.toLowerCase();
    if (cat.includes("fuel") || cat.includes("gas")) {
      return { icon: "flash", color: "#F97316", bg: "#FFF7ED" };
    }
    if (cat.includes("maintenance") || cat.includes("service") || cat.includes("repair")) {
      return { icon: "construct", color: "#2563EB", bg: "#EFF6FF" };
    }
    if (cat.includes("insurance") || cat.includes("policy")) {
      return { icon: "shield-checkmark", color: "#16A34A", bg: "#F0FDF4" };
    }
    return { icon: "wallet", color: "#9333EA", bg: "#FAF5FF" };
  };

  const config = getCategoryConfig(item?.category);

  return (
    <View style={styles.expenseItemCard}>
      {/* Icon & Details Row */}
      <View style={styles.expenseTopRow}>
        <View style={[styles.expenseIconBox, { backgroundColor: config.bg }]}>
          <Ionicons name={config.icon} size={18} color={config.color} />
        </View>

        <View style={styles.expenseInfoBox}>
          <Text style={styles.expenseItemTitle} numberOfLines={1}>
            {item?.title || "Unnamed Expense"}
          </Text>
          <Text style={styles.expenseCategoryText}>
            {item?.category || "General"} • {item?.date || "Recent"}
          </Text>
        </View>

        <View style={styles.expenseAmountBox}>
          <Text style={styles.expenseAmountText}>
            Rs. {item?.amount ? Number(item.amount).toLocaleString() : "0"}
          </Text>
        </View>
      </View>
    </View>
  );
}