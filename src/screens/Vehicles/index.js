// Vehicles.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import VehicleCard from "../../components/VehicleCard";
import EmptyVehicleState from "../../components/EmptyVehicleState";

import { getVehicles } from "../../services/vehicleStorage";
import { calculateVehicleHealth } from "../../services/vehicleHealthService";

import styles from "./styles";

export default function Vehicles({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 600;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadVehicles();
    });
    return unsubscribe;
  }, [navigation]);

  async function loadVehicles() {
    try {
      let data = await getVehicles();
      
      // If storage is empty, initialize it automatically using registered primary vehicle details
      if (!data || data.length === 0) {
        const storedVehicle = await AsyncStorage.getItem("@primary_vehicle");
        if (storedVehicle) {
          const parsedVehicle = JSON.parse(storedVehicle);
          const defaultVehicle = {
            id: "1",
            brand: parsedVehicle.make || "Honda",
            model: parsedVehicle.model || "Civic",
            year: parsedVehicle.year || "2022",
            registration: parsedVehicle.plateNumber || "WP CAB 1234",
            type: "Car",
            mileage: 87000,
            fuel: "Petrol"
          };
          
          // Save back to storage so it persists
          await AsyncStorage.setItem("@vehicles", JSON.stringify([defaultVehicle]));
          data = [defaultVehicle];
        }
      }

      setVehicles(data || []);
    } catch (error) {
      console.log("Failed to load vehicle list", error);
      setVehicles([]);
    }
  }

  async function refresh() {
    setRefreshing(true);
    await loadVehicles();
    setRefreshing(false);
  }

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch =
      ((vehicle.brand || "") + (vehicle.model || "") + (vehicle.registration || ""))
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter = filter === "All" || vehicle.type === filter;

    return matchesSearch && matchesFilter;
  });

  const averageHealth = vehicles.length
    ? Math.round(
        vehicles.reduce(
          (total, item) => total + calculateVehicleHealth(item).score,
          0
        ) / vehicles.length
      )
    : 0;

  const responsiveWrapperStyle = isLargeScreen
    ? { maxWidth: 540, alignSelf: "center", width: "100%" }
    : { width: "100%" };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>My Vehicles</Text>
          <Text style={styles.subtitle}>Manage your digital garage ecosystem</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor="#F97316" />}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={responsiveWrapperStyle}>
          
          {/* Vehicle Summary Hero Card */}
          <View style={styles.summaryCardHero}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{vehicles.length}</Text>
              <Text style={styles.summaryLabel}>Total Fleet</Text>
            </View>
            <View style={styles.summaryVerticalDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>
                {vehicles.filter(v => v.type === "Car").length}
              </Text>
              <Text style={styles.summaryLabel}>Cars</Text>
            </View>
            <View style={styles.summaryVerticalDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{averageHealth}%</Text>
              <Text style={styles.summaryLabel}>Avg Health</Text>
            </View>
          </View>

          {/* Search Input Box */}
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#64748B" />
            <TextInput
              placeholder="Search by brand, model, or plate..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          {/* Filters Scrollable Row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRowContainer}
            style={styles.filterScrollWrapper}
          >
            {["All", "Car", "Bike", "Van", "Truck"].map(item => {
              const isActive = filter === item;
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setFilter(item)}
                  activeOpacity={0.8}
                  style={[
                    styles.filterPillButton,
                    isActive && styles.activeFilterPillButton
                  ]}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      isActive && styles.activeFilterPillText
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Vehicle Listing / Empty State */}
          {filteredVehicles.length === 0 ? (
            <EmptyVehicleState onPress={() => navigation.navigate("AddVehicle")} />
          ) : (
            <View style={styles.listWrapper}>
              {filteredVehicles.map(vehicle => (
                <View key={vehicle.id || vehicle.registration} style={styles.cardItemGutter}>
                  <VehicleCard
                    vehicle={vehicle}
                    onPress={() =>
                      navigation.navigate("VehicleProfile", { vehicle })
                    }
                  />
                </View>
              ))}
            </View>
          )}

        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("AddVehicle")}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}