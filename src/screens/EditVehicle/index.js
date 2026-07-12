import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { updateVehicle, deleteVehicle } from "../../services/vehicleStorage";
import styles from "./styles";

export default function EditVehicle({ route, navigation }) {
  const { vehicle } = route.params;

  const [image,setImage]=useState(

vehicle.image
?
{
uri:vehicle.image,
base64:null
}
:
null

);
  const [data, setData] = useState({ ...vehicle });
  const [isSaving, setIsSaving] = useState(false);

  function updateField(key, value) {
    setData(prev => ({ ...prev, [key]: value }));
  }

async function pickImage() {
const result =
await ImagePicker.launchImageLibraryAsync({
mediaTypes:["images"],
quality:0.7,
base64:true
});

if(!result.canceled){
const asset =
result.assets[0];
setImage({
uri:asset.uri,
base64:asset.base64,
});
}
}

  async function saveChanges() {
    if (isSaving) return;
    setIsSaving(true);
    
    try {
      let finalImage = vehicle.image || null;



if(image){


if(image.base64){


finalImage =
`data:image/jpeg;base64,${image.base64}`;


}

else if(typeof image==="string"){


finalImage=image;


}


}



const updatedVehicle={

...data,

image:finalImage,

updatedAt:new Date().toISOString()

};



await updateVehicle(updatedVehicle);
      
      // CRITICAL FIX: Explicitly resets and re-injects state down the hierarchy 
      // so your Vehicle Profile screen forces a full refresh.
      navigation.navigate("VehicleMain", { refresh: Date.now() });
    } catch (error) {
      if (Platform.OS === "web") {
        window.alert("Failed to update vehicle details.");
      } else {
        Alert.alert("Error", "Failed to update vehicle details.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  function removeVehicle() {
    const heading = `Remove ${vehicle.brand} ${vehicle.model}?`;
    const message = "This action is permanent and cannot be undone.";

    if (Platform.OS === "web") {
      const confirmDelete = window.confirm(`${heading}\n\n${message}`);
      if (confirmDelete) executeDelete();
    } else {
      Alert.alert(heading, message, [
        { text: "Cancel", style: "cancel" },
        { text: "Delete Vehicle", style: "destructive", onPress: executeDelete },
      ]);
    }
  }

  function executeDelete() {
    deleteVehicle(String(vehicle.id))
      .then((result) => {
        if (result) {
          if (Platform.OS === "web") {
            window.alert("Vehicle deleted successfully");
          } else {
            Alert.alert("Success", "Vehicle deleted successfully");
          }
          navigation.reset({
            index: 0,
            routes: [{ name: "Vehicles" }],
          });
        }
      })
      .catch((error) => {
        console.log("DELETE ERROR", error);
      });
  }

  return (
    <View style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Vehicle</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* PC and Mobile Layout Master Wrapper */}
        <View style={styles.desktopSplitLayout}>
          
          {/* Left Column: Media Panel & Destructive Actions */}
          <View style={styles.leftMediaPanel}>
            <TouchableOpacity
              style={styles.imageBox}
              onPress={pickImage}
              activeOpacity={0.9}
            >
              {image ? (
                <Image

source={{

uri:

typeof image === "string"

?

image

:

image?.uri

}}

style={styles.image}

/>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <View style={styles.cameraIconContainer}>
                    <Ionicons name="camera" size={28} color="#F97316" />
                  </View>
                  <Text style={styles.imagePlaceholderText}>Upload Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={removeVehicle}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
              <Text style={styles.deleteText}>Delete Vehicle</Text>
            </TouchableOpacity>
          </View>

          {/* Right Column: Form Inputs & Primary Saves */}
          <View style={styles.rightFormPanel}>
            <Text style={styles.sectionHeading}>Vehicle Specifications</Text>

            <View style={styles.formGrid}>
              <View style={styles.gridColumnHalf}>
                <Input
                  label="Brand"
                  value={data.brand}
                  placeholder="e.g., Honda"
                  onChangeText={(v) => updateField("brand", v)}
                />
              </View>

              <View style={styles.gridColumnHalf}>
                <Input
                  label="Model"
                  value={data.model}
                  placeholder="e.g., Civic"
                  onChangeText={(v) => updateField("model", v)}
                />
              </View>

              <View style={styles.gridColumnHalf}>
                <Input
                  label="Year"
                  value={data.year}
                  keyboardType="numeric"
                  placeholder="e.g., 2022"
                  onChangeText={(v) => updateField("year", v)}
                />
              </View>

              <View style={styles.gridColumnHalf}>
                <Input
                  label="Mileage (KM)"
                  value={data.mileage}
                  keyboardType="numeric"
                  placeholder="e.g., 87000"
                  onChangeText={(v) => updateField("mileage", v)}
                />
              </View>

              <View style={styles.gridColumnFull}>
                <Input
                  label="Registration Number"
                  value={data.registration}
                  placeholder="e.g., WP CAB 1234"
                  onChangeText={(v) => updateField("registration", v)}
                />
              </View>
            </View>

            <Text style={styles.fieldGroupLabel}>Vehicle Type</Text>
            <Selector
              items={["Car", "Bike", "Van", "Truck"]}
              selected={data.type}
              onSelect={(v) => updateField("type", v)}
            />

            <Text style={styles.fieldGroupLabel}>Fuel Type</Text>
            <Selector
              items={["Petrol", "Diesel", "Hybrid", "Electric"]}
              selected={data.fuel}
              onSelect={(v) => updateField("fuel", v)}
            />

            {/* Sticky Action Footer */}
            <View style={styles.actionButtonArea}>
              <TouchableOpacity
                style={[styles.saveButton, isSaving && { opacity: 0.7 }]}
                onPress={saveChanges}
                activeOpacity={0.85}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.saveText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

function Input({ label, ...props }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.inputField}
        placeholderTextColor="#94A3B8"
        {...props}
      />
    </View>
  );
}

function Selector({ items, selected, onSelect }) {
  return (
    <View style={styles.selectorContainer}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => onSelect(item)}
          style={[styles.optionBadge, selected === item && styles.optionBadgeSelected]}
          activeOpacity={0.8}
        >
          <Text style={[styles.optionText, selected === item && styles.optionTextSelected]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}