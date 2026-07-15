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
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  title: {
    fontSize: 18,
    fontWeight: "850",
    color: "#0F172A",
  },
  headerSpacer: {
    width: 40,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
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
  lastUpdated: {
    fontSize: 12,
    fontWeight: "700",
    color: "#F97316",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 16,
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    lineHeight: 20,
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