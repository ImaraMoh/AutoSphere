import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  expenseItemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  expenseTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  expenseIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  expenseInfoBox: {
    flex: 1,
    marginRight: 12,
  },
  expenseItemTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 3,
  },
  expenseCategoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  expenseAmountBox: {
    alignItems: "flex-end",
  },
  expenseAmountText: {
    fontSize: 15,
    fontWeight: "850",
    color: "#0F172A",
  },
});