import AsyncStorage from "@react-native-async-storage/async-storage";

const REMINDER_KEY = "AUTOSPHERE_REMINDERS";

// Get all reminders
export async function getReminders() {
  try {
    const data = await AsyncStorage.getItem(REMINDER_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Get Reminder Error:", error);
    return [];
  }
}

// Save reminders
export async function saveReminders(reminders) {
  try {
    await AsyncStorage.setItem(REMINDER_KEY, JSON.stringify(reminders));
    return true;
  } catch (error) {
    console.log("Save Reminder Error:", error);
    return false;
  }
}

// Delete a single reminder by ID
export async function deleteReminder(id) {
  try {
    const reminders = await getReminders();
    // Filter out the item to be deleted
    const updatedReminders = reminders.filter((item) => item.id !== id);
    // Persist changes back to storage
    await saveReminders(updatedReminders);
    return true;
  } catch (error) {
    console.log("Delete Reminder Error:", error);
    return false;
  }
}

// Create expiry reminder from document
export async function createExpiryReminder(document) {
  try {
    const reminders = await getReminders();

    const reminder = {
      id: Date.now().toString(),
      title: `${document.type} Expiry`,
      date: document.expiryDate,
      description: `Your ${document.type} expires soon`,
      status: "Upcoming",
      documentId: document.id,
    };

    await saveReminders([...reminders, reminder]);
    return reminder;
  } catch (error) {
    console.log("Create Reminder Error:", error);
    return null;
  }
}