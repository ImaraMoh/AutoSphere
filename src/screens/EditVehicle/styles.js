import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isDesktop = Platform.OS === "web" && width > 768;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    height: 64,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingTop: Platform.OS === "ios" ? 12 : 0,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.3,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: isDesktop ? 40 : 16,
    paddingTop: 24,
    paddingBottom: 60,
  },

  // --- PC Adaptive Structural Columns Layout ---
  desktopSplitLayout: {
    flexDirection: isDesktop ? "row" : "column",
    gap: isDesktop ? 40 : 0,
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
  },
  leftMediaPanel: {
    width: isDesktop ? "35%" : "100%",
    alignItems: "center",
  },
  rightFormPanel: {
    width: isDesktop ? "65%" : "100%",
    marginTop: isDesktop ? 0 : 24,
  },

  // --- Hero Image Upload Card Style ---
  imageBox: {
    width: "100%",
    height: isDesktop ? 260 : 200,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  cameraIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  imagePlaceholderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },

  sectionHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 20,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // --- Fluid Flexible Form Grid ---
  formGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
  },
  gridColumnFull: {
    width: "100%",
  },
  gridColumnHalf: {
    width: isDesktop ? "48.5%" : "100%", // Becomes side-by-side grids strictly on PC monitors
    marginBottom: isDesktop ? 0 : 2,
  },

  // --- Modern Styled Input Fields ---
  inputContainer: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 6,
  },
  inputField: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    color: "#0F172A",
  },

  // --- Segmented Selector Design System ---
  fieldGroupLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginTop: 24,
    marginBottom: 8,
  },
  selectorContainer: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 12,
    padding: 4,
    width: "100%",
    justifyContent: "space-between",
    gap: 4,
  },
  optionBadge: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },
  optionBadgeSelected: {
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  optionTextSelected: {
    color: "#F97316",
  },

  // --- Action Layout Blocks ---
  actionButtonArea: {
    marginTop: 40,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#F97316",
    width: "100%",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 2,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  deleteButton: {
    flexDirection: "row",
    width: "100%",
    height: 48, 
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FEE2E2",
    backgroundColor: "#FFF5F5",
    gap: 6,
  },
  deleteText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },
});