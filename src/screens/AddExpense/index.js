import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Modal,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { saveExpense } from "../../services/expenseStorage"; // Updated to use saveExpense with vehicleId
import AppHeader from "../../components/AppHeader";
import styles from "./styles";

export default function AddExpense({ navigation, route }) {
  // Extract vehicleId passed from the previous screen or parameters
  const vehicleId = route?.params?.vehicleId;

  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
    date: "" // Formatted 'YYYY-MM-DD'
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Hook for adaptive multi-platform grid support
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;

  // Calendar Parsing Arrays
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Helper date utility mappings
  const formatDateString = (year, month, day) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const selectDate = (day) => {
    const selected = formatDateString(currentDate.getFullYear(), currentDate.getMonth(), day);
    setExpense({ ...expense, date: selected });
    setShowCalendar(false);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Generate dynamic day nodes
  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDayEmpty} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDayString = formatDateString(year, month, day);
      const isSelected = expense.date === formattedDayString;

      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={[styles.calendarDay, isSelected && styles.calendarDaySelected]}
          onPress={() => selectDate(day)}
          activeOpacity={0.7}
        >
          <Text style={[styles.calendarDayText, isSelected && styles.calendarDayTextSelected]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }
    return days;
  };

  const save = async () => {
    if (!vehicleId) {
      alert("Missing vehicle ID. Please select a vehicle first.");
      return;
    }

    if (!expense.title || !expense.category || !expense.amount || !expense.date) {
      alert("Please enter all details and select an expense date.");
      return;
    }

    const newExpense = {
      title: expense.title,
      category: expense.category,
      amount: Number(expense.amount),
      date: expense.date
    };

    const success = await saveExpense(vehicleId, newExpense);
    if (success) {
      navigation.goBack();
    } else {
      alert("Failed to save expense. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea || { flex: 1, backgroundColor: "#F8FAFC" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* APP HEADER */}
        <AppHeader title="Add Expense" navigation={navigation} />

        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer || { paddingHorizontal: 20, paddingBottom: 40 },
            isLargeScreen && { maxWidth: 600, width: "100%", alignSelf: "center" }
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* CONTENT FORM CONTAINER */}
          <View style={[styles.form, { gap: 20, marginTop: 10 }]}>
            
            {/* Title Block */}
            <View style={{ gap: 6 }}>
              <Text style={styles.label || styles.label}>Expense Name</Text>
              <TextInput
                placeholder="e.g., Premium Unleaded Fuel"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={expense.title}
                onChangeText={(text) => setExpense({ ...expense, title: text })}
              />
            </View>

            {/* Category Block */}
            <View style={{ gap: 6 }}>
              <Text style={styles.label || styles.label}>Category</Text>
              <TextInput
                placeholder="e.g., Fuel, Repair, Service"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={expense.category}
                onChangeText={(text) => setExpense({ ...expense, category: text })}
              />
            </View>

            {/* Amount Block */}
            <View style={{ gap: 6 }}>
              <Text style={styles.label || styles.label}>Amount (Rs.)</Text>
              <TextInput
                placeholder="e.g., 2500"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                style={styles.input}
                value={expense.amount}
                onChangeText={(text) => setExpense({ ...expense, amount: text })}
              />
            </View>

            {/* Unified Calendar Dynamic Selector Input */}
            <View style={{ gap: 6 }}>
              <Text style={styles.label || styles.label}>Transaction Date</Text>
              <TouchableOpacity
                onPress={() => setShowCalendar(true)}
                style={styles.dateSelector || styles.dateSelector}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.dateText,
                  expense.date ? null : styles.placeholderText
                ]}>
                  {expense.date ? expense.date : "Select Transaction Date"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#F97316" />
              </TouchableOpacity>
            </View>

          </View>

          {/* ACTIONS TRIGGER SUBMIT BUTTON */}
          <TouchableOpacity
            style={[styles.button, { marginTop: 30 }]}
            onPress={save}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Save Expense</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ADAPTIVE DESIGN CALENDAR MODAL */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={[
          styles.modalOverlay,
          isLargeScreen && styles.modalOverlayLarge
        ]}>
          <View style={[
            styles.modalContent,
            isLargeScreen && styles.modalContentLarge
          ]}>
            {!isLargeScreen && <View style={styles.pullIndicator} />}

            {/* Month Control Grid */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navBtn}>
                <Ionicons name="chevron-back" size={20} color="#334155" />
              </TouchableOpacity>
              <Text style={styles.calendarHeaderTitle}>
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </Text>
              <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navBtn}>
                <Ionicons name="chevron-forward" size={20} color="#334155" />
              </TouchableOpacity>
            </View>

            {/* Days row labels */}
            <View style={styles.daysHeaderRow}>
              {daysOfWeek.map((day) => (
                <Text key={day} style={styles.dayOfWeekText}>{day}</Text>
              ))}
            </View>

            {/* Layout Calendar Grid Numbers */}
            <View style={styles.daysGrid}>
              {renderCalendarDays()}
            </View>

            {/* Close Overlay Control */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}