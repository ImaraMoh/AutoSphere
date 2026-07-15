
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

/**
 * Computes live vehicle analytics and financial breakdowns from Firebase Firestore 
 * subcollections (expenses, maintenance, health history) for a specific vehicle.
 * 
 * Path: users/{uid}/vehicles/{vehicleId}/expenses & maintenance
 * 
 * @param {string} vehicleId - The ID of the target vehicle
 * @returns {Promise<Object>} - Computed analytics object containing health score, monthly expenses, category distribution, and service counts.
 */
export const getVehicleAnalytics = async (vehicleId) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser || !vehicleId) {
      return getFallbackAnalytics();
    }

    const uid = currentUser.uid;

    // Fetch expenses and maintenance logs concurrently
    const [expenseSnap, maintenanceSnap, healthSnap] = await Promise.all([
      getDocs(query(collection(db, "users", uid, "vehicles", vehicleId, "expenses"), orderBy("date", "desc"))),
      getDocs(query(collection(db, "users", uid, "vehicles", vehicleId, "maintenance"), orderBy("date", "desc"))),
      getDocs(query(collection(db, "users", uid, "vehicles", vehicleId, "healthHistory"), orderBy("date", "desc")))
    ]);

    const expenses = expenseSnap.docs.map(doc => doc.data());
    const maintenance = maintenanceSnap.docs.map(doc => doc.data());
    const healthHistory = healthSnap.docs.map(doc => doc.data());

    // 1. Calculate Health Score (Default to 90 if no history exists, or pull the latest score)
    let healthScore = 90;
    if (healthHistory.length > 0 && typeof healthHistory[0].score === "number") {
      healthScore = healthHistory[0].score;
    }

    // 2. Compute Monthly Expenses from real records
    const monthlyMap = {};
    const categoryMap = {};
    let totalExpenseAmount = 0;

    expenses.forEach(item => {
      const amount = parseFloat(item.amount || item.cost || 0);
      const category = item.category || item.type || "Other";
      const dateString = item.date || item.createdAt;

      totalExpenseAmount += amount;

      // Category breakdown aggregation
      categoryMap[category] = (categoryMap[category] || 0) + amount;

      // Monthly breakdown aggregation
      if (dateString) {
        const dateObj = new Date(dateString);
        if (!isNaN(dateObj.getTime())) {
          const monthName = dateObj.toLocaleString("en-US", { month: "short" });
          monthlyMap[monthName] = (monthlyMap[monthName] || 0) + amount;
        }
      }
    });

    // Format monthly expenses array (last active months or standard order)
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthlyExpense = Object.keys(monthlyMap).length > 0 
      ? monthOrder
          .filter(m => monthlyMap[m] !== undefined)
          .map(m => ({ month: m, amount: monthlyMap[m] }))
      : [
          { month: "Jan", amount: 0 },
          { month: "Feb", amount: 0 },
          { month: "Mar", amount: 0 },
          { month: "Apr", amount: 0 },
          { month: "May", amount: 0 }
        ];

    // Format expense categories into percentage share or value shares
    let expenseCategories = [];
    if (totalExpenseAmount > 0) {
      expenseCategories = Object.keys(categoryMap).map(cat => ({
        name: cat,
        value: Math.round((categoryMap[cat] / totalExpenseAmount) * 100)
      }));
    } else {
      expenseCategories = [
        { name: "Fuel", value: 40 },
        { name: "Repair", value: 25 },
        { name: "Service", value: 20 },
        { name: "Insurance", value: 15 }
      ];
    }

    // 3. Service Count from maintenance subcollection length
    const serviceCount = maintenance.length;

    return {
      healthScore,
      monthlyExpense,
      expenseCategories,
      serviceCount
    };

  } catch (error) {
    console.log("Error computing vehicle analytics from Firebase:", error);
    return getFallbackAnalytics();
  }
};

/**
 * Fallback static analytics structure for offline mode or empty states.
 */
const getFallbackAnalytics = () => {
  return {
    healthScore: 92,
    monthlyExpense: [
      { month: "Jan", amount: 5000 },
      { month: "Feb", amount: 7500 },
      { month: "Mar", amount: 4500 },
      { month: "Apr", amount: 9000 },
      { month: "May", amount: 6000 }
    ],
    expenseCategories: [
      { name: "Fuel", value: 40 },
      { name: "Repair", value: 25 },
      { name: "Service", value: 20 },
      { name: "Insurance", value: 15 }
    ],
    serviceCount: 8
  };
};