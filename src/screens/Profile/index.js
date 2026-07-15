// Profile.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  ActivityIndicator,
  StatusBar,
  Platform,
  useWindowDimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { getSettings, saveSettings } from "../../services/settingsStorage";
import { getProfile } from "../../services/profileStorage";
import styles from "./styles";

export default function Profile({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    notifications: false,
    marketing: false
  });

  const { width: windowWidth } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  async function loadData() {
    try {
      setLoading(true);
      const user = await getProfile();
      const savedSettings = await getSettings();

      setProfile(user);
      setSettings({
        notifications: savedSettings?.notifications ?? false,
        marketing: savedSettings?.marketing ?? false
      });
    } catch (error) {
      console.log("PROFILE LOAD ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateSetting(key, value) {
    const updated = {
      ...settings,
      [key]: value
    };
    setSettings(updated);
    await saveSettings(updated);
  }

  function handleLogout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }]
            });
          }
        }
      ]
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.loadingCard}>
          <ActivityIndicator size="small" color="#F97316" />
          <Text style={styles.loadingText}>Loading Profile...</Text>
        </View>
      </View>
    );
  }

  const isLargeScreen = windowWidth > 600;
  const responsiveWrapperStyle = isLargeScreen 
    ? { maxWidth: 540, alignSelf: "center", width: "100%" } 
    : { width: "100%" };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your AutoSphere account</Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
          activeOpacity={0.8}
        >
          <Ionicons name="create-outline" size={18} color="#F97316" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={responsiveWrapperStyle}>
          
          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <View style={styles.profileGlowEffect} />

            <View style={styles.avatarWrapper}>
              <Image
                source={
                  profile?.image
                    ? { uri: profile.image }
                    : require("../../../assets/default-avatar.png")
                }
                style={styles.avatar}
              />
            </View>

            <View style={styles.userDetails}>
              <Text style={styles.name} numberOfLines={1}>
                {profile?.name || "AutoSphere User"}
              </Text>

              <Text style={styles.email} numberOfLines={1}>
                {profile?.email || "No email added"}
              </Text>

              <TouchableOpacity
                style={styles.profileEdit}
                onPress={() => navigation.navigate("EditProfile")}
                activeOpacity={0.8}
              >
                <Ionicons name="pencil" size={13} color="#F97316" />
                <Text style={styles.profileEditText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ACCOUNT */}
          <Section title="Account">
            <MenuItem
              icon="key-outline"
              title="Change Password"
              onPress={() => navigation.navigate("ChangePassword")}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="phone-portrait-outline"
              title="Connected Devices"
              onPress={() => navigation.navigate("ConnectedDevices")}
            />
          </Section>

          {/* SETTINGS */}
          <Section title="Preferences">
            <SwitchItem
              icon="notifications-outline"
              title="App Notifications"
              value={settings.notifications}
              onChange={(value) => updateSetting("notifications", value)}
            />
            <View style={styles.divider} />
            <SwitchItem
              icon="mail-outline"
              title="Marketing Emails"
              value={settings.marketing}
              onChange={(value) => updateSetting("marketing", value)}
            />
          </Section>

          {/* SECURITY */}
          <Section title="Privacy & Security">
            <MenuItem
              icon="shield-checkmark-outline"
              title="Privacy"
              onPress={() => navigation.navigate("Privacy")}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="lock-closed-outline"
              title="Security"
              onPress={() => navigation.navigate("Security")}
            />
          </Section>

          {/* ABOUT */}
          <Section title="Application">
            <MenuItem
              icon="help-circle-outline"
              title="Help & Support"
              onPress={() => navigation.navigate("Help")}
            />
            <View style={styles.divider} />
            <MenuItem
              icon="information-circle-outline"
              title="About AutoSphere"
              onPress={() => navigation.navigate("About")}
            />
          </Section>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.85}
          >
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

function MenuItem({ icon, title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={18} color="#F97316" />
        </View>
        <Text style={styles.rowText}>{title}</Text>
      </View>

      <View style={styles.chevronBox}>
        <Ionicons name="chevron-forward" size={16} color="#64748B" />
      </View>
    </TouchableOpacity>
  );
}

function SwitchItem({ icon, title, value, onChange }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={18} color="#F97316" />
        </View>
        <Text style={styles.rowText}>{title}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#E2E8F0", true: "#FED7AA" }}
        thumbColor={value ? "#F97316" : "#FFFFFF"}
        ios_backgroundColor="#E2E8F0"
        style={Platform.OS === "ios" ? { transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] } : {}}
      />
    </View>
  );
}