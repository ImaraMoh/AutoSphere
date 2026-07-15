import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  ActivityIndicator,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { LineChart, PieChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../../components/AppHeader";
import HealthScore from "../../components/HealthScore";
import HealthTrendChart from "../../components/HealthTrendChart";

import { saveHealthReport, getHealthHistory } from "../../services/aiHealthStorage";
import { analyzeVehicleHealth } from "../../services/aiHealthService";
import { getAIHealth } from "../../services/aiCacheService";
import { getExpenses } from "../../services/expenseStorage";

import styles from "./styles";

export default function Reports({ route, navigation }) {
  // Capture the specific vehicle ID passed via route parameters
  const vehicleId = route?.params?.vehicleId || route?.params?.id || null;

  const [health, setHealth] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const { width: windowWidth } = useWindowDimensions();

  const loadVehicleAnalyticsData = useCallback(async () => {
    if (!vehicleId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // 1. Fetch expenses specifically for this vehicleId using your updated service
      const expensesList = await getExpenses(vehicleId);
      const safeExpenses = expensesList || [];

      // 2. Fetch vehicle-specific health history logs
      const healthHistoryData = await getHealthHistory(vehicleId);
      setHistory(healthHistoryData || []);

      // 3. Process charts using the vehicle's unique expense dataset
      calculateExpenseChart(safeExpenses);
      calculateMonthlyTrendChart(safeExpenses);

      // 4. Load or refresh cached AI Health for this particular vehicle
      const cached = await getAIHealth(vehicleId);
      if (cached) {
        setHealth(cached);
      } else {
        const aiResult = await analyzeVehicleHealth({
          vehicle: { 
            id: vehicleId, 
            brand: route?.params?.brand || "Honda", 
            model: route?.params?.model || "Civic", 
            year: route?.params?.year || 2022, 
            mileage: route?.params?.mileage || 87000 
          },
          maintenance: [],
          expenses: safeExpenses
        });
        if (aiResult) {
          setHealth(aiResult);
        }
      }
    } catch (error) {
      console.log("Error loading vehicle-specific analytics payload:", error);
    } finally {
      setLoading(false);
    }
  }, [vehicleId, route?.params]);

  useEffect(() => {
    loadVehicleAnalyticsData();
  }, [loadVehicleAnalyticsData]);

  /**
   * Aggregates expenses by Category for the Pie Chart breakdown.
   */
  function calculateExpenseChart(data) {
    const categoryMap = {};

    data.forEach(item => {
      const category = item.category || "Other";
      const amount = Number(item.amount || 0);
      categoryMap[category] = (categoryMap[category] || 0) + amount;
    });

    const total = Object.values(categoryMap).reduce((a, b) => a + b, 0);
    setTotalExpense(total);

    const colors = ["#F97316", "#16A34A", "#2563EB", "#DC2626", "#9333EA", "#06B6D4", "#F59E0B"];

    const chartData = Object.keys(categoryMap).map((category, index) => ({
      value: categoryMap[category],
      label: category,
      amount: categoryMap[category],
      percentage: total > 0 ? Math.round((categoryMap[category] / total) * 100) : 0,
      color: colors[index % colors.length]
    }));

    setPieData(chartData);
  }

  /**
   * Aggregates expenses across a 6-month historical timeline for the Line Chart.
   */
  function calculateMonthlyTrendChart(data) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyMap = {};

    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const label = monthNames[d.getMonth()];
      monthlyMap[label] = 0;
    }

    data.forEach(item => {
      let dateObj = new Date();
      if (item.date) {
        dateObj = new Date(item.date);
      } else if (item.createdAt?.toDate) {
        dateObj = item.createdAt.toDate();
      } else if (item.createdAt) {
        dateObj = new Date(item.createdAt);
      }

      if (!isNaN(dateObj.getTime())) {
        const label = monthNames[dateObj.getMonth()];
        if (monthlyMap[label] !== undefined) {
          monthlyMap[label] += Number(item.amount || 0);
        }
      }
    });

    const trendData = Object.keys(monthlyMap).map(month => ({
      value: monthlyMap[month],
      label: month
    }));

    setLineData(trendData);
  }

  const isLargeScreen = windowWidth > 600;
  const responsiveWrapperStyle = isLargeScreen 
    ? { maxWidth: 540, alignSelf: "center", width: "100%" } 
    : { width: "100%" };

  const chartWidth = Math.min(windowWidth - 64, 480);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader title="Reports" navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={responsiveWrapperStyle}>
          
          <Text style={styles.sectionHeader}>AI Vehicle Health Diagnostics</Text>

          {loading && !health ? (
            <View style={styles.loadingCard}>
              <View style={styles.loadingIconBox}>
                <ActivityIndicator size="small" color="#F97316" />
              </View>
              <Text style={styles.loadingTitle}>Evaluating Scoped Telemetry...</Text>
              <Text style={styles.loadingSubtitle}>Analyzing component wear and expenditure trends for this vehicle.</Text>
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

          <Text style={styles.sectionHeader}>Financial Expense Analytics</Text>

          {/* Monthly Trend Section */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeaderRow}>
              <Ionicons name="trending-up" size={18} color="#F97316" />
              <Text style={styles.chartTitle}>Monthly Trend</Text>
            </View>

            {Platform.OS === "web" ? (
              <WebExpenseChart data={lineData} />
            ) : (
              <View style={styles.chartWrapperInner}>
                <LineChart
                  data={lineData.length > 0 ? lineData : [{ value: 0, label: "None" }]}
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

          {/* Expense Breakdown Section */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeaderRow}>
              <Ionicons name="pie-chart" size={18} color="#F97316" />
              <Text style={styles.chartTitle}>Expense Breakdown</Text>
            </View>

            <View style={styles.pieContainer}>
              <PieChart
                data={pieData.length > 0 ? pieData : [{ value: 1, color: "#E2E8F0" }]}
                donut
                radius={88}
                innerRadius={58}
                centerLabelComponent={() => (
                  <View style={styles.pieCenterBox}>
                    <Text style={styles.totalAmount}>Rs. {totalExpense.toLocaleString()}</Text>
                    <Text style={styles.centerText}>Vehicle Total</Text>
                  </View>
                )}
              />
            </View>

            <View style={styles.legendContainer}>
              {pieData.length === 0 ? (
                <Text style={{ textAlign: "center", color: "#64748B", marginTop: 10 }}>No expenses logged for this vehicle.</Text>
              ) : (
                pieData.map((item, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: item.color }]} />
                    <View style={styles.legendText}>
                      <Text style={styles.category}>{item.label}</Text>
                      <Text style={styles.amount}>
                        Rs. {item.amount.toLocaleString()} <Text style={styles.percentageDot}>•</Text> {item.percentage}%
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

function WebExpenseChart({ data }) {
  const safeData = data || [];
  const max = Math.max(...safeData.map(item => item.value || 0), 1);

  return (
    <View style={{ width: "100%", height: 200, justifyContent: "space-around" }}>
      {safeData.map((item, index) => (
        <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ width: 45, fontSize: 11, fontWeight: "700", color: "#64748B" }}>
            {item.label}
          </Text>
          <View style={{ flex: 1, backgroundColor: "#F1F5F9", height: 10, borderRadius: 5, overflow: "hidden", marginHorizontal: 8 }}>
            <View
              style={{
                height: "100%",
                backgroundColor: "#F97316",
                borderRadius: 5,
                width: `${((item.value || 0) / max) * 100}%`
              }}
            />
          </View>
          <Text style={{ fontSize: 11, fontWeight: "700", color: "#0F172A", width: 85, textAlign: "right" }}>
            Rs. {item.value || 0}
          </Text>
        </View>
      ))}
    </View>
  );
}