import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  useWindowDimensions
} from "react-native";
import { ChevronLeft, CalendarDays, Calendar } from "lucide-react-native";
import * as Notifications from "expo-notifications";
import styles from "./styles";

// Fall back smoothly to native picker engines only on physical mobile platforms
const DateTimePicker = Platform.OS !== "web" ? require("@react-native-community/datetimepicker").default : null;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function BookLesson({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateText, setDateText] = useState("");
  const [vehicle, setVehicle] = useState("");

  // Web fallback simple picker state variables
  const [webYear, setWebYear] = useState(new Date().getFullYear().toString());
  const [webMonth, setWebMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, "0"));
  const [webDay, setWebDay] = useState(new Date().getDate().toString().padStart(2, "0"));

  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;

  useEffect(() => {
    if (Platform.OS !== "web") {
      async function requestPermissions() {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Required",
            "Please enable notifications to receive your lesson confirmation alerts."
          );
        }
      }
      requestPermissions();
    } else {
      // Set the initial formatted string directly for the custom web layout display
      syncWebDateText(webYear, webMonth, webDay);
    }
  }, []);

  // Sync date string whenever custom web dropdown inputs change
  const syncWebDateText = (y, m, d) => {
    const target = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    setDate(target);
    const formatted = target.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setDateText(formatted);
  };

  const onDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
      const formatted = selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setDateText(formatted);
    }
  };

  const handleConfirmBooking = async () => {
    if (!name || !phone || !dateText || !vehicle) {
      if (Platform.OS === "web") {
        alert("Please populate all booking parameters before continuing.");
      } else {
        Alert.alert("Missing Fields", "Please populate all booking parameters before continuing.");
      }
      return;
    }

    if (Platform.OS !== "web") {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "AutoSphere Driving School",
            body: `🎉 Success! You booked a lesson for ${dateText} using a ${vehicle.toLowerCase()}. Your instructor will contact you shortly!`,
          },
          trigger: null,
        });

        Alert.alert(
          "Booking Successful",
          "Your lesson booking has been confirmed!",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } catch (error) {
        Alert.alert("Notification Error", "Could not trigger local confirmation alert.");
      }
    } else {
      alert(`🎉 AutoSphere Driving School:\nSuccess! You booked a lesson for ${dateText} using a ${vehicle.toLowerCase()}.`);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ChevronLeft size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.title}>Book Lesson</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContainer,
            isLargeScreen && styles.scrollContainerLarge
          ]}
        >
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <CalendarDays size={28} color="#F97316" />
            </View>

            <Text style={styles.heading}>Lesson Booking Details</Text>
            <Text style={styles.subheading}>
              Fill out the details below to reserve your next vehicle instruction block.
            </Text>

            <View style={styles.formGroup}>
              <InputWrapper
                label="Student Name"
                placeholder="e.g., Alex Morgan"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={setName}
              />

              <InputWrapper
                label="Phone Number"
                placeholder="e.g., 555-0199"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={phone}
                onChangeText={setPhone}
              />

              {/* Date Selection Box Layout */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Preferred Date</Text>
                
                {Platform.OS === "web" ? (
                  /* Premium Custom Web Date Selector UI */
                  <View style={{ gap: 8 }}>
                    <TouchableOpacity
                      style={styles.dateSelectorButton}
                      activeOpacity={0.7}
                      onPress={() => setShowDatePicker(!showDatePicker)}
                    >
                      <Text style={styles.dateText}>{dateText}</Text>
                      <Calendar size={20} color="#64748B" />
                    </TouchableOpacity>

                    {showDatePicker && (
                      <View style={{
                        backgroundColor: "#F8FAFC",
                        borderRadius: 14,
                        padding: 12,
                        borderWidth: 1,
                        borderColor: "#E2E8F0",
                        flexDirection: "row",
                        gap: 8,
                        justifyContent: "space-between"
                      }}>
                        {/* Month Selector Component */}
                        <select
                          value={webMonth}
                          onChange={(e) => {
                            setWebMonth(e.target.value);
                            syncWebDateText(webYear, e.target.value, webDay);
                          }}
                          style={webSelectStyle}
                        >
                          {Array.from({ length: 12 }, (_, i) => {
                            const m = (i + 1).toString().padStart(2, "0");
                            return <option key={m} value={m}>{new Date(2026, i).toLocaleString('en-US', { month: 'short' })}</option>;
                          })}
                        </select>

                        {/* Day Selector Component */}
                        <select
                          value={webDay}
                          onChange={(e) => {
                            setWebDay(e.target.value);
                            syncWebDateText(webYear, webMonth, e.target.value);
                          }}
                          style={webSelectStyle}
                        >
                          {Array.from({ length: 31 }, (_, i) => {
                            const d = (i + 1).toString().padStart(2, "0");
                            return <option key={d} value={d}>{d}</option>;
                          })}
                        </select>

                        {/* Year Selector Component */}
                        <select
                          value={webYear}
                          onChange={(e) => {
                            setWebYear(e.target.value);
                            syncWebDateText(e.target.value, webMonth, webDay);
                          }}
                          style={webSelectStyle}
                        >
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                        </select>
                      </View>
                    )}
                  </View>
                ) : (
                  /* Standard Mobile Target Implementation */
                  <>
                    <TouchableOpacity
                      style={styles.dateSelectorButton}
                      activeOpacity={0.7}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Text style={[styles.dateText, !dateText && styles.datePlaceholder]}>
                        {dateText ? dateText : "Select preferred date"}
                      </Text>
                      <Calendar size={20} color="#64748B" />
                    </TouchableOpacity>

                    {showDatePicker && DateTimePicker && (
                      <View style={Platform.OS === 'ios' && styles.iosPickerContainer}>
                        <DateTimePicker
                          value={date}
                          mode="date"
                          display={Platform.OS === "ios" ? "spinner" : "default"}
                          minimumDate={new Date()}
                          onChange={onDateChange}
                        />
                        {Platform.OS === "ios" && (
                          <TouchableOpacity 
                            style={styles.iosCloseButton}
                            onPress={() => setShowDatePicker(false)}
                          >
                            <Text style={styles.iosCloseButtonText}>Done</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </>
                )}
              </View>

              <InputWrapper
                label="Vehicle Type"
                placeholder="e.g., Manual Car, Truck"
                placeholderTextColor="#94A3B8"
                value={vehicle}
                onChangeText={setVehicle}
              />
            </View>

            <TouchableOpacity 
              style={styles.button} 
              activeOpacity={0.8}
              onPress={handleConfirmBooking}
            >
              <Text style={styles.buttonText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Inline constant styling configurations tailored for elegant web dropdown options
const webSelectStyle = {
  flex: 1,
  height: "40px",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  paddingHorizontal: "8px",
  fontSize: "14px",
  color: "#0F172A",
  border: "1px solid #E2E8F0",
  outline: "none",
  cursor: "pointer",
  fontFamily: "Plus Jakarta Sans"
};

function InputWrapper({ label, ...textInputProps }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput style={styles.input} {...textInputProps} />
    </View>
  );
}