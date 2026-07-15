import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, Easing, Platform } from "react-native";
import styles from "./styles";

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    // Smooth entry animation for logo and branding
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start();

    // Timer to automatically navigate to Login after 2.8 seconds
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Rounded Curve Logo Wrapper */}
        <View style={styles.logoOuterGlow}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logo/logo.png")}
              style={styles.logoImage}
            />
          </View>
        </View>

        {/* Brand App Title */}
        <Text style={styles.appName}>AutoSphere</Text>
        <Text style={styles.tagline}>Vehicle Life Management & AI Assistant System</Text>
      </Animated.View>
    </View>
  );
}