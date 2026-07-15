import AsyncStorage from "@react-native-async-storage/async-storage";

const CLAIMS_KEY = "user_insurance_claims";

export const getClaims = async () => {
  try {
    const data = await AsyncStorage.getItem(CLAIMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error fetching claims:", error);
    return [];
  }
};

export const saveClaim = async (newClaim) => {
  try {
    const existingClaims = await getClaims();
    const updatedClaims = [newClaim, ...existingClaims];
    await AsyncStorage.setItem(CLAIMS_KEY, JSON.stringify(updatedClaims));
    return updatedClaims;
  } catch (error) {
    console.log("Error saving claim:", error);
    throw error;
  }
};