import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "insurance";

export const saveInsurance = async (data) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch (error) {
    console.log("Error saving insurance policy:", error);
  }
};

export const getInsurance = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Error fetching insurance policy:", error);
    return null;
  }
};