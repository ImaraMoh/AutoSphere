import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // Deep modern slate background
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  contentWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoOuterGlow: {
    width: 116,
    height: 116,
    borderRadius: 36,
    backgroundColor: "rgba(249, 115, 22, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(249, 115, 22, 0.2)",
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.35,
        shadowRadius: 18,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 28, // Smooth rounded curve corners
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#FFEDD5",
  },
  logoImage: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  appName: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94A3B8",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
});