import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const BG = require("../assets/addEventBG.jpg");

export default function AddEvent({ navigation }: any) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  function continueBtn(){
    navigation.navigate("Invitees");
  };

  return (
    <ImageBackground source={BG} style={styles.background} blurRadius={10}>
      {/* Dark overlay */}
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Header Container */}
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Create an event</Text>
              <Text style={styles.subHeader}>Step 1 of 2: Event Details</Text>
            </View>

            {/* Frosted Glass Form */}
            <BlurView intensity={50} tint="light" style={styles.card}>
              <Text style={styles.label}>Event Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event name"
                placeholderTextColor="#666"
              />

              <Text style={styles.label}>Budget</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter budget"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />

              <Text style={styles.label}>Date</Text>
              <Pressable onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text style={{ color: "#666" }}>{date.toDateString()}</Text>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={handleDateChange}
                />
              )}

              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter location"
                placeholderTextColor="#666"
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Write a brief description"
                placeholderTextColor="#666"
                multiline
              />

              {/* Frosted Glass Button */}
              <BlurView intensity={60} tint="light" style={styles.button}>
                <TouchableOpacity>
                  <Text style={styles.buttonText} onPress={() => continueBtn()}>CONTINUE</Text>
                </TouchableOpacity>
              </BlurView>
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerContainer: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: "100%",
    padding: 25,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 9,
  },
  button: {
    marginTop: 15,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});
