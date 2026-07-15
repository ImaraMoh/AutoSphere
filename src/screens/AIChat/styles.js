import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Clean, soft slate background tint
  },
  chatWrapper: {
    flex: 1,
    width: "100%",
  },
  chat: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12, // Native item separation tracking space
  },
  typingContainerWrapper: {
    alignSelf: "flex-start",
    marginLeft: 4,
    marginTop: 4,
    marginBottom: 8,
  },
  actionsWrapper: {
    backgroundColor: "transparent",
    paddingVertical: 4,
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0px -3px 6px rgba(15, 23, 42, 0.04)",
      }
    }),
  },
});