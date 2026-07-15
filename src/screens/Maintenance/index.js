import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Platform,
  useWindowDimensions
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import { getMaintenance } from "../../services/maintenanceStorage";
import styles from "./styles";

export default function Maintenance({ navigation }) {
  const [records, setRecords] = useState([]);
  const { width: windowWidth } = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const load = async () => {
    const data = await getMaintenance();
    setRecords(data || []);
  };

  // Safe structural alignment width configurations for larger/desktop screens
  const isLargeScreen = windowWidth > 600;
  const responsiveWrapperStyle = isLargeScreen ? { maxWidth: 540, alignSelf: "center", width: "100%" } : { width: "100%" };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Maintenance History" navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={responsiveWrapperStyle}>
          
          {records.length === 0 ? (
            /* Empty State State Block */
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="construct-outline" size={32} color="#94A3B8" />
              </View>
              <Text style={styles.emptyHeading}>No Service Records</Text>
              <Text style={styles.emptySub}>Log your vehicle maintenance history below.</Text>
            </View>
          ) : (
            /* Active Maintenance History Card List Stack */
            records.map((item) => (
              <View style={styles.card} key={item.id}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconIndicatorBox}>
                    <Ionicons name="build" size={18} color="#F97316" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.titleText}>{item.repair}</Text>
                    <Text style={styles.metaLabelText}>
                      Garage: <Text style={styles.metaValueText}>{item.garage}</Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.cardFooter}>
                  <View style={styles.badgeColumn}>
                    <Text style={styles.subTextLabel}>TOTAL COST</Text>
                    <Text style={styles.costText}>LKR {Number(item.cost).toLocaleString()}</Text>
                  </View>
                  <View style={styles.dateBadge}>
                    <Ionicons name="calendar-outline" size={14} color="#64748B" style={{ marginRight: 4 }} />
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>
              </View>
            ))
          )}

          {/* Core Vibrant Orange Floating/Sticky Style Service Button */}
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => navigation.navigate("AddMaintenance")}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.buttonText}>Add Service</Text>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}