import AsyncStorage from "@react-native-async-storage/async-storage";

// Unique storage key for your app's user profile
const PROFILE_KEY = "@user_profile_data_v1";

export async function getProfile() {
  try {
    const jsonValue = await AsyncStorage.getItem(PROFILE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("Error loading profile from storage:", error);
    return null;
  }
}

export async function saveProfile(profileData) {
  try {
    // Ensure data is converted to string format before saving
    const jsonValue = JSON.stringify({
      name: profileData.name || "",
      email: profileData.email || "",
      phone: profileData.phone || "",
      image: profileData.image || null,
    });
    
    await AsyncStorage.setItem(PROFILE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.log("Error saving profile to storage:", error);
    throw error;
  }
}