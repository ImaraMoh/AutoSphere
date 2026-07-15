import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },

  topBar: {
    height: 64,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    width: "100%"
  },

  topBarInner: {
    width: "100%",
    maxWidth: 540,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

  logo: {
    width: 35,
    height: 35
  },

  brandName: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#0D1117",
    letterSpacing: -0.3
  },

  notificationIconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0"
  },

  scrollContent: {
    paddingBottom: 40
  },

  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 16
  },

  greetingText: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#0D1117",
    letterSpacing: -0.5
  },

  subText: {
    fontSize: 13,
    color: "#64748B",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined,
    marginTop: 2
  },

  // Premium Hero Card Container
  heroVehicleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    alignSelf: "stretch",
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0D1117",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    overflow: "hidden",
    ...Platform.select({
      web: {
        boxSizing: "border-box"
      }
    })
  },

  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16
  },

  heroMeta: {
    flex: 1,
    gap: 4,
    paddingRight: 12
  },

  heroBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#F97316",
    letterSpacing: 1.2
  },

  heroVehicleTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#0D1117"
  },

  heroVehicleSpecs: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined
  },

  heroIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5"
  },

  // High-End Premium Footer Row
  heroFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    width: "100%"
  },

  statusIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined,
    flex: 1
  },

  // Premium Switch Button Style
  switchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFEDD5",
    gap: 4
  },

  switchButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#F97316",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined
  },

  sectionHeading: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    paddingHorizontal: 16,
    marginBottom: 12
  },

  utilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 24
  },

  utilityGridCard: {
    backgroundColor: "#FFFFFF",
    width: "48.5%",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
    shadowColor: "#0D1117",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1
  },

  utilityIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center"
  },

  utilityCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#0D1117"
  },

  utilityCardDesc: {
    fontSize: 11,
    color: "#64748B",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined,
    marginTop: 1
  },

  healthCardWrapper: {
    marginHorizontal: 16,
    marginBottom: 24
  },

  diagnosticLoadingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginHorizontal: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 24
  },

  loadingCopy: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500"
  },

  compactActionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    gap: 10
  },

  compactGridButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    width: "48.5%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  compactGridButtonText: {
    fontSize: 13,
    fontWeight: "600",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined,
    color: "#0D1117",
    flex: 1
  }
});