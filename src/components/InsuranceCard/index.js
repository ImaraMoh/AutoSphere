import React from "react";
import { View, Text } from "react-native";
import { ShieldCheck, Calendar, Car } from "lucide-react-native";

export default function InsuranceCard({ data }) {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 22,
        marginTop: 20,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 4,
        borderWidth: 1,
        borderColor: "#F1F5F9",
      }}
    >
      {/* Header: Provider & Active Badge */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#F8FAFC",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#FFF7ED",
              padding: 12,
              borderRadius: 16,
            }}
          >
            <ShieldCheck size={26} color="#F97316" />
          </View>
          <View style={{ marginLeft: 14 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#0F172A",
                letterSpacing: -0.2,
              }}
            >
              {data.provider}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                marginTop: 2,
              }}
            >
              Insurance Policy
            </Text>
          </View>
        </View>

        {/* Premium Active Status Pill */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#DCFCE7",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: "#16A34A",
              marginRight: 6,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: "#166534",
            }}
          >
            Active
          </Text>
        </View>
      </View>

      {/* Details Box */}
      <View
        style={{
          backgroundColor: "#F8FAFC",
          borderRadius: 16,
          padding: 14,
        }}
      >
        {/* Vehicle */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOpacity: 0.03,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            <Car size={16} color="#475569" />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 11, color: "#64748B", fontWeight: "500" }}>
              Covered Vehicle
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#334155",
                marginTop: 1,
              }}
            >
              {data.vehicle}
            </Text>
          </View>
        </View>

        {/* Expiry Date */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOpacity: 0.03,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            <Calendar size={16} color="#475569" />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 11, color: "#64748B", fontWeight: "500" }}>
              Policy Expiry
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#334155",
                marginTop: 1,
              }}
            >
              {data.expiryDate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}