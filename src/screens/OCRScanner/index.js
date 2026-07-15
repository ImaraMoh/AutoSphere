import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Alert, Dimensions } from "react-native";
import { ChevronLeft, Camera as CameraIcon, Images, ShieldAlert, X, Zap, ZapOff } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import styles from "./styles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function OCRScanner({ navigation }) {
  const [openCamera, setOpenCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState("off");
  let cameraRef = React.useRef(null);

  const handleOpenCamera = async () => {
    if (!permission || !permission.granted) {
      const response = await requestPermission();
      if (!response.granted) {
        Alert.alert("Permission Required", "Camera authorization is needed to scan documents.");
        return;
      }
    }
    setOpenCamera(true);
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.85, skipProcessing: false };
        const photo = await cameraRef.current.takePictureAsync(options);
        if (photo?.uri) {
          setOpenCamera(false);
          navigation.navigate("ScanPreview", { image: photo.uri });
        }
      } catch (error) {
        Alert.alert("Capture Error", "Could not capture document frame.");
      }
    }
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate("ScanPreview", {
        image: result.assets[0].uri,
      });
    }
  };

  // Immersive Camera Active Fullscreen Interface Matrix
  if (openCamera && permission?.granted) {
    return (
      <View style={styles.cameraContainer}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        
        <CameraView 
          style={styles.absoluteCamera} 
          ref={cameraRef}
          facing="back"
          enableTorch={flash === "on"}
        >
          {/* Top Control Bar */}
          <SafeAreaView style={styles.cameraHeader}>
            <TouchableOpacity 
              style={styles.cameraRoundBtn} 
              onPress={() => setOpenCamera(false)}
            >
              <X size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.cameraTitleText}>Position Document</Text>

            <TouchableOpacity 
              style={styles.cameraRoundBtn} 
              onPress={() => setFlash(f => f === "off" ? "on" : "off")}
            >
              {flash === "on" ? <Zap size={22} color="#F97316" /> : <ZapOff size={22} color="#FFFFFF" />}
            </TouchableOpacity>
          </SafeAreaView>

          {/* Semi-Transparent Viewfinder Framing Mask Layer */}
          <View style={styles.viewfinderContainer}>
            <View style={styles.reticleFrame}>
              {/* Corner Framing Edge Elements */}
              <View style={[styles.cornerEdge, { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 }]} />
              <View style={[styles.cornerEdge, { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 }]} />
              <View style={[styles.cornerEdge, { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 }]} />
              <View style={[styles.cornerEdge, { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 }]} />
              <Text style={styles.viewfinderHint}>Align card inside bounds</Text>
            </View>
          </View>

          {/* Bottom Capture Deck Layout */}
          <View style={styles.captureDeck}>
            <TouchableOpacity 
              style={styles.shutterOuterCircle} 
              onPress={capturePhoto}
              activeOpacity={0.8}
            >
              <View style={styles.shutterInnerCircle} />
            </TouchableOpacity>
          </View>

        </CameraView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={28} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>OCR Scanner</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.contentBody}>
        {permission && !permission.granted ? (
          <View style={styles.heroCard}>
            <View style={[styles.iconContainer, { backgroundColor: "#FEF2F2" }]}>
              <ShieldAlert size={44} color="#EF4444" />
            </View>
            <Text style={styles.heroTitle}>Camera Access Required</Text>
            <Text style={styles.heroText}>
              Please enable authorization within system application settings to scan documents.
            </Text>
          </View>
        ) : (
          <View style={styles.heroCard}>
            <View style={styles.iconContainer}>
              <CameraIcon size={44} color="#F97316" />
            </View>
            <Text style={styles.heroTitle}>Scan Vehicle Documents</Text>
            <Text style={styles.heroText}>
              Capture your registration cards, insurance paperwork, and driver licenses for instant text parsing.
            </Text>
          </View>
        )}

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.scanButton} onPress={handleOpenCamera} activeOpacity={0.8}>
            <CameraIcon color="white" size={20} />
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.galleryButton} onPress={selectImage} activeOpacity={0.8}>
            <Images color="#F97316" size={20} />
            <Text style={styles.galleryText}>Choose From Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}