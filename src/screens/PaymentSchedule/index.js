import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar
} from "react-native";
import {
  ChevronLeft,
  CheckCircle2,
  Clock,
  CalendarDays
} from "lucide-react-native";
import styles from "./styles";

const payments = [
  {
    month: "January 2026",
    amount: "45,000",
    status: "Paid"
  },
  {
    month: "February 2026",
    amount: "45,000",
    status: "Upcoming"
  },
  {
    month: "March 2026",
    amount: "45,000",
    status: "Upcoming"
  },
  {
    month: "April 2026",
    amount: "45,000",
    status: "Upcoming"
  }
];

export default function PaymentSchedule({ navigation }) {
  const renderPaymentItem = ({ item }) => {
    const isPaid = item.status === "Paid";

    return (
      <View style={[styles.paymentCard, isPaid && styles.paymentCardPaid]}>
        <View style={[styles.paymentIconBox, { backgroundColor: isPaid ? "#F0FDF4" : "#FEF3C7" }]}>
          {isPaid ? (
            <CheckCircle2 size={22} color="#16A34A" />
          ) : (
            <Clock size={22} color="#D97706" />
          )}
        </View>

        <View style={styles.paymentDetails}>
          <Text style={styles.paymentMonth}>{item.month}</Text>
          <Text style={styles.paymentAmount}>Rs. {item.amount}</Text>
        </View>

        <View style={[styles.statusBadgePill, { backgroundColor: isPaid ? "#DCFCE7" : "#FEF3C7" }]}>
          <Text style={[styles.statusBadgeText, { color: isPaid ? "#15803D" : "#B45309" }]}>
            {item.status}
          </Text>
        </View>
      </View>
    );
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
        <Text style={styles.title}>Payment Schedule</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.scheduleBody}>
        
        {/* Summary Card Header */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIconCircle}>
            <CalendarDays size={22} color="#F97316" />
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.summarySubtitle}>Loan Repayment Plan</Text>
            <Text style={styles.summaryAmountText}>Rs. 45,000 <Text style={styles.summaryPerMonth}>/ Month</Text></Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Installment Timeline</Text>

        <FlatList
          data={payments}
          keyExtractor={(item) => item.month}
          renderItem={renderPaymentItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />

      </View>
    </SafeAreaView>
  );
}