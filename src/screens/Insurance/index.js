import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView
} from "react-native";
import {
  ChevronLeft,
  Plus,
  Shield,
  RefreshCw,
  FileText
} from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";
import InsuranceCard from "../../components/InsuranceCard";
import { getInsurance } from "../../services/insuranceStorage";
import styles from "./styles";

export default function Insurance({ navigation }) {
  const [insurance, setInsurance] = useState(null);

  // Automatically fetches fresh data whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadInsuranceData();
    }, [])
  );

  const loadInsuranceData = async () => {
    const data = await getInsurance();
    setInsurance(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Toolbar Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Insurance</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        {/* Hero Section Container */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>🛡 Protect Your Vehicle</Text>
          <Text style={styles.heroText}>
            Manage insurance policies, track expiry dates, and submit claims seamlessly.
          </Text>
        </View>

        {/* Conditional Policy Rendering View */}
        {insurance ? (
          <View style={styles.policySection}>
            <InsuranceCard data={insurance} />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Shield size={36} color="#F97316" />
            </View>
            <Text style={styles.emptyTitle}>No Insurance Added</Text>
            <Text style={styles.emptyText}>
              Add your vehicle insurance policy details to track renewals and process damage claims easily.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("RenewInsurance")}
              activeOpacity={0.8}
            >
              <Plus size={18} color="#FFFFFF" style={styles.btnIcon} />
              <Text style={styles.buttonText}>Add Insurance Policy</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Actions Grid */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("RenewInsurance")}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconBox, { backgroundColor: "#FFF7ED" }]}>
              <RefreshCw size={20} color="#F97316" />
            </View>
            <Text style={styles.cardTitle}>Renew Insurance</Text>
            <Text style={styles.cardSubText}>Update your policy details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("SubmitClaim")}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconBox, { backgroundColor: "#EFF6FF" }]}>
              <FileText size={20} color="#3B82F6" />
            </View>
            <Text style={styles.cardTitle}>Submit Claim</Text>
            <Text style={styles.cardSubText}>Report vehicle damage</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}