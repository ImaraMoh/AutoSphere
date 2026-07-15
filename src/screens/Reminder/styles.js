import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },

  scrollContent: {
    paddingBottom: 40,
    paddingTop: 8
  },

  // Layout isolation wrapper ensuring equal, balanced edge gaps on all resolutions
  cardGutter: {
    width: "100%",
    paddingHorizontal: 16,
    ...Platform.select({
      web: { boxSizing: "border-box" }
    })
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0D1117",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },

  iconCircleWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center"
  },

  cardMetaContainer: {
    flex: 1,
    gap: 2
  },

  titleText: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#0D1117"
  },

  typeText: {
    fontSize: 12,
    color: "#64748B",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined
  },

  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center"
  },

  dividerLine: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  dueFrame: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },

  dueLabel: {
    fontSize: 12,
    color: "#64748B",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined
  },

  dueValue: {
    fontWeight: "600",
    color: "#334155"
  },

  // Guideline Alignment: Yellow Status Indicators for Upcoming Reminders
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FEFCE8", // Yellow branding token container
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FEF08A"
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EAB308" // Guideline core alert color text matrix
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#A16207"
  },

  // Primary Action Button Settings
  button: {
    backgroundColor: "#F97316",
    borderRadius: 16,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 10,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#FFFFFF"
  },

  // Fallback Empty State Screens Layout
  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 36,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0"
  },

  emptyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },

  emptyText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#475569",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined
  },

  emptySubText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 4,
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined
  },

  elementPressed: {
    opacity: 0.6
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }]
  }
});