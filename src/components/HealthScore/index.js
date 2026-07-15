import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function HealthScore({
  score = 85,
  analysis,
  healthStatus,
  maintenancePrediction,
  drivingEfficiency,
  expenseBehaviour,
  recommendations,
  updatedAt
}) {
  const getStatusConfig = () => {
    if (score >= 80) {
      return { label: "Excellent Condition", color: "#16A34A", bg: "#F0FDF4", border: "#DCFCE7", icon: "shield-checkmark" };
    }
    if (score >= 60) {
      return { label: "Needs Attention", color: "#D97706", bg: "#FEF3C7", border: "#FDE68A", icon: "alert-circle" };
    }
    return { label: "Critical Condition", color: "#DC2626", bg: "#FEF2F2", border: "#FEE2E2", icon: "warning" };
  };

  const statusConfig = getStatusConfig();
  const displayStatus = healthStatus || statusConfig.label;

  return (
    <View style={styles.healthCard}>
      {/* Background ambient lighting element */}
      <View style={styles.healthGlowEffect} />

      {/* Header Container */}
      <View style={styles.healthHeader}>
        <View style={styles.healthTitleGroup}>
          <View style={styles.aiTagBadge}>
            <Ionicons name="sparkles" size={12} color="#F97316" />
            <Text style={styles.aiTagText}>AI Telemetry Engine</Text>
          </View>
          <Text style={styles.healthCardTitle}>Vehicle Health Status</Text>
          
          <View style={[styles.statusPillBadge, { backgroundColor: statusConfig.bg, borderColor: statusConfig.border }]}>
            <Ionicons name={statusConfig.icon} size={13} color={statusConfig.color} />
            <Text style={[styles.statusPillText, { color: statusConfig.color }]}>{displayStatus}</Text>
          </View>
        </View>

        <View style={styles.scoreCircleOuter}>
          <Text style={styles.scoreNumberText}>{score}%</Text>
          <Text style={styles.scoreLabelText}>Overall</Text>
        </View>
      </View>

      {/* Modern Gradient-Style Progress Bar */}
      <View style={styles.progressTrackBar}>
        <View style={[styles.progressFillBar, { width: `${Math.min(Math.max(score, 0), 100)}%`, backgroundColor: statusConfig.color }]} />
      </View>

      {/* AI Summary Section */}
      {analysis && (
        <View style={styles.analysisBoxContainer}>
          <View style={styles.analysisHeaderRow}>
            <Ionicons name="bulb" size={16} color="#F97316" />
            <Text style={styles.subSectionTitle}>AI Diagnostics Summary</Text>
          </View>
          <Text style={styles.analysisContentText}>{analysis}</Text>
        </View>
      )}

      {/* Predictions & Insights Grid */}
      <View style={styles.predictionsContainer}>
        <Text style={styles.subSectionTitle}>Performance Metrics</Text>

        <View style={styles.insightMetricCard}>
          <View style={[styles.metricIconBox, { backgroundColor: "#FFF7ED" }]}>
            <Ionicons name="construct" size={18} color="#F97316" />
          </View>
          <View style={styles.metricTextWrapper}>
            <Text style={styles.metricTitle}>Maintenance Forecast</Text>
            <Text style={styles.metricDescription}>{maintenancePrediction || "Analyzing component wear..."}</Text>
          </View>
        </View>

        <View style={styles.insightMetricCard}>
          <View style={[styles.metricIconBox, { backgroundColor: "#EFF6FF" }]}>
            <Ionicons name="speedometer" size={18} color="#2563EB" />
          </View>
          <View style={styles.metricTextWrapper}>
            <Text style={styles.metricTitle}>Driving Efficiency</Text>
            <Text style={styles.metricDescription}>{drivingEfficiency || "Evaluating driving dynamics..."}</Text>
          </View>
        </View>

        <View style={styles.insightMetricCard}>
          <View style={[styles.metricIconBox, { backgroundColor: "#F0FDF4" }]}>
            <Ionicons name="wallet" size={18} color="#16A34A" />
          </View>
          <View style={styles.metricTextWrapper}>
            <Text style={styles.metricTitle}>Expense Behaviour</Text>
            <Text style={styles.metricDescription}>{expenseBehaviour || "Reviewing spending patterns..."}</Text>
          </View>
        </View>
      </View>

      {/* Recommendations Checklist */}
      {recommendations && recommendations.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <Text style={styles.subSectionTitle}>Recommended Actions</Text>
          {recommendations.map((item, index) => (
            <View key={index} style={styles.recommendationItemRow}>
              <View style={styles.checkBulletCircle}>
                <Ionicons name="checkmark" size={12} color="#16A34A" />
              </View>
              <Text style={styles.recommendationTextItem}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Timestamp Footer */}
      {updatedAt && (
        <View style={styles.timestampFooterRow}>
          <Ionicons name="time-outline" size={13} color="#94A3B8" />
          <Text style={styles.timestampText}>
            Updated: {new Date(updatedAt).toLocaleString()}
          </Text>
        </View>
      )}
    </View>
  );
}