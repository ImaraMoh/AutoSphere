import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
// Perfect layout size mapping for standard two-column balance grid spacing
const COLUMN_WIDTH = (width - 48) / 2; 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Clean, high-end modern off-white background
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 110, // Leaving space so absolute bottom tab components never hide text
    paddingTop: 8,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  brandName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.3,
  },
  // --- Professional Top Bar Layout Style ---
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Fixed from "between" to instantly push button to the right edge
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingTop: Platform.OS === "ios" ? 12 : 0, 
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  
  notificationIconButton: {
    position: "relative",
    width: 40,
    height: 40,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#EF4444",
  },

  // --- Header / Greeting Content Structure ---
  header: {
    marginVertical: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },

  // --- Vehicle Details Card Interior ---
  vehicleHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 4,
  },
  carIcon: {
    width: 64,
    height: 64,
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  vehicle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  info: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 16,
  },
  healthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    color: "#94A3B8",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  good: {
    fontSize: 15,
    fontWeight: "600",
    color: "#16A34A",
    marginTop: 2,
  },

  // --- Layout Headers / Sections ---
  section: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 24,
    marginBottom: 12,
    letterSpacing: -0.2,
  },

  // --- Loading / Processing Element Styles ---
  loading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 10,
  },
  loadingText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  
// --- Balanced, Highly Responsive Grid Layout ---
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", // Left-aligns grid rows gracefully
    gap: 12,                      // Native fluid uniform gap control
    width: "100%",
  },
  action: {
    // Calculates a perfect 2-column layout width dynamically by subtractive gap share
    width: "48.2%", 
    flexGrow: 1,      // Dynamically fills uneven edge constraints smoothly
    minWidth: 140,    // Guarantees text won't clip or overlap on small display sizes
    marginBottom: 4,
  },
  actionBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    height: 96, // Keeps uniform height across all dynamic width variations
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginTop: 8,
    textAlign: "center",
  },

  // --- Premium AI Interactive Shell Styling ---
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 4,
  },
  aiIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#EEF2F6",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 22,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  aiText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
    maxWidth: width * 0.65,
  },
});