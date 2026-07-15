import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  Platform
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ChevronLeft, Download, FileText, Edit } from "lucide-react-native";
import { WebView } from "react-native-webview"; // 1. Import WebView for interactive PDF frames
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import styles from "./styles";

import BrandLogoImg from "../../../assets/logo/logo.png";
import { generateDocumentHtml } from "../pdfTemplate";
import { getDocuments } from "../../services/documentStorage";

export default function DocumentPreview({ route, navigation }) {
  const { documentId, document: initialDocument } = route.params || {};
  const targetId = documentId || initialDocument?.id;

  const { width } = useWindowDimensions();
  const [document, setDocument] = useState(initialDocument || {});
  const [isDownloading, setIsDownloading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadFreshDocumentData = async () => {
        const allDocs = await getDocuments();
        const freshDoc = allDocs.find(item => item.id === targetId);
        if (freshDoc) {
          setDocument(freshDoc);
        }
      };
      
      if (targetId) {
        loadFreshDocumentData();
      }
    }, [targetId])
  );

  const downloadPDF = async () => {
    try {
      setIsDownloading(true);
      const html = await generateDocumentHtml(document, BrandLogoImg);
      const file = await Print.printToFileAsync({ 
        html,
        width: 595,
        height: 842
      });
      await Sharing.shareAsync(file.uri);
    } catch (error) {
      Alert.alert("Export Error", "Could not export the clean document card layout.");
    } finally {
      setIsDownloading(false);
    }
  };

  // 2. Helper utility function to display the correct attachment renderer
  const renderAttachment = () => {
    if (!document.file?.uri) {
      return (
        <View style={styles.pdfFallbackContainer}>
          <FileText size={48} color="#94A3B8" />
          <Text style={styles.pdfText}>No Attachment File Loaded</Text>
        </View>
      );
    }

    if (document.file?.type === "image") {
      return (
        <Image source={{ uri: document.file.uri }} style={styles.image} resizeMode="contain" />
      );
    }

    // PDF URL formatting structure for Android, iOS and Web
    const googleDocsViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(document.file.uri)}`;
    const targetSourceUri = Platform.OS === 'android' ? googleDocsViewerUrl : document.file.uri;

    if (Platform.OS === 'web') {
      return (
        <iframe 
          src={targetSourceUri} 
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }} 
          title="PDF Document Preview"
        />
      );
    }

    return (
      <WebView
        source={{ uri: targetSourceUri }}
        style={{ flex: 1, borderRadius: 8 }}
        originWhitelist={['*']}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    );
  };

  const isWide = width > 600;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Toolbar Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={28} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Document Preview</Text>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate("EditDocument", { document })}
          style={styles.backButton}
        >
          <Edit size={22} color="#F97316" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.pdfCard, { width: isWide ? 520 : width - 32 }]}>
          <View style={styles.brandCenter}>
            <Image source={BrandLogoImg} style={styles.brandLogoAsset} resizeMode="contain" />
            <Text style={styles.company}>AutoSphere</Text>
          </View>

          <Text style={styles.heading}>{document.title || "Loading..."}</Text>
          <View style={styles.line} />

          <View style={styles.metaDataBlock}>
            <View style={styles.metaRow}><Text style={styles.label}>Document Type</Text><Text style={styles.value}>{document.type}</Text></View>
            <View style={styles.metaRow}><Text style={styles.label}>Vehicle</Text><Text style={styles.value}>{document.vehicleModel || "Not Available"}</Text></View>
            <View style={styles.metaRow}><Text style={styles.label}>Owner</Text><Text style={styles.value}>{document.owner || "Not Available"}</Text></View>
            <View style={styles.metaRow}><Text style={styles.label}>Expiry Date</Text><Text style={styles.value}>{document.expiryDate || "No Expiry"}</Text></View>
            <View style={styles.metaRow}>
              <Text style={styles.label}>Status</Text>
              <Text style={[styles.value, document.status?.toLowerCase() === "expired" ? styles.expiredText : styles.validText]}>
                {document.status || "Valid"}
              </Text>
            </View>
          </View>

          <Text style={styles.previewSectionHeader}>Digital Attachment</Text>
          
          {/* 3. Updated filePreview container layout shell to cleanly support the active WebView frame height constraints */}
          <View style={[styles.filePreview, { height: 350, padding: 0, overflow: 'hidden', backgroundColor: '#F8FAFC' }]}>
            {renderAttachment()}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActionDeck}>
        <TouchableOpacity
          style={[styles.download, isDownloading && styles.downloadDisabled]}
          onPress={downloadPDF}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.downloadText}>Download PDF Card</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}