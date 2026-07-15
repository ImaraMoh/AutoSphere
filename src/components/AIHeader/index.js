import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { Sparkles, Trash2 } from "lucide-react-native";
import { saveChat } from "../../services/chatStorage";

export default function AIHeader({ onChatCleared }) {
  
  const handleClearChat = () => {
    const executeClear = async () => {
      const defaultGreeting = [
        {
          id: 1,
          sender: "ai",
          text: "Hello 👋 I am AutoSphere AI. Ask me about your vehicle.",
        },
      ];
      await saveChat(defaultGreeting);
      if (onChatCleared) {
        onChatCleared(defaultGreeting);
      }
    };
  };

  return (
    <View style={styles.container}>
      {/* Profile/Avatar Indicator Cluster */}
      <View style={styles.profileCluster}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>🤖</Text>
          {/* Pulsing Core Spark Indicator Dot */}
          <View style={styles.activeIndicator}>
            <Sparkles size={10} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.textMeta}>
          <Text style={styles.title} numberOfLines={1}>
            AutoSphere AI
          </Text>
          <View style={styles.statusRow}>
            <View style={styles.greenPulseDot} />
            <Text style={styles.sub} numberOfLines={1}>
              Vehicle Systems Online
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#0F172A", // Rich deep midnight slate theme
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  profileCluster: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F97316", // Primary AutoSphere Orange brand color
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    position: "relative",
  },
  avatarEmoji: {
    fontSize: 22,
    ...Platform.select({
      android: { marginTop: -2 }, // Fixes vertical font offsets on Android
    }),
  },
  activeIndicator: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#22C55E", // Active status green fill
    borderRadius: 10,
    padding: 3,
    borderWidth: 2,
    borderColor: "#0F172A",
  },
  textMeta: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  greenPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
    marginRight: 6,
  },
  sub: {
    color: "#94A3B8", // High-contrast clean text visibility reading tone
    fontSize: 12,
    fontWeight: "500",
  },
  actionButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
  },
});