import { StyleSheet, Platform, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  headerSpacer: {
    width: 36,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110, // Safe buffer ensuring actions row doesn't obstruct components
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Platform.select({
      ios: { shadowColor: "#0F172A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10 },
      android: { elevation: 2 },
    }),
  },
  fileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  headerTextMeta: {
    flex: 1,
    gap: 4,
  },
  docTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  badgeContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeTextBadge: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 12,
  },
  previewBox: {
    width: "100%",
    height: SCREEN_WIDTH * 0.48,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  pdfBox: {
    alignItems: "center",
    gap: 8,
  },
  pdfText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F97316",
  },

  // Key Value Info Grid Row Implementations
  infoRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  infoLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoLabelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  infoValueText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
    textAlign: "right",
  },
  expiryHighlight: {
    color: "#EF4444",
  },

  // Fixed Screen Floor Toolbars
  bottomActionDeck: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
  },
  previewBtn: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FDBA74",
  },
  previewBtnText: {
    color: "#F97316",
    fontSize: 14,
    fontWeight: "600",
  },
  editBtn: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
  },
  editBtnText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteBtn: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FEE2E2",
  },
  deleteBtnText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "600",
  },
  errorCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#64748B",
    fontSize: 16,
  },
});