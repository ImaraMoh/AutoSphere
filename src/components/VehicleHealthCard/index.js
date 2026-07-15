import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VehicleHealthCard({ score = 85, analysis }) {
  const numericScore = Number(score || 85);

  let theme = {
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#DCFCE7",
    icon: "shield-checkmark",
    label: "Excellent Condition",
  };

  if (numericScore < 80 && numericScore >= 60) {
    theme = {
      color: "#D97706",
      bg: "#FFFBEB",
      border: "#FEF3C7",
      icon: "alert-circle",
      label: "Needs Attention",
    };
  } else if (numericScore < 60) {
    theme = {
      color: "#DC2626",
      bg: "#FEF2F2",
      border: "#FEE2E2",
      icon: "warning",
      label: "Critical Condition",
    };
  }

  return (
    <View style={styles.card}>
      <View style={styles.glowEffect} />

      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <View style={styles.aiBadge}>
            <Ionicons name="sparkles" size={12} color="#F97316" />
            <Text style={styles.aiBadgeText}>AI Telemetry</Text>
          </View>
          <Text style={styles.title}>Vehicle Health Analysis</Text>
        </View>

        <View style={styles.scoreCircle}>
          <Text style={[styles.score, { color: theme.color }]}>{numericScore}%</Text>
          <Text style={styles.scoreLabel}>Score</Text>
        </View>
      </View>

      <View style={[styles.statusBanner, { backgroundColor: theme.bg, borderColor: theme.border }]}>
        <Ionicons name={theme.icon} size={16} color={theme.color} />
        <Text style={[styles.statusText, { color: theme.color }]}>{theme.label}</Text>
      </View>

      {analysis ? (
        <View style={styles.analysisContainer}>
          <Ionicons name="bulb-outline" size={16} color="#64748B" style={styles.bulbIcon} />
          <Text style={styles.result}>{analysis}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    position: "relative",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 14,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  glowEffect: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFF7ED",
    opacity: 0.6,
    transform: [{ translateX: 30 }, { translateY: -30 }],
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  titleGroup: {
    flex: 1,
    marginRight: 12,
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FED7AA",
    marginBottom: 6,
    gap: 4,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#C2410C",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 18,
    fontWeight: "850",
    color: "#0F172A",
  },
  scoreCircle: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 24,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: "750",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    gap: 8,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "800",
  },
  analysisContainer: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "flex-start",
  },
  bulbIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  result: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
    color: "#334155",
  },
});