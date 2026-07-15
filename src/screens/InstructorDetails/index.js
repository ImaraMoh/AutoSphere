import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform
} from "react-native";
import { ChevronLeft, Star, Calendar, Car, ShieldCheck, Award, Clock } from "lucide-react-native";
import styles from "./styles";

export default function InstructorDetails({ route, navigation }) {
  const instructor = route?.params?.instructor || {
    name: "Kasun Perera",
    experience: "8 Years",
    rating: "4.9",
    reviews: "142",
    vehicle: "Car / Manual",
    availability: "Monday - Friday",
    avatar: "👨‍🏫",
    bio: "Certified professional driving instructor specializing in defensive driving tactics, manual transmissions, and helping nervous beginners pass their practical test with absolute confidence."
  };

  const schoolName = route?.params?.schoolName || "Driving Academy";

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
        <Text style={styles.title}>Instructor Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        {/* Profile Card Header */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>{instructor.avatar || "👨‍🏫"}</Text>
            <View style={styles.badgeVerified}>
              <ShieldCheck size={12} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.name}>{instructor.name}</Text>
          <Text style={styles.schoolSubLabel}>{schoolName}</Text>
          
          <View style={styles.ratingRow}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingValue}>{instructor.rating}</Text>
            <Text style={styles.reviewCount}>({instructor.reviews || "50+"} reviews)</Text>
          </View>
        </View>

        {/* Structured Grid Stats */}
        <Text style={styles.sectionTitle}>Instructor Specifications</Text>
        <View style={styles.statsGrid}>
          <View style={styles.gridItem}>
            <View style={[styles.iconBox, { backgroundColor: "#FFF7ED" }]}>
              <Car size={20} color="#F97316" />
            </View>
            <Text style={styles.gridLabel}>Vehicle Type</Text>
            <Text style={styles.gridValue}>{instructor.vehicle}</Text>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.iconBox, { backgroundColor: "#F0FDF4" }]}>
              <Award size={20} color="#22C55E" />
            </View>
            <Text style={styles.gridLabel}>Experience</Text>
            <Text style={styles.gridValue}>{instructor.experience}</Text>
          </View>

          <View style={styles.gridItem}>
            <View style={[styles.iconBox, { backgroundColor: "#EFF6FF" }]}>
              <Calendar size={20} color="#3B82F6" />
            </View>
            <Text style={styles.gridLabel}>Availability</Text>
            <Text style={styles.gridValue}>{instructor.availability}</Text>
          </View>
        </View>

        {/* Biography Description */}
        <Text style={styles.sectionTitle}>About Instructor</Text>
        <View style={styles.bioCard}>
          <Text style={styles.bioText}>{instructor.bio}</Text>
        </View>

      </ScrollView>

      {/* Fixed Sticky Action Footer */}
      <View style={styles.footerDeck}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("BookLesson", { instructor, schoolName })}
          activeOpacity={0.8}
        >
          <Clock size={20} color="#FFFFFF" style={styles.btnIcon} />
          <Text style={styles.actionButtonText}>Book Driving Lesson</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}