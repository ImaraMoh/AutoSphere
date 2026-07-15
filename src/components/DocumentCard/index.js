import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FileText, Trash2, Calendar } from "lucide-react-native";

export default function DocumentCard({ item, onPress, onDelete }) {
  const hasExpiry = Boolean(item.expiryDate);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
      }}
    >
      {/* Icon Container with Soft Background */}
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          backgroundColor: "#FFF7ED",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#FFEDD5",
        }}
      >
        <FileText size={22} color="#F97316" />
      </View>

      {/* Content Details */}
      <View style={{ flex: 1, marginLeft: 14, marginRight: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: "#0F172A",
            letterSpacing: -0.2,
            marginBottom: 2,
          }}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: "#F97316",
            textTransform: "uppercase",
            letterSpacing: 0.4,
            marginBottom: 6,
          }}
        >
          {item.type || "Document"}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Calendar size={13} color="#64748B" style={{ marginRight: 4 }} />
          <Text
            style={{
              fontSize: 13,
              color: "#64748B",
              fontWeight: "500",
            }}
          >
            Expiry: <Text style={{ color: "#334155", fontWeight: "600" }}>{item.expiryDate || "No expiry"}</Text>
          </Text>
        </View>
      </View>

      {/* Delete Trigger Action */}
      <TouchableOpacity
        onPress={onDelete}
        activeOpacity={0.7}
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          backgroundColor: "#FEF2F2",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#FEE2E2",
        }}
      >
        <Trash2 size={16} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}