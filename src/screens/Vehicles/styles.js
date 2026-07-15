// styles.js
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 10 : 20,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitleContainer: {
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "850",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  summaryCardHero: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: "850",
    color: "#0F172A",
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryVerticalDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#E2E8F0",
  },
  searchBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    paddingVertical: 0,
  },
  filterScrollWrapper: {
    marginBottom: 20,
  },
  filterRowContainer: {
    gap: 8,
  },
  filterPillButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  activeFilterPillButton: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FED7AA",
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },
  activeFilterPillText: {
    color: "#F97316",
  },
  listWrapper: {
    gap: 16,
  },
  cardItemGutter: {
    width: "100%",
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EA580C",
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});