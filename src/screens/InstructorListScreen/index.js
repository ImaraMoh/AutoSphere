import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar
} from "react-native";
import { ChevronLeft, Star, MapPin, Users, ChevronRight } from "lucide-react-native";
import styles from "./styles";

export default function InstructorListScreen({ route, navigation }) {
  const school = route?.params?.school || {
    name: "ABC Driving Academy",
    location: "Colombo",
    instructors: []
  };

  const instructors = school.instructors || [];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Toolbar Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Instructor</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Selected School Context Block */}
      <View style={styles.schoolContextCard}>
        <Text style={styles.schoolName}>{school.name}</Text>
        <View style={styles.metaRow}>
          <MapPin size={14} color="#94A3B8" />
          <Text style={styles.metaText}>{school.location}</Text>
          <Text style={styles.dividerDot}>•</Text>
          <Users size={14} color="#94A3B8" style={{ marginRight: 4 }} />
          <Text style={styles.metaText}>{instructors.length} Certified Instructors</Text>
        </View>
      </View>

      {/* Instructors Sub-List */}
      <FlatList
        data={instructors}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.instructorCard}
            onPress={() => navigation.navigate("InstructorDetails", { instructor: item, schoolName: school.name })}
            activeOpacity={0.8}
          >
            <View style={styles.cardLeft}>
              <View style={styles.avatarMini}>
                <Text style={styles.avatarEmoji}>{item.avatar || "👨‍🏫"}</Text>
              </View>
              <View style={styles.instructorInfo}>
                <Text style={styles.instructorName}>{item.name}</Text>
                <Text style={styles.instructorExp}>Experience: {item.experience}</Text>
              </View>
            </View>

            <View style={styles.cardRight}>
              <View style={styles.ratingBox}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
              <ChevronRight size={18} color="#94A3B8" />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}