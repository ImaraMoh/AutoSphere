import React, { useMemo } from "react";
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import VehicleHealthBadge from "../VehicleHealthBadge";
import { calculateVehicleHealth } from "../../services/vehicleHealthService";

export default function VehicleCard({ vehicle, onPress }) {
  const health = useMemo(() => {
    return calculateVehicleHealth(vehicle);
  }, [vehicle]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        {vehicle.image ? (
          <Image
            source={{ uri: vehicle.image }}
            style={styles.vehicleImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="car-sport" size={54} color="#F97316" />
          </View>
        )}
        <View style={styles.badgeOverlay}>
          <VehicleHealthBadge score={health.score} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName} numberOfLines={1}>
              {vehicle.brand} {vehicle.model}
            </Text>
            <View style={styles.registrationPill}>
              <Text style={styles.registrationText}>
                {vehicle.registration || "No Registration"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.details}>
          <Detail icon="speedometer-outline" label="Mileage" value={`${vehicle.mileage} KM`} />
          <View style={styles.detailDivider} />
          <Detail icon="water-outline" label="Fuel" value={vehicle.fuel} />
          <View style={styles.detailDivider} />
          <Detail icon="calendar-outline" label="Year" value={vehicle.year} />
        </View>

        <View style={styles.aiBox}>
          <Ionicons name="sparkles" size={16} color="#F97316" />
          <Text style={styles.aiText} numberOfLines={1}>
            AI Health: <Text style={styles.aiSubText}>{health.healthStatus}</Text>
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.insurance}>
            <View style={styles.insuranceIconBox}>
              <Ionicons name="shield-checkmark" size={14} color="#16A34A" />
            </View>
            <Text style={styles.insuranceText} numberOfLines={1}>
              {vehicle.insuranceStatus || "Insurance Valid"}
            </Text>
          </View>

          <View style={styles.chevronBox}>
            <Ionicons name="chevron-forward" size={16} color="#64748B" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Detail({ icon, label, value }) {
  return (
    <View style={styles.detail}>
      <Ionicons name={icon} size={15} color="#F97316" style={{ marginBottom: 4 }} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={1}>{value || "-"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 14,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
    backgroundColor: "#F1F5F9",
  },
  vehicleImage: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeOverlay: {
    position: "absolute",
    top: 14,
    right: 14,
  },
  content: {
    padding: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "850",
    color: "#0F172A",
    marginBottom: 6,
  },
  registrationPill: {
    alignSelf: "flex-start",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  registrationText: {
    fontSize: 11,
    fontWeight: "750",
    color: "#475569",
    letterSpacing: 0.3,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 14,
  },
  detail: {
    alignItems: "center",
    flex: 1,
  },
  detailDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#E2E8F0",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: "850",
    color: "#0F172A",
  },
  aiBox: {
    backgroundColor: "#FFF7ED",
    padding: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FED7AA",
    marginBottom: 14,
    gap: 8,
  },
  aiText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#C2410C",
  },
  aiSubText: {
    fontWeight: "850",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  insurance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  insuranceIconBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  insuranceText: {
    color: "#16A34A",
    fontWeight: "750",
    fontSize: 13,
  },
  chevronBox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
});