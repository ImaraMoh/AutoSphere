// NotificationCard.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import {
  Bell,
  ShieldCheck,
  Wrench,
  CreditCard
} from "lucide-react-native";
import styles from "./styles";

export default function NotificationCard({
  item,
  onPress
}) {
  const getIcon = () => {
    if (item.type === "Insurance")
      return <ShieldCheck size={20} color="#F97316" />;

    if (item.type === "Maintenance")
      return <Wrench size={20} color="#F97316" />;

    if (item.type === "Finance")
      return <CreditCard size={20} color="#F97316" />;

    return <Bell size={20} color="#F97316" />;
  };

  const isHighPriority = item.priority?.toLowerCase() === "high";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.7}
    >
      <View style={styles.iconBox}>
        {getIcon()}
      </View>

      <View style={styles.content}>
        <View style={styles.cardTopRow}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          {item.date && (
            <Text style={styles.dateText}>{item.date}</Text>
          )}
        </View>

        <Text style={styles.messageText} numberOfLines={2}>
          {item.message}
        </Text>

        {item.priority && (
          <View style={styles.footerRow}>
            <View style={[styles.priorityBadge, isHighPriority ? styles.priorityHigh : styles.priorityMedium]}>
              <Text style={[styles.priorityText, isHighPriority ? styles.priorityTextHigh : styles.priorityTextMedium]}>
                {item.priority} Priority
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}