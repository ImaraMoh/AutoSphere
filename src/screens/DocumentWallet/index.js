// DocumentWallet.js
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  useWindowDimensions
} from "react-native";
import { Search, FileText, Trash2, Plus, Inbox } from "lucide-react-native";
import { getDocuments, deleteDocument } from "../../services/documentStorage";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";

export default function DocumentWallet({ navigation }) {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 600;

  const load = async () => {
    const data = await getDocuments();
    setDocuments(data || []);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchLatestDocuments = async () => {
        const data = await getDocuments();
        if (isActive) {
          setDocuments(data || []);
        }
      };

      fetchLatestDocuments();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const remove = async (id) => {
    const performDelete = async () => {
      await deleteDocument(id);
      load();
    };

    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to remove this document from your wallet?")) {
        await performDelete();
      }
    } else {
      Alert.alert(
        "Remove Document",
        "Are you sure you want to remove this document from your wallet permanently?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Remove", style: "destructive", onPress: performDelete }
        ]
      );
    }
  };

  const filtered = documents.filter((doc) => {
    const matchSearch = (doc.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter = filter === "All" || doc.type === filter;

    return matchSearch && matchFilter;
  });

  const responsiveWrapperStyle = isLargeScreen
    ? { maxWidth: 540, alignSelf: "center", width: "100%" }
    : { width: "100%" };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Title Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Document Wallet</Text>
      </View>

      <View style={[styles.mainContainer, responsiveWrapperStyle]}>
        
        {/* Modern Search Engine Bar */}
        <View style={styles.searchContainerGutter}>
          <View style={styles.searchBox}>
            <Search size={18} color="#64748B" />
            <TextInput
              placeholder="Search your secure wallet..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Filter Horizontal View Track */}
        <View style={styles.filterWrapper}>
          <FlatList
            data={["All", "Insurance", "Registration", "License", "Service"]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.filterContentScroll}
            renderItem={({ item }) => {
              const isActive = filter === item;
              return (
                <TouchableOpacity
                  onPress={() => setFilter(item)}
                  style={[styles.filterChip, isActive && styles.activeFilterChip]}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Active Wallet Documents Stack */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Inbox size={28} color="#94A3B8" />
              </View>
              <Text style={styles.emptyText}>No documents found</Text>
              <Text style={styles.emptySubText}>
                {filter === "All"
                  ? "Your secure wallet is empty. Scan documents to populate."
                  : `No active items matched the "${filter}" category parameters.`}
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const isExpired = item.status?.toLowerCase() === "expired";
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("DocumentDetails", { document: item })}
                activeOpacity={0.7}
              >
                <View style={styles.iconBox}>
                  <FileText size={18} color="#F97316" />
                </View>

                <View style={styles.cardMetaBody}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.meta}>
                    Expiry: <Text style={styles.metaHighlight}>{item.expiryDate || "No expiry"}</Text>
                  </Text>
                  
                  {/* Status Badge */}
                  <View style={[styles.statusBadge, isExpired ? styles.statusExpired : styles.statusUpcoming]}>
                    <Text style={[styles.statusTextBadge, isExpired ? styles.statusTextExpired : styles.statusTextUpcoming]}>
                      {item.status || "Valid"}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity 
                  onPress={() => remove(item.id)} 
                  style={styles.deleteActionBox}
                  activeOpacity={0.7}
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />

      </View>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("UploadDocument")}
        activeOpacity={0.85}
      >
        <Plus size={22} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}