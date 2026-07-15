import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC" // Strict guideline workspace background
  },

  scrollContent: {
    paddingBottom: 40,
    paddingTop: 8
  },

  // Premium Asymmetrical Service Card Layer Setup
  card: {
    backgroundColor: "#FFFFFF", // Guideline Card Background Spec
    borderRadius: 20,
    padding: 18,
    alignSelf: "stretch",
    marginHorizontal: 16, // Clean uncrushable safety gutters
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0D1117",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    ...Platform.select({
      web: { boxSizing: "border-box" }
    })
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14
  },

  iconIndicatorBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFF7ED", // Brand Orange subtle fill highlight
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5"
  },

  titleText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#0D1117" // Deep Navy Focus Headings
  },

  metaLabelText: {
    fontSize: 13,
    color: "#64748B",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined,
    marginTop: 2
  },

  metaValueText: {
    color: "#334155",
    fontWeight: "600"
  },

  cardDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },

  badgeColumn: {
    gap: 2
  },

  subTextLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.5
  },

  costText: {
    fontSize: 17,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#0D1117"
  },

  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8
  },

  dateText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined
  },

  // Primary Action Button Configuration: Vibrant Orange (#F97316)
  button: {
    backgroundColor: "#F97316",
    borderRadius: 16,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 12,
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

  // Clean Micro Assistant Empty States
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20
  },

  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },

  emptyHeading: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#475569"
  },

  emptySub: {
    fontSize: 13,
    color: "#94A3B8",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined,
    textAlign: "center",
    marginTop: 4
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }]
  }
});