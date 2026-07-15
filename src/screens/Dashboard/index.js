// Dashboard.js
import React, { 
  useEffect, 
  useState 
} from "react";

import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
  SafeAreaView,
  useWindowDimensions,
  Modal,
  FlatList
} from "react-native";

import {
  Ionicons
} from "@expo/vector-icons";

import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  limit,
  orderBy,
  onSnapshot,
  where
} from "firebase/firestore";

import {
  auth,
  db
} from "../../firebase/firebaseConfig";

import VehicleHealthCard from "../../components/VehicleHealthCard";
import { analyzeVehicleHealth } from "../../services/aiHealthService";
import styles from "./styles";

export default function Dashboard({ navigation }) {
  const [health, setHealth] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);

  const [userData, setUserData] = useState(null);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [primaryVehicle, setPrimaryVehicle] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Modal State for Vehicle Switcher
  const [isVehicleModalVisible, setIsVehicleModalVisible] = useState(false);

  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    loadData();
  }, []);

  // Live listener for unread notifications count
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const notificationsRef = collection(db, "users", currentUser.uid, "notifications");
    const q = query(notificationsRef, where("read", "==", false));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadCount(snapshot.size);
    }, (error) => {
      console.log("Unread count listener error:", error);
    });

    return () => unsubscribe();
  }, []);

  // Load Firebase User + All Vehicles
  async function loadData() {
    try {
      setLoadingData(true);

      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.log("No authenticated user");
        return;
      }

      const uid = currentUser.uid;

      // ==========================
      // USER PROFILE
      // ==========================
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }

      // ==========================
      // VEHICLES
      // ==========================
      const vehicleQuery = query(
        collection(db, "users", uid, "vehicles")
      );

      const vehicleSnap = await getDocs(vehicleQuery);

      if (!vehicleSnap.empty) {
        const allVehicles = vehicleSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setVehiclesList(allVehicles);
        setPrimaryVehicle(allVehicles[0]);
      }

    } catch (error) {
      console.log("Dashboard Firebase Error:", error);
    } finally {
      setLoadingData(false);
    }
  }

  // AI Health with Real Maintenance & Expense Subcollections
  useEffect(() => {
    if (primaryVehicle) {
      loadHealthAndHistory();
    }
  }, [primaryVehicle]);

  async function loadHealthAndHistory() {
    try {
      setLoadingHealth(true);
      const uid = auth.currentUser?.uid;
      const vehicleId = primaryVehicle.id;

      if (!uid || !vehicleId) return;

      const maintenanceQuery = query(
        collection(db, "users", uid, "vehicles", vehicleId, "maintenance"),
        orderBy("date", "desc"),
        limit(10)
      );
      const maintenanceSnap = await getDocs(maintenanceQuery);
      const maintenanceData = maintenanceSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const expenseQuery = query(
        collection(db, "users", uid, "vehicles", vehicleId, "expenses"),
        orderBy("date", "desc"),
        limit(10)
      );
      const expenseSnap = await getDocs(expenseQuery);
      const expenseData = expenseSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const result = await analyzeVehicleHealth({
        vehicle: primaryVehicle,
        maintenance: maintenanceData,
        expenses: expenseData
      });

      setHealth(result);

    } catch (error) {
      console.log("AI Health Error:", error);
    } finally {
      setLoadingHealth(false);
    }
  }

  const coreUtilities = [
    { icon: "construct", title: "Maintenance", desc: "Logs & Schedule", route: "Maintenance" },
    { icon: "wallet", title: "Expenses", desc: "Track cashflows", route: "Expenses" },
    { icon: "notifications", title: "Reminders", desc: "Service alerts", route: "Reminder" },
    { icon: "scan", title: "OCR Scanner", desc: "Scan docs", route: "OCRScanner" }
  ];

  const servicesDocuments = [
    { icon: "analytics", title: "Reports", route: "Reports" },
    { icon: "shield", title: "Insurance", route: "Insurance" },
    { icon: "card", title: "Finance", route: "Finance" },
    { icon: "car-sport", title: "Driving School", route: "DrivingSchool" }
  ];

  const centerContainerStyle = windowWidth > 600 ? {
    maxWidth: 540,
    alignSelf: "center",
    width: "100%"
  } : {};

  const displayName = userData?.fullName 
    ? userData.fullName.split(" ")[0] 
    : "Garage Member";

  const vehicleMake = primaryVehicle?.brand || "No Vehicle";
  const vehicleModel = primaryVehicle?.model || "";
  const vehicleYear = primaryVehicle?.year || "";
  const vehiclePlate = primaryVehicle?.registration || "";
  const vehicleImage = primaryVehicle?.imageUrl || primaryVehicle?.photo || primaryVehicle?.image || null;

  const getSystemStatusText = () => {
    if (!health) return "System Status: Checking...";
    if (health.score >= 80) return "System Status: Excellent Condition";
    if (health.score >= 50) return "System Status: Attention Recommended";
    return "System Status: Action Required";
  };

  const getStatusColor = () => {
    if (!health) return "#16A34A";
    if (health.score >= 80) return "#16A34A";
    if (health.score >= 50) return "#EAB308";
    return "#DC2626";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.topBarInner}>
          <View style={styles.brandContainer}>
            <Image
              source={require("../../../assets/logo/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandName}>AutoSphere</Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("Notifications", { vehicleId: primaryVehicle?.id })}
            style={styles.notificationIconButton}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#0D1117"
            />
            {unreadCount > 0 && (
              <View style={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "#EF4444",
                borderRadius: 8,
                minWidth: 16,
                height: 16,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 3
              }}>
                <Text style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "bold" }}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={centerContainerStyle}>
          
          <View style={styles.headerContainer}>
            <Text style={styles.greetingText}>
              Hello {displayName} 👋
            </Text>
            <Text style={styles.subText}>
              Your smart digital vehicle assistant
            </Text>
          </View>

          {/* Interactive Hero Vehicle Card */}
          <Pressable 
            style={styles.heroVehicleCard}
            onPress={() => primaryVehicle && navigation.navigate("VehicleDetails", { vehicle: primaryVehicle })}
          >
            <View style={styles.heroRow}>
              <View style={styles.heroMeta}>
                <Text style={styles.heroBadge}>
                  PRIMARY VEHICLE
                </Text>

                <Text style={styles.heroVehicleTitle}>
                  {vehicleMake} {vehicleModel} {vehicleYear}
                </Text>
                <Text style={styles.heroVehicleSpecs}>
                  {vehiclePlate || "No Registration"}
                </Text>
              </View>

              <View style={styles.heroIconWrapper}>
                {vehicleImage ? (
                  <Image 
                    source={{ uri: vehicleImage }} 
                    style={{ width: 44, height: 44, borderRadius: 10 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons
                    name="car-sport"
                    size={32}
                    color="#F97316"
                  />
                )}
              </View>
            </View>

            <View style={styles.heroFooter}>
              <View style={styles.statusIndicatorContainer}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
                <Text style={styles.statusText}>
                  {getSystemStatusText()}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={getStatusColor()}
                  style={{ marginRight: vehiclesList.length > 1 ? 8 : 0 }}
                />

                {vehiclesList.length > 1 && (
                  <Pressable 
                    onPress={(e) => {
                      e.stopPropagation();
                      setIsVehicleModalVisible(true);
                    }}
                    style={{ 
                      flexDirection: "row", 
                      alignItems: "center", 
                      backgroundColor: "rgba(249, 115, 22, 0.12)", 
                      paddingHorizontal: 8, 
                      paddingVertical: 4, 
                      borderRadius: 12 
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: "600", color: "#F97316", marginRight: 2 }}>Switch</Text>
                    <Ionicons name="swap-horizontal" size={12} color="#F97316" />
                  </Pressable>
                )}
              </View>

            </View>
          </Pressable>

          <Text style={styles.sectionHeading}>
            Core Utilities
          </Text>

          <View style={styles.utilitiesGrid}>
            {coreUtilities.map((action, index) => (
              <Pressable
                key={index}
                onPress={() => navigation.navigate(action.route, { vehicle: primaryVehicle, vehicleId: primaryVehicle?.id })}
                style={styles.utilityGridCard}
              >
                <View style={styles.utilityIconBox}>
                  <Ionicons
                    name={action.icon}
                    size={22}
                    color="#F97316"
                  />
                </View>

                <View>
                  <Text style={styles.utilityCardTitle}>
                    {action.title}
                  </Text>
                  <Text style={styles.utilityCardDesc}>
                    {action.desc}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          <Text style={styles.sectionHeading}>
            Intelligent Diagnosis
          </Text>

          {loadingHealth ? (
            <View style={styles.diagnosticLoadingCard}>
              <ActivityIndicator color="#A855F7" />
              <Text style={styles.loadingCopy}>
                Processing AI analysis...
              </Text>
            </View>
          ) : (
            health && (
              <View style={styles.healthCardWrapper}>
                <VehicleHealthCard
                  score={health.score}
                  analysis={health.analysis}
                  vehicle={primaryVehicle}
                />
              </View>
            )
          )}

          <Text style={styles.sectionHeading}>
            Services & Documents
          </Text>

          <View style={styles.compactActionGrid}>
            {servicesDocuments.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => navigation.navigate(item.route, { vehicle: primaryVehicle, vehicleId: primaryVehicle?.id })}
                style={styles.compactGridButton}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color="#F97316"
                />
                <Text style={styles.compactGridButtonText}>
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* Vehicle Switcher Selection Modal */}
      <Modal
        visible={isVehicleModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVehicleModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={{ backgroundColor: "#FFFFFF", width: "100%", maxWidth: 400, borderRadius: 16, padding: 20, maxHeight: "80%" }}>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#0D1117" }}>Select Vehicle</Text>
              <Pressable onPress={() => setIsVehicleModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </Pressable>
            </View>

            <FlatList
              data={vehiclesList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const itemImg = item.imageUrl || item.photo || item.image || null;
                const isSelected = primaryVehicle?.id === item.id;

                return (
                  <Pressable
                    onPress={() => {
                      setPrimaryVehicle(item);
                      setIsVehicleModalVisible(false);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 12,
                      backgroundColor: isSelected ? "#F3F4F6" : "transparent",
                      marginBottom: 8,
                      borderWidth: isSelected ? 1 : 0,
                      borderColor: "#F97316"
                    }}
                  >
                    {itemImg ? (
                      <Image source={{ uri: itemImg }} style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} resizeMode="cover" />
                    ) : (
                      <View style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "#FFF7ED", justifyContent: "center", alignItems: "center", marginRight: 12 }}>
                        <Ionicons name="car-sport" size={20} color="#F97316" />
                      </View>
                    )}

                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: "600", color: "#111827" }}>
                        {item.brand || "Vehicle"} {item.model} {item.year}
                      </Text>
                      <Text style={{ fontSize: 13, color: "#6B7280" }}>
                        {item.registration || "No Plate"}
                      </Text>
                    </View>

                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={20} color="#F97316" />
                    )}
                  </Pressable>
                );
              }}
            />

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}