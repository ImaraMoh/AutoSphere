import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  ActivityIndicator,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { LineChart, PieChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../../components/AppHeader";
import HealthScore from "../../components/HealthScore";
import AIInsightCard from "../../components/AIInsightCard";
import HealthTrendChart from "../../components/HealthTrendChart";

import { saveHealthReport, getHealthHistory } from "../../services/aiHealthStorage";
import { analyzeVehicleHealth } from "../../services/aiHealthService";
import { getVehicleAnalytics } from "../../services/analyticsService";
import { getAIHealth } from "../../services/aiCacheService";
import { getExpenses } from "../../services/expenseStorage";

import styles from "./styles";

export default function Reports({ navigation }) {
  const [health, setHealth] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const { width: windowWidth } = useWindowDimensions();
  const analytics = getVehicleAnalytics();

  useEffect(() => {
    loadHistory();
    loadCachedHealth();
    loadExpenses();
  }, []);

  async function loadHistory() {
    const data = await getHealthHistory();
    setHistory(data || []);
  }

  async function loadExpenses() {
    const result = await getExpenses();
    setExpenses(result || []);
    calculateExpenseChart(result || []);
  }

  function calculateExpenseChart(data) {
    const categoryMap = {};

    data.forEach(item => {
      const category = item.category || "Other";
      if (categoryMap[category]) {
        categoryMap[category] += Number(item.amount || 0);
      } else {
        categoryMap[category] = Number(item.amount || 0);
      }
    });

    const total = Object.values(categoryMap).reduce((a, b) => a + b, 0);
    setTotalExpense(total);

    const colors = ["#F97316", "#16A34A", "#2563EB", "#DC2626", "#9333EA"];

    const chartData = Object.keys(categoryMap).map((category, index) => ({
      value: categoryMap[category],
      label: category,
      amount: categoryMap[category],
      percentage: total > 0 ? Math.round((categoryMap[category] / total) * 100) : 0,
      color: colors[index % colors.length]
    }));

    setPieData(chartData);
  }

  async function loadCachedHealth() {
    const cached = await getAIHealth();
    if (cached) {
      setHealth(cached);
      setLoading(false);
    }
    refreshAIHealth();
  }

  async function refreshAIHealth() {
    try {
      const result = await analyzeVehicleHealth({
        vehicle: { brand: "Honda", model: "Civic", year: 2022, mileage: 87000, fuel: "Petrol" },
        maintenance: [{ service: "Oil Change", cost: 5000 }],
        expenses: [{ category: "Fuel", amount: 12000 }]
      });

      setHealth(result);
      await saveHealthReport(result);
      setLoading(false);
    } catch (error) {
      console.log("Background AI Error", error);
      setLoading(false);
    }
  }

  // Responsive alignment constraints
  const isLargeScreen = windowWidth > 600;
  const responsiveWrapperStyle = isLargeScreen 
    ? { maxWidth: 540, alignSelf: "center", width: "100%" } 
    : { width: "100%" };

  const chartWidth = Math.min(windowWidth - 64, 480);

  const lineData = analytics.monthlyExpense.map(item => ({
    value: item.amount,
    label: item.month
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader title="Reports & Analytics" navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={responsiveWrapperStyle}>
          
          <Text style={styles.sectionHeader}>AI Vehicle Health Report</Text>

          {loading && !health ? (
            <View style={styles.loadingCard}>
              <View style={styles.loadingIconBox}>
                <ActivityIndicator size="small" color="#F97316" />
              </View>
              <Text style={styles.loadingTitle}>Analyzing Vehicle Telemetry...</Text>
              <Text style={styles.loadingSubtitle}>Evaluating engine performance and driving patterns.</Text>
            </View>
          ) : (
            health && (
              <HealthScore
                score={health.score}
                analysis={health.healthStatus}
                healthStatus={health.healthStatus}
                maintenancePrediction={health.maintenancePrediction}
                drivingEfficiency={health.drivingEfficiency}
                expenseBehaviour={health.expenseBehaviour}
                recommendations={health.recommendations}
                updatedAt={health.updatedAt}
              />
            )
          )}

          <HealthTrendChart history={history} />

          <Text style={styles.sectionHeader}>Expense Analytics</Text>

          <View style={styles.chartCard}>
            <View style={styles.chartHeaderRow}>
              <Ionicons name="trending-up" size={18} color="#F97316" />
              <Text style={styles.chartTitle}>Monthly Trend</Text>
            </View>

            {Platform.OS === "web" ? (
              <WebExpenseChart data={analytics.monthlyExpense} />
            ) : (
              <View style={styles.chartWrapperInner}>
                <LineChart
                  data={lineData}
                  width={chartWidth}
                  height={200}
                  thickness={3}
                  color="#F97316"
                  dataPointsColor="#F97316"
                  dataPointsRadius={5}
                  startFillColor="rgba(249, 115, 22, 0.25)"
                  endFillColor="rgba(249, 115, 22, 0.0)"
                  areaChart
                  hideRules
                  xAxisColor="#E2E8F0"
                  yAxisColor="#E2E8F0"
                  xAxisLabelTextStyle={styles.chartAxisLabel}
                  yAxisTextStyle={styles.chartAxisLabel}
                />
              </View>
            )}
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartHeaderRow}>
              <Ionicons name="pie-chart" size={18} color="#F97316" />
              <Text style={styles.chartTitle}>Expense Breakdown</Text>
            </View>

            <View style={styles.pieContainer}>
              <PieChart
                data={pieData}
                donut
                radius={88}
                innerRadius={58}
                centerLabelComponent={() => (
                  <View style={styles.pieCenterBox}>
                    <Text style={styles.totalAmount}>Rs. {totalExpense.toLocaleString()}</Text>
                    <Text style={styles.centerText}>Total Spent</Text>
                  </View>
                )}
              />
            </View>

            <View style={styles.legendContainer}>
              {pieData.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: item.color }]} />
                  <View style={styles.legendText}>
                    <Text style={styles.category}>{item.label}</Text>
                    <Text style={styles.amount}>
                      Rs. {item.amount.toLocaleString()} <Text style={styles.percentageDot}>•</Text> {item.percentage}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

function WebExpenseChart({ data }) {
  const max = Math.max(...data.map(item => item.amount), 1);

  return (
    <View style={{ width: "100%", height: 200, justifyContent: "space-around" }}>
      {data.map((item, index) => (
        <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ width: 45, fontSize: 11, fontWeight: "700", color: "#64748B" }}>
            {item.month}
          </Text>
          <View style={{ flex: 1, backgroundColor: "#F1F5F9", height: 10, borderRadius: 5, overflow: "hidden", marginHorizontal: 8 }}>
            <View
              style={{
                height: "100%",
                backgroundColor: "#F97316",
                borderRadius: 5,
                width: `${(item.amount / max) * 100}%`
              }}
            />
          </View>
          <Text style={{ fontSize: 11, fontWeight: "700", color: "#0F172A", width: 65, textAlign: "right" }}>
            Rs. {item.amount}
          </Text>
        </View>
      ))}
    </View>
  );
}