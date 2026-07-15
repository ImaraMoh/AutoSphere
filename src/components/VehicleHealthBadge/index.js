import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VehicleHealthBadge({ score }) {
  const numericScore = Number(score || 85);

  let theme = {
    bg: "#F0FDF4",
    border: "#DCFCE7",
    text: "#16A34A",
    icon: "shield-checkmark",
    label: "Excellent",
  };

  if (numericScore < 80 && numericScore >= 60) {
    theme = {
      bg: "#FFFBEB",
      border: "#FEF3C7",
      text: "#D97706",
      icon: "alert-circle",
      label: "Good",
    };
  } else if (numericScore < 60) {
    theme = {
      bg: "#FEF2F2",
      border: "#FEE2E2",
      text: "#DC2626",
      icon: "warning",
      label: "Needs Service",
    };
  }

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: theme.bg, borderColor: theme.border },
      ]}
    >
      <Ionicons name={theme.icon} size={13} color={theme.text} />
      <Text style={[styles.text, { color: theme.text }]}>
        {numericScore}% • {theme.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    gap: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  text: {
    fontSize: 11,
    fontWeight: "850",
    letterSpacing: 0.2,
  },
});