import AsyncStorage from "@react-native-async-storage/async-storage";

const FINANCE_KEY = "user_vehicle_loan";

export const getLoan = async () => {
  try {
    const data = await AsyncStorage.getItem(FINANCE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Error fetching loan data:", error);
    return null;
  }
};

export const saveLoan = async (loanData) => {
  try {
    await AsyncStorage.setItem(FINANCE_KEY, JSON.stringify(loanData));
  } catch (error) {
    console.log("Error saving loan data:", error);
    throw error;
  }
};