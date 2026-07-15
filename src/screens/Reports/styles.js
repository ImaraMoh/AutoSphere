import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "850",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 14,
    marginTop: 8,
  },

  // Loading Card Styles
  loadingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  loadingIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  loadingTitle: {
    fontSize: 16,
    fontWeight: "850",
    color: "#0F172A",
    marginBottom: 4,
  },
  loadingSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
  },

  // Chart Card Styles
  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 14,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  chartHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "850",
    color: "#0F172A",
  },
  chartWrapperInner: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  chartAxisLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },

  // Pie Chart Styles
  pieContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  pieCenterBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0F172A",
  },
  centerText: {
    fontSize: 10,
    fontWeight: "750",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  // Legend Styles
  legendContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 16,
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 4,
    marginRight: 12,
  },
  legendText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    fontSize: 13,
    fontWeight: "750",
    color: "#0F172A",
  },
  amount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
  percentageDot: {
    color: "#94A3B8",
    fontWeight: "900",
  },
});