import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from "react-native";
import { ChevronLeft, Star, MapPin, Car, Bike, ShieldCheck, ArrowRight } from "lucide-react-native";
import { getBooking } from "../../services/drivingSchoolStorage";
import styles from "./styles";

export default function DrivingSchool({ navigation }) {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    const data = await getBooking();
    if (data) setSchools(data);
  };

  const featuredSchools = schools.filter(s => s.featured);

  const renderVehicleTag = (type) => {
    const iconSize = 13;
    const iconColor = "#64748B";
    switch (type.toLowerCase()) {
      case 'car': return <View key={type} style={styles.vTag}><Car size={iconSize} color={iconColor} /><Text style={styles.vTagText}>Car</Text></View>;
      case 'bike': return <View key={type} style={styles.vTag}><Bike size={iconSize} color={iconColor} /><Text style={styles.vTagText}>Moto</Text></View>;
      default: return <View key={type} style={styles.vTag}><Text style={styles.vTagText}>{type}</Text></View>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Modern Compact Navbar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Find Academy</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        {/* Hero Section Container */}
        <View style={styles.heroSection}>
          <Text style={styles.heroGreeting}>Master the Roads ⚡</Text>
          <Text style={styles.heroSubText}>Choose certified professional driving schools near you.</Text>
        </View>

        {/* Section 1: Top Rated / Featured (Horizontal Scroll) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Featured Premium Schools</Text>
          <ShieldCheck size={18} color="#F97316" />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.featuredCarousel}
        >
          {featuredSchools.map((school) => (
            <TouchableOpacity 
              key={school.id} 
              style={styles.featuredCard}
              onPress={() => navigation.navigate("InstructorListScreen", { school })}
              activeOpacity={0.9}
            >
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>POPULAR</Text>
              </View>
              <Text style={styles.featuredCardName} numberOfLines={1}>{school.name}</Text>
              
              <View style={styles.metaRow}>
                <MapPin size={14} color="#94A3B8" />
                <Text style={styles.metaText}>{school.location}</Text>
                <View style={styles.ratingBadge}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{school.rating}</Text>
                </View>
              </View>

              <View style={styles.tagContainer}>
                {school.vehicles.map(renderVehicleTag)}
              </View>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.priceLabel}>Course standard rate</Text>
                  <Text style={styles.priceValue}>Rs. {school.price.toLocaleString()}</Text>
                </View>
                <View style={styles.actionCircleButton}>
                  <ArrowRight size={16} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section 2: All Academies (Vertical Cards) */}
        <Text style={[styles.sectionTitle, { marginLeft: 16, marginTop: 12, marginBottom: 12 }]}>
          All Available Centers
        </Text>

        <View style={styles.verticalListContainer}>
          {schools.map((school) => (
            <TouchableOpacity
              key={school.id}
              style={styles.rowCard}
              onPress={() => navigation.navigate("InstructorListScreen", { school })}
              activeOpacity={0.8}
            >
              <View style={styles.rowLeftBlock}>
                <Text style={styles.rowCardName}>{school.name}</Text>
                <View style={[styles.metaRow, { marginTop: 4 }]}>
                  <MapPin size={13} color="#94A3B8" />
                  <Text style={styles.metaText}>{school.location}</Text>
                  <Text style={styles.dividerDot}>•</Text>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{school.rating}</Text>
                </View>
                <View style={[styles.tagContainer, { marginTop: 8 }]}>
                  {school.vehicles.map(renderVehicleTag)}
                </View>
              </View>

              <View style={styles.rowRightBlock}>
                <Text style={styles.priceValueCompact}>Rs. {school.price.toLocaleString()}</Text>
                <Text style={styles.priceLabelCompact}>Full course</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}