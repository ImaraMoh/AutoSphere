import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { deleteVehicle } from "../../services/vehicleStorage";
import HealthScore from "../../components/HealthScore";
import styles from "./styles";

export default function VehicleProfile({ route, navigation }) {
  const { vehicle } = route.params;

  const health = {
    score: vehicle.healthScore || 0,
    healthStatus:
      vehicle.healthScore >= 80
        ? "Excellent Condition"
        : vehicle.healthScore >= 60
        ? "Needs Attention"
        : "Critical",
    analysis:
      "AI analyzed your vehicle condition based on mileage, fuel type and maintenance history.",
    maintenancePrediction:
      vehicle.serviceStatus === "Upcoming"
        ? "Service recommended soon"
        : "Vehicle maintenance looks good",
    drivingEfficiency: "Good",
    expenseBehaviour: "Normal",
    recommendations: [
      "Check engine oil regularly",
      "Maintain tire pressure",
      "Keep service records updated"
    ],
    updatedAt: vehicle.createdAt
  };

  const [deleting, setDeleting] = useState(false);

  function editVehicle() {
    navigation.navigate("EditVehicle", { vehicle });
  }

  function removeVehicle() {
    const handleConfirm = () => {
      setDeleting(true);
      deleteVehicle(String(vehicle.id))
        .then(result => {
          setDeleting(false);
          if (result) {
            navigation.reset({
              index: 0,
              routes: [{ name: "Vehicles" }]
            });
          }
        })
        .catch(error => {
          setDeleting(false);
          console.log("DELETE ERROR", error);
        });
    };

    if (Platform.OS === "web") {
      const confirmDelete = window.confirm(`Remove ${vehicle.brand} ${vehicle.model}?`);
      if (confirmDelete) handleConfirm();
    } else {
      Alert.alert(
        "Delete Vehicle",
        `Are you sure you want to remove ${vehicle.brand} ${vehicle.model}?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: handleConfirm }
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Vehicle Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Card */}
        <View style={styles.profileHeroCard}>
          {vehicle.image ? (
            <Image source={{ uri: vehicle.image }} resizeMode="cover" style={styles.profileHeroImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Ionicons name="car-sport" size={54} color="#F97316" />
            </View>
          )}

          <View style={styles.profileTitleBlock}>
            <Text style={styles.profileVehicleName}>
              {vehicle.brand} {vehicle.model}
            </Text>
            <View style={styles.profileBadgePill}>
              <Text style={styles.profileBadgeText}>{vehicle.registration || "No Registration"}</Text>
            </View>
          </View>
        </View>

        {/* Health Score Component Wrapper */}
        <View style={styles.listWrapper}>
          <HealthScore
            score={health.score}
            analysis={health.analysis}
            healthStatus={health.healthStatus}
            maintenancePrediction={health.maintenancePrediction}
            drivingEfficiency={health.drivingEfficiency}
            expenseBehaviour={health.expenseBehaviour}
            recommendations={health.recommendations}
            updatedAt={health.updatedAt}
          />
        </View>

        {/* Vehicle Information */}
        <Text style={styles.sectionHeader}>Vehicle Information</Text>
        <View style={styles.infoGridContainer}>
          <InfoCard icon="car-outline" title="Type" value={vehicle.type} />
          <InfoCard icon="calendar-outline" title="Year" value={vehicle.year} />
          <InfoCard icon="speedometer-outline" title="Mileage" value={`${vehicle.mileage} KM`} />
          <InfoCard icon="water-outline" title="Fuel" value={vehicle.fuel} />
        </View>

        {/* Vehicle Status */}
        <Text style={styles.sectionHeader}>Vehicle Status</Text>
        <View style={styles.statusCard}>
          <StatusRow
            icon="shield-checkmark"
            title="Insurance"
            value={vehicle.insuranceStatus || "Valid"}
            color="#16A34A"
          />
          <View style={styles.loanDivider} />
          <StatusRow
            icon="construct"
            title="Service"
            value={vehicle.serviceStatus || "Upcoming"}
            color="#EAB308"
          />
          <View style={styles.loanDivider} />
          <StatusRow
            icon="document-text"
            title="Documents"
            value="5 Uploaded"
            color="#2563EB"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.profileActionRow}>
          <TouchableOpacity
            style={styles.profileEditBtn}
            onPress={editVehicle}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={18} color="#FFFFFF" />
            <Text style={styles.profileEditBtnText}>Edit Vehicle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileDeleteBtn}
            onPress={removeVehicle}
            activeOpacity={0.8}
            disabled={deleting}
          >
            {deleting ? (
              <ActivityIndicator size="small" color="#DC2626" />
            ) : (
              <Ionicons name="trash-outline" size={18} color="#DC2626" />
            )}
            <Text style={styles.profileDeleteBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <View style={styles.infoCardGridItem}>
      <View style={styles.infoCardIconBox}>
        <Ionicons name={icon} size={18} color="#F97316" />
      </View>
      <Text style={styles.infoCardTitle}>{title}</Text>
      <Text style={styles.infoCardValue} numberOfLines={1}>{value || "-"}</Text>
    </View>
  );
}

function StatusRow({ icon, title, value, color }) {
  return (
    <View style={styles.statusRowContainer}>
      <View style={[styles.statusIconBox, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={styles.statusRowTitle}>{title}</Text>
      <View style={[styles.statusPillBadge, { backgroundColor: `${color}15`, borderColor: `${color}30` }]}>
        <Text style={[styles.statusPillText, { color }]}>{value}</Text>
      </View>
    </View>
  );
}