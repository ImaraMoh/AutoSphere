import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ChevronLeft, Eye, Edit3, Trash2, FileText, Calendar, Car, User, Fingerprint } from "lucide-react-native";
import { WebView } from "react-native-webview"; // 1. Import WebView for interactive PDF frames
import { deleteDocument, getDocuments } from "../../services/documentStorage";
import styles from "./styles";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DocumentDetails({ route, navigation }) {
  const { document: initialDocument } = route.params || {};
  const [document, setDocument] = useState(initialDocument || null);

  useFocusEffect(
    useCallback(() => {
      const reloadFreshData = async () => {
        if (!initialDocument?.id) return;
        const allDocs = await getDocuments();
        const updatedDoc = allDocs.find((item) => item.id === initialDocument.id);
        if (updatedDoc) {
          setDocument(updatedDoc);
        }
      };
      reloadFreshData();
    }, [initialDocument?.id])
  );

  if (!document) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorCentered}>
          <Text style={styles.errorText}>Document parameters missing.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const remove = () => {
    const performDelete = async () => {
      await deleteDocument(document.id);
      navigation.goBack();
    };

    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to permanently delete this document?")) {
        performDelete();
      }
    } else {
      Alert.alert(
        "Delete Document",
        "Are you sure you want to remove this item?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: performDelete }
        ]
      );
    }
  };

  // Helper utility function to choose between an Image layer or WebView document renderer
  const renderDocumentCopy = () => {
    if (!document.file?.uri) {
      return (
        <View style={styles.pdfBox}>
          <FileText size={48} color="#94A3B8" />
          <Text style={styles.pdfText}>No Attachment File Loaded</Text>
        </View>
      );
    }

    if (document.file?.type === "image") {
      return (
        <Image source={{ uri: document.file.uri }} style={styles.thumbnail} resizeMode="cover" />
      );
    }

    // Handles PDF preview execution rendering securely across Android, iOS and Web wrappers
    const googleDocsViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(document.file.uri)}`;
    const targetSourceUri = Platform.OS === 'android' ? googleDocsViewerUrl : document.file.uri;

    if (Platform.OS === 'web') {
      return (
        <iframe 
          src={targetSourceUri} 
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px' }} 
          title="PDF Document Preview"
        />
      );
    }

    return (
      <View style={{ flex: 1, borderRadius: 12, overflow: 'hidden' }}>
        <WebView
          source={{ uri: targetSourceUri }}
          style={{ flex: 1 }}
          originWhitelist={['*']}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={28} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Document Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.fileHeader}>
            <View style={styles.iconBox}>
              <FileText size={28} color="#F97316" />
            </View>
            <View style={styles.headerTextMeta}>
              <Text style={styles.docTitle} numberOfLines={1}>{document.title}</Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.typeTextBadge}>{document.type || "General"}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Digital Copy Preview</Text>
          
          {/* Constrained layout container container frame slot targeting dynamic WebView rendering */}
          <View style={[styles.previewBox, { height: SCREEN_HEIGHT * 0.4, padding: 0, overflow: 'hidden' }]}>
            {renderDocumentCopy()}
          </View>

          <Text style={styles.sectionTitle}>Extracted Information</Text>
          <InfoRow icon={<Fingerprint size={18} color="#64748B" />} label="Document Type" value={document.type} />
          <InfoRow icon={<Car size={18} color="#64748B" />} label="Vehicle Model" value={document.vehicleModel || "Not Available"} />
          <InfoRow icon={<FileText size={18} color="#64748B" />} label="Registration No." value={document.registrationNumber || "Not Available"} />
          <InfoRow icon={<User size={18} color="#64748B" />} label="Registered Owner" value={document.owner || "Not Available"} />
          <InfoRow icon={<Calendar size={18} color="#64748B" />} label="Expiration Date" value={document.expiryDate || "No Expiry"} isExpiry />
        </View>
      </ScrollView>

      <View style={styles.bottomActionDeck}>
        <TouchableOpacity style={[styles.actionButton, styles.previewBtn]} onPress={() => navigation.navigate("DocumentPreview", { document })}>
          <Eye color="#F97316" size={20} />
          <Text style={styles.previewBtnText}>Preview</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.editBtn]} onPress={() => navigation.navigate("EditDocument", { document })}>
          <Edit3 color="#2563EB" size={20} />
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.deleteBtn]} onPress={remove}>
          <Trash2 color="#EF4444" size={20} />
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value, isExpiry }) {
  return (
    <View style={styles.infoRowContainer}>
      <View style={styles.infoLabelGroup}>
        {icon}
        <Text style={styles.infoLabelText}>{label}</Text>
      </View>
      <Text style={[styles.infoValueText, isExpiry && value !== "No Expiry" && styles.expiryHighlight]}>
        {value}
      </Text>
    </View>
  );
}