import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC"
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    width: "100%",
    alignSelf: "center",
  },

  form: {
    paddingTop: 10,
    gap: 20, // Modern gap strategy instead of shifting single margins
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginLeft: 2,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    fontSize: 15,
    color: "#0F172A",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },

  /* DATE PICKER SELECTOR BAR */
  dateSelector: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },

  /* INTERMEDIARY SUBMIT BUTTONS */
  button: {
    backgroundColor: "#F97316",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },

  /* RESPONSIVE DESIGN CALENDAR STRUCTURAL BLOCK STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "flex-end", 
  },

  modalOverlayLarge: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 44 : 32,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },

  modalContentLarge: {
    width: 400,
    borderRadius: 24,
    paddingVertical: 24,
    paddingBottom: 24,
    shadowOffset: { width: 0, height: 8 },
  },

  pullIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginBottom: 16,
  },

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  calendarHeaderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  navBtn: {
    height: 38,
    width: 38,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  daysHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 4,
  },

  dayOfWeekText: {
    width: "13%",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },

  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 4,
  },

  calendarDay: {
    width: "13%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 99,
  },

  calendarDaySelected: {
    backgroundColor: "#F97316",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },

  calendarDayEmpty: {
    width: "13%",
    aspectRatio: 1,
    marginVertical: 4,
  },

  calendarDayText: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "600",
  },

  calendarDayTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  closeBtn: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  closeBtnText: {
    color: "#475569",
    fontSize: 15,
    fontWeight: "600",
  }
});