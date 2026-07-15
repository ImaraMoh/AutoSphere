import React from "react";
import { View, Text, Platform, useWindowDimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

// Helper function to format dates nicely on the x-axis
function formatShortDate(dateStr) {
  if (!dateStr) return "";
  
  if (dateStr.length <= 4 && !dateStr.includes("-")) {
    return dateStr;
  }

  try {
    const parts = dateStr.split("-");
    if (parts.length >= 2) {
      const year = parts[0];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parts[2] ? parseInt(parts[2], 10) : null;

      const dateObj = new Date(year, monthIndex, day || 1);
      const options = day ? { month: "short", day: "numeric" } : { month: "short" };
      return dateObj.toLocaleDateString("en-US", options);
    }
  } catch (e) {
    // Fallback if parsing fails
  }

  return dateStr;
}

export default function HealthTrendChart({ history = [] }) {
  const { width: windowWidth } = useWindowDimensions();
  const chartWidth = Math.min(windowWidth - 72, 460);

  // Fallback data if history is empty
  const defaultData = [
    { score: 82, label: "Jan" },
    { score: 85, label: "Feb" },
    { score: 88, label: "Mar" },
    { score: 91, label: "Apr" }
  ];

  const rawData = history && history.length > 0 ? history : defaultData;

  // Aggregate duplicate dates/labels by averaging their scores or taking the latest
  const aggregatedMap = new Map();
  rawData.forEach(item => {
    const rawDateKey = item.month || item.date || item.label || "Recent";
    const formattedLabel = formatShortDate(rawDateKey);
    // Explicitly check score, value, and fallback properties safely
    const val = Number(item.score ?? item.value ?? item.healthScore ?? 85);
    
    aggregatedMap.set(formattedLabel, val);
  });

  const barData = Array.from(aggregatedMap.entries()).map(([label, value]) => ({
    value: isNaN(value) ? 85 : value,
    label,
    frontColor: "#16A34A",
    gradientColor: "#22C55E",
    topBarRadius: 6,
  }));

  const latestScore = barData[barData.length - 1]?.value || 90;
  const computedSpacing = barData.length > 1 ? (chartWidth - 40) / barData.length : chartWidth - 60;

  return (
    <View style={styles.trendCard}>
      <View style={styles.trendGlowEffect} />

      <View style={styles.trendHeaderRow}>
        <View style={styles.trendIconBox}>
          <Ionicons name="bar-chart" size={18} color="#16A34A" />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.trendTitle}>Vehicle Health Trend</Text>
          <Text style={styles.trendSubtitle}>Historical score metrics</Text>
        </View>
        
        <View style={styles.trendBadgePill}>
          <Text style={styles.trendBadgeText}>{latestScore} pts</Text>
        </View>
      </View>

      <View style={styles.trendChartContainer}>
        <BarChart
          data={barData}
          width={chartWidth}
          height={170}
          barWidth={barData.length > 5 ? 18 : 28}
          spacing={Math.max(computedSpacing, 24)}
          roundedTop
          roundedBottom={false}
          hideRules
          xAxisColor="#E2E8F0"
          yAxisColor="transparent"
          yAxisTextStyle={styles.trendAxisLabel}
          xAxisLabelTextStyle={styles.trendAxisLabel}
          noOfSections={4}
          isAnimated
        />
      </View>

      <View style={styles.trendFooterRow}>
        <Ionicons name="shield-checkmark" size={14} color="#16A34A" />
        <Text style={styles.trendFooterText}>Performance is stable across recent cycles</Text>
      </View>
    </View>
  );
}