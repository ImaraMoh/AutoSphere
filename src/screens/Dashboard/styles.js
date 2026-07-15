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

  notificationDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#EF4444"
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

  heroVehicleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    
    // Forces the component to expand across the layout view track
    alignSelf: "stretch", 
    
    // Inserts a fixed, uncompromised safety gutter on left and right sides
    marginHorizontal: 16, 
    marginBottom: 24,
    
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0D1117",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    ...Platform.select({
      web: {
        boxSizing: "border-box"
      }
    })
  },

  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },

  heroMeta: {
    flex: 1,
    gap: 4
  },

  heroBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#F97316",
    letterSpacing: 1
  },

  heroVehicleTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#0D1117"
  },

  heroVehicleSpecs: {
    fontSize: 12,
    color: "#64748B",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined
  },

  heroIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFEDD5"
  },

  heroFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9"
  },

  statusIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#16A34A"
  },

  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#16A34A",
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

  // 2x2 Fixed Static Non-Scroll Grid Platform Blocks
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
    borderRadius: 16,
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
    borderRadius: 10,
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

  // Centered AI Assistant Section
  aiAssistantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E9D5FF",
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#A855F7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 24
  },

  aiLeftMarker: {
    width: 5,
    backgroundColor: "#A855F7"
  },

  aiContentContainer: {
    flex: 1,
    padding: 18,
    gap: 2
  },

  aiTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },

  aiAssistBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#A855F7",
    letterSpacing: 0.5
  },

  aiMainHeading: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "web" ? "Poppins" : undefined,
    color: "#0D1117"
  },

  aiBodyCopy: {
    fontSize: 13,
    color: "#64748B",
    fontFamily: Platform.OS === "web" ? "Plus Jakarta Sans" : undefined,
    lineHeight: 18,
    marginTop: 2
  },

  healthCardWrapper: {
    marginHorizontal: 16,
    marginBottom: 24
  },

  diagnosticLoadingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
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

  // Centered Services & Documents Small 2-Column Grid
  compactActionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    gap: 10
  },

  compactGridButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
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
  },

  elementPressed: {
    opacity: 0.7
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95
  }
});