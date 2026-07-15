import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmptyVehicleState({ onPress }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 70,
        paddingHorizontal: 24,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        margin: 20,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 3,
      }}
    >
      {/* Icon Container with Soft Glow */}
      <View
        style={{
          width: 88,
          height: 88,
          borderRadius: 44,
          backgroundColor: "#FFF7ED",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          borderWidth: 8,
          borderColor: "#FFEDD5",
        }}
      >
        <Ionicons name="car-sport-outline" size={38} color="#F97316" />
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          color: "#0F172A",
          letterSpacing: -0.3,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        No Vehicles Found
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          textAlign: "center",
          color: "#64748B",
          fontSize: 14,
          lineHeight: 20,
          maxWidth: 280,
          marginBottom: 24,
        }}
      >
        Start building your digital garage by adding your first vehicle to track maintenance, fuel, and expenses.
      </Text>

      {/* Primary Action Button */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F97316",
          paddingHorizontal: 22,
          paddingVertical: 14,
          borderRadius: 16,
          shadowColor: "#F97316",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 4,
        }}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={18} color="white" style={{ marginRight: 6 }} />
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "700",
            letterSpacing: 0.2,
          }}
        >
          Add Vehicle
        </Text>
      </TouchableOpacity>
    </View>
  );
}