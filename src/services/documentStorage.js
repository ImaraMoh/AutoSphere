import AsyncStorage from "@react-native-async-storage/async-storage";

const DOCUMENT_KEY = "documents";

export const saveDocuments = async (documents) => {
  try {
    await AsyncStorage.setItem(
      DOCUMENT_KEY,
      JSON.stringify(documents)
    );
  } catch (error) {
    console.log("Save document error:", error);
  }
};

export const getDocuments = async () => {
  try {
    const data = await AsyncStorage.getItem(DOCUMENT_KEY);

    if (data) {
      return JSON.parse(data);
    }

    return [];
  } catch (error) {
    console.log("Get document error:", error);
    return [];
  }
};