import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 15 : 10,
    marginBottom: 10
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A"
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    width: "100%",
    alignSelf: "center"
  },

  scrollContainerLarge: {
    maxWidth: 580
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },

  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A"
  },

  subheading: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    marginBottom: 24,
    lineHeight: 20
  },

  formGroup: {
    gap: 16
  },

  inputContainer: {
    flexDirection: "column",
    gap: 6
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginLeft: 2
  },

  passwordInputWrapper: {
    height: 52,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    overflow: "hidden"
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: "#0F172A",
    ...Platform.select({
      web: {
        outlineStyle: "none"
      }
    })
  },

  visibilityToggle: {
    height: "100%",
    justifyContent: "center",
    paddingLeft: 10
  },

  button: {
    height: 54,
    backgroundColor: "#F97316",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  }
});