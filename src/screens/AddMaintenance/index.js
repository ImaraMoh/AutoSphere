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
import { getMaintenance, saveMaintenance } from "../../services/maintenanceStorage";

export default function AddMaintenance({ navigation }) {
  const [service, setService] = useState({
    garage: "",
    repair: "",
    cost: "",
    date: "" // Formatted 'YYYY-MM-DD'
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Hook to get live window dimensions for UI responsiveness
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768; // Tablet/Web breakpoint

  // Calendar Helper Data
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Helper date conversions
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
    setService({ ...service, date: selected });
    setShowCalendar(false);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Renders the Day Cells dynamically
  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    const days = [];
    // Spacer cells
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDayEmpty} />);
    }

    // Active calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDayString = formatDateString(year, month, day);
      const isSelected = service.date === formattedDayString;

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
    if (!service.garage || !service.repair || !service.cost || !service.date) {
      alert("Please fill in all fields including the service date.");
      return;
    }

    const old = await getMaintenance();
    const newData = {
      id: Date.now(),
      ...service
    };

    await saveMaintenance([...old, newData]);
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
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.title}>Add Record</Text>
            <View style={{ width: 40 }} /> 
          </View>

          {/* FORM FIELDS */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Garage Name</Text>
              <TextInput
                placeholder="e.g., Apex Auto Center"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={service.garage}
                onChangeText={(t) => setService({ ...service, garage: t })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Repair Completed</Text>
              <TextInput
                placeholder="e.g., Oil change & brake pads"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={service.repair}
                onChangeText={(t) => setService({ ...service, repair: t })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cost ($)</Text>
              <TextInput
                placeholder="e.g., 120.00"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                style={styles.input}
                value={service.cost}
                onChangeText={(t) => setService({ ...service, cost: t })}
              />
            </View>

            {/* Service Date Trigger Button */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service Date</Text>
              <TouchableOpacity 
                onPress={() => setShowCalendar(true)}
                style={styles.dateSelector}
                activeOpacity={0.8}
              >
                <Text style={[styles.dateText, !service.date && styles.placeholderText]}>
                  {service.date ? service.date : "Select Service Date"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="#F97316" />
              </TouchableOpacity>
            </View>
          </View>

          {/* SUBMIT BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={save}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Save Service Record</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* FULLY RESPONSIVE CALENDAR MODAL */}
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
            {/* Modal Pull Bar/Indicator on Mobile */}
            {!isLargeScreen && <View style={styles.pullIndicator} />}

            {/* Modal Calendar Header Control */}
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

            {/* Days of week titles row */}
            <View style={styles.daysHeaderRow}>
              {daysOfWeek.map((day) => (
                <Text key={day} style={styles.dayOfWeekText}>{day}</Text>
              ))}
            </View>

            {/* Calendar Numbers Grid Layout */}
            <View style={styles.daysGrid}>
              {renderCalendarDays()}
            </View>

            {/* Cancel Action Row */}
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
    maxWidth: 1000, // Centers and frames container beautifully on desktop/tablets
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

  /* RESPONSIVE CALENDAR MODAL UI DESIGN */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)", // Translucent backdrop overlay
    justifyContent: "flex-end", // Mobile default: Slides up from bottom
  },
  modalOverlayLarge: {
    justifyContent: "center", // Desktop/Tablet style: Centers the picker dialog
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
    width: 400, // Sets elegant static card width for wide displays
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
    width: "13%", // Distributes items evenly across horizontal width
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
    width: "13%", // Maps perfectly to 7 columns dynamically
    aspectRatio: 1, // Ensures perfect circles across varying mobile screens
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 99,
  },
  calendarDaySelected: {
    backgroundColor: "#F97316", // Accent Highlight color
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