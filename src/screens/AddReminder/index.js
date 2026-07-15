import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Modal,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getReminders, saveReminders } from "../../services/reminderStorage";

export default function AddReminder({ navigation }) {
  const [reminder, setReminder] = useState({
    title: "",
    date: "", // Formatted 'YYYY-MM-DD'
    type: ""
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Hook for layout responsiveness across tablets/desktops
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;

  // Calendar Engine Constants
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Date Parsing Helpers
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
    setReminder({ ...reminder, date: selected });
    setShowCalendar(false);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Render Calendar Grid Items
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
      const isSelected = reminder.date === formattedDayString;

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
    if (!reminder.title || !reminder.type || !reminder.date) {
      alert("Please fill out all the fields before saving.");
      return;
    }

    const old = await getReminders();
    const newReminder = {
      id: Date.now(),
      title: reminder.title,
      date: reminder.date,
      type: reminder.type,
      status: "Upcoming"
    };

    await saveReminders([...old, newReminder]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContainer, 
            isLargeScreen && styles.scrollContainerLarge
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER SECTION */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.title}>Add Reminder</Text>
            <View style={{ width: 40 }} /> 
          </View>

          {/* FORM USER INTERFACE */}
          <View style={styles.form}>
            
            {/* Reminder Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reminder Title</Text>
              <TextInput
                placeholder="e.g., Annual Brake Inspection"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={reminder.title}
                onChangeText={(text) => setReminder({ ...reminder, title: text })}
              />
            </View>

            {/* Reminder Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reminder Type</Text>
              <TextInput
                placeholder="e.g., Service, Insurance, Renewal"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={reminder.type}
                onChangeText={(text) => setReminder({ ...reminder, type: text })}
              />
            </View>

            {/* Target Date Picker Trigger */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Due Date</Text>
              <TouchableOpacity 
                onPress={() => setShowCalendar(true)}
                style={styles.dateSelector}
                activeOpacity={0.8}
              >
                <Text style={[styles.dateText, !reminder.date && styles.placeholderText]}>
                  {reminder.date ? reminder.date : "Select Due Date"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#F97316" />
              </TouchableOpacity>
            </View>

          </View>

          {/* SAVE BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={save}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Save Reminder</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* RESPONSIVE DESIGN CALENDAR MODAL */}
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

            {/* Month & Year Navigation Row */}
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

            {/* Days Of Week Headers */}
            <View style={styles.daysHeaderRow}>
              {daysOfWeek.map((day) => (
                <Text key={day} style={styles.dayOfWeekText}>{day}</Text>
              ))}
            </View>

            {/* Dynamic Days Numerical Grid */}
            <View style={styles.daysGrid}>
              {renderCalendarDays()}
            </View>

            {/* Cancel Control */}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 20 : 10,
    paddingBottom: 40,
    width: "100%",
    alignSelf: "center",
  },
  scrollContainerLarge: {
    maxWidth: 600, // Caps desktop width to fit forms perfectly
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  backButton: {
    height: 44,
    width: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },
  form: {
    gap: 20,
    marginBottom: 30,
  },
  inputGroup: {
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginLeft: 2,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    fontSize: 15,
    color: "#0F172A",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  dateSelector: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  dateText: {
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "500",
  },
  placeholderText: {
    color: "#94A3B8",
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#F97316",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* RESPONSIVE DESIGN CALENDAR STRUCTURAL BLOCK STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "flex-end", 
  },
  modalOverlayLarge: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 44 : 32,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
  modalContentLarge: {
    width: 400,
    borderRadius: 24,
    paddingVertical: 24,
    paddingBottom: 24,
    shadowOffset: { width: 0, height: 8 },
  },
  pullIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  calendarHeaderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  navBtn: {
    height: 38,
    width: 38,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  daysHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  dayOfWeekText: {
    width: "13%",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  calendarDay: {
    width: "13%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 99,
  },
  calendarDaySelected: {
    backgroundColor: "#F97316",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  calendarDayEmpty: {
    width: "13%",
    aspectRatio: 1,
    marginVertical: 4,
  },
  calendarDayText: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "600",
  },
  calendarDayTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  closeBtn: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  closeBtnText: {
    color: "#475569",
    fontSize: 15,
    fontWeight: "600",
  }
});