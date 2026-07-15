import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert
} from "react-native";
import {
  ChevronLeft,
  Calculator,
  FileText,
  Calendar,
  CreditCard,
  Plus,
  Car,
  Clock,
  CheckCircle2
} from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getLoan } from "../../services/financeStorage";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./styles";

export default function Finance({ route, navigation }) {
  const vehicleId = route?.params?.vehicleId || null;
  const [loan, setLoan] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadLoanData();
    }, [vehicleId])
  );

  const loadLoanData = async () => {
    if (!auth.currentUser) {
      Alert.alert("Authentication Error", "You must be logged in to view finance data.");
      return;
    }

    if (!vehicleId) {
      return;
    }

    try {
      const data = await getLoan(vehicleId);
      setLoan(data);
    } catch (error) {
      console.log("Error loading loan data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Toolbar Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Finance</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        {/* Hero Section Container */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>💳 Vehicle Finance</Text>
          <Text style={styles.heroText}>
            Manage loans, track EMIs, and review upcoming installment payments.
          </Text>
        </View>

        {/* Conditional Loan View with Polished UI */}
        {loan ? (
          <View style={styles.activeLoanCard}>
            <View style={styles.loanCardHeaderRow}>
              <View style={styles.loanIconBox}>
                <Car size={22} color="#F97316" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.loanVehicleTitle}>{loan.vehicleModel}</Text>
                <Text style={styles.loanSubLabel}>Vehicle Finance Application</Text>
              </View>
              <View style={styles.statusBadge}>
                <Clock size={12} color="#D97706" style={{ marginRight: 3 }} />
                <Text style={styles.statusBadgeText}>{loan.status || "Under Review"}</Text>
              </View>
            </View>

            <View style={styles.loanDivider} />

            <View style={styles.loanStatsRow}>
              <View style={styles.loanStatItem}>
                <Text style={styles.loanStatLabel}>Total Loan Amount</Text>
                <Text style={styles.loanStatValue}>{loan.amount}</Text>
              </View>
              <View style={styles.loanStatDivider} />
              <View style={styles.loanStatItem}>
                <Text style={styles.loanStatLabel}>Estimated Monthly EMI</Text>
                <Text style={[styles.loanStatValue, { color: "#F97316" }]}>{loan.monthlyEMI}</Text>
              </View>
            </View>

            {loan.documentName && (
              <View style={styles.docAttachedRow}>
                <CheckCircle2 size={14} color="#16A34A" />
                <Text style={styles.docAttachedText} numberOfLines={1}>
                  Attached: {loan.documentName}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <CreditCard size={36} color="#F97316" />
            </View>
            <Text style={styles.emptyTitle}>No Active Loan</Text>
            <Text style={styles.emptyText}>
              Apply for vehicle financing easily or calculate your estimated monthly payments.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("LoanApplication", { vehicleId })}
              activeOpacity={0.8}
            >
              <Plus size={18} color="#FFFFFF" style={styles.btnIcon} />
              <Text style={styles.buttonText}>Apply for Finance</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Action Navigation Grid */}
        <Text style={styles.sectionTitle}>Finance Tools & Actions</Text>
        
        <View style={styles.actionGridContainer}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("EMICalculator")}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconBox, { backgroundColor: "#FFF7ED" }]}>
              <Calculator size={20} color="#F97316" />
            </View>
            <Text style={styles.cardTitle}>EMI Calculator</Text>
            <Text style={styles.cardSubText}>Estimate monthly installments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("LoanApplication", { vehicleId })}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconBox, { backgroundColor: "#EFF6FF" }]}>
              <FileText size={20} color="#3B82F6" />
            </View>
            <Text style={styles.cardTitle}>Apply Finance</Text>
            <Text style={styles.cardSubText}>Submit a new loan request</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionGridContainer}>
          <TouchableOpacity
            style={[styles.actionCard, { flex: 1 }]}
            onPress={() => navigation.navigate("PaymentSchedule", { vehicleId })}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconBox, { backgroundColor: "#F0FDF4" }]}>
              <Calendar size={20} color="#22C55E" />
            </View>
            <Text style={styles.cardTitle}>Payment Schedule</Text>
            <Text style={styles.cardSubText}>Track past and upcoming due dates</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}