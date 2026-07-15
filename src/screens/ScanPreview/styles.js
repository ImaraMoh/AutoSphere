import { StyleSheet, Platform, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Brand soft layout gray background canvas
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
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  imagePreviewContainer: {
    width: "100%",
    height: SCREEN_WIDTH * 0.65, // Enforces an ideal aspect ratio for standard landscape documents
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#F97316", // Primary Brand Accent Orange
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonDisabled: {
    backgroundColor: "#FDBA74", // Soft, muted state representation color
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    width: "100%",
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    minHeight: 120,
  },
  resultBodyText: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 22,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", // Makes tabular serial data clean to inspect
  },
});