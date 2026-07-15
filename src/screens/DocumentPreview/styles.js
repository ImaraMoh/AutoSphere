import { StyleSheet, Platform } from "react-native";

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
    alignItems: "center",
    paddingVertical: 24,
    paddingBottom: 110,
  },
  pdfCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Platform.select({
      ios: { shadowColor: "#0F172A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12 },
      android: { elevation: 3 },
    }),
  },
  brandCenter: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 8,
  },
  brandLogoAsset: {
    width: 64,
    height: 64,
  },
  company: {
    fontSize: 18,
    fontWeight: "800",
    color: "#F97316",
    letterSpacing: -0.4,
  },
  heading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 12,
  },
  line: {
    height: 2,
    backgroundColor: "#FFF7ED",
    width: "100%",
    marginBottom: 20,
  },
  metaDataBlock: {
    width: "100%",
    marginBottom: 24,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  value: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  validText: {
    color: "#059669",
  },
  expiredText: {
    color: "#DC2626",
  },
  previewSectionHeader: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  filePreview: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pdfFallbackContainer: {
    alignItems: "center",
    gap: 8,
  },
  pdfText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F97316",
  },
  bottomActionDeck: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  download: {
    flexDirection: "row",
    backgroundColor: "#F97316",
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    ...Platform.select({
      ios: { shadowColor: "#F97316", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6 },
      android: { elevation: 3 },
    }),
  },
  downloadDisabled: {
    backgroundColor: "#FDBA74",
  },
  downloadText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});