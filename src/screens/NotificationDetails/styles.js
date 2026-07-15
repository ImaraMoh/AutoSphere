// styles.js
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 10 : 20,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "850",
    color: "#0F172A",
  },
  headerSpacer: {
    width: 36,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 24,
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
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    alignItems: "center",
    justifyContent: "center",
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
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
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  priorityTextHigh: {
    color: "#EF4444",
  },
  priorityTextMedium: {
    color: "#D97706",
  },
  heading: {
    fontSize: 20,
    fontWeight: "850",
    color: "#0F172A",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 24,
  },
  metaContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 16,
    gap: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  metaValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
  },
  copyrightText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
    marginTop: 8,
    marginBottom: 20,
  },
});