// styles.js (Add these styles to your NotificationCard styles file or inline)
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    flex: 1,
    marginRight: 8,
  },
  dateText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
  },
  messageText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    lineHeight: 18,
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  priorityHigh: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FEE2E2",
  },
  priorityMedium: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FEF3C7",
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  priorityTextHigh: {
    color: "#EF4444",
  },
  priorityTextMedium: {
    color: "#D97706",
  },
});