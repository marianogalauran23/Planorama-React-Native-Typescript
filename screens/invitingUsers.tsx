import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

type Invitee = {
  id: number;
  name: string;
  role: string;
  uri: string;
  height: number; // We'll use this for staggered card heights
};

// Example data with different heights
const inviteesData: Invitee[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Medicine Specialist",
    uri: "https://randomuser.me/api/portraits/women/26.jpg",
    height: 220,
  },
  {
    id: 2,
    name: "Bob Williams",
    role: "UI Designer",
    uri: "https://randomuser.me/api/portraits/men/36.jpg",
    height: 160,
  },
  {
    id: 3,
    name: "Charlie Chen",
    role: "Project Manager",
    uri: "https://randomuser.me/api/portraits/men/71.jpg",
    height: 280,
  },
  {
    id: 4,
    name: "Diana Wu",
    role: "Backend Engineer",
    uri: "https://randomuser.me/api/portraits/women/40.jpg",
    height: 200,
  },
  {
    id: 5,
    name: "Evan Smith",
    role: "DevOps Specialist",
    uri: "https://randomuser.me/api/portraits/men/31.jpg",
    height: 230,
  },
  {
    id: 6,
    name: "Fiona Davis",
    role: "Graphic Designer",
    uri: "https://randomuser.me/api/portraits/women/66.jpg",
    height: 180,
  },
  {
    id: 7,
    name: "George Brown",
    role: "Data Analyst",
    uri: "https://randomuser.me/api/portraits/men/55.jpg",
    height: 300,
  },
  {
    id: 8,
    name: "Hannah Lin",
    role: "Marketing Lead",
    uri: "https://randomuser.me/api/portraits/women/21.jpg",
    height: 150,
  },
  {
    id: 9,
    name: "Ian Gray",
    role: "Product Manager",
    uri: "https://randomuser.me/api/portraits/men/83.jpg",
    height: 260,
  },
];

export default function InviteesScreen({ navigation }: any) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Split data into two columns for the staggered look
  const leftColumn: Invitee[] = [];
  const rightColumn: Invitee[] = [];

  inviteesData.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });

  // We'll add a small constant for the info section height
  const INFO_SECTION_HEIGHT = 60;

  // Render a single card with dynamic height
  const renderCard = (item: Invitee) => {
    const isSelected = selectedIds.includes(item.id);

    // The total card height = item.height (for image) + INFO_SECTION_HEIGHT
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.cardContainer,
          { height: item.height + INFO_SECTION_HEIGHT },
        ]}
        onPress={() => toggleSelect(item.id)}
        activeOpacity={0.9}
      >
        {/* Image section (dynamic height) */}
        <Image
          source={{ uri: item.uri }}
          style={[styles.cardImage, { height: item.height }]}
        />

        {/* Info section (fixed height) */}
        <View style={[styles.infoContainer, { height: INFO_SECTION_HEIGHT }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameText} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.roleText} numberOfLines={1}>
              {item.role}
            </Text>
          </View>
          <View
            style={[
              styles.checkCircle,
              isSelected && styles.checkCircleSelected,
            ]}
          >
            {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Invite People</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.columnsContainer}>
          <View style={styles.column}>
            {leftColumn.map((item) => renderCard(item))}
          </View>
          <View style={styles.column}>
            {rightColumn.map((item) => renderCard(item))}
          </View>
        </View>
      </ScrollView>

      <BlurView tint="light" intensity={70} style={styles.footer}>
        <Text style={styles.footerText}>{selectedIds.length} Selected</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => alert(`Invited ${selectedIds.length} people!`)}
        >
          <Text style={styles.createButtonText}>CREATE</Text>
        </TouchableOpacity>
      </BlurView>
    </SafeAreaView>
  );
}

// ==========================
//        STYLES
// ==========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginVertical: 12,
  },
  scrollContainer: {
    padding: 8,
    paddingBottom: 100, // space for footer
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },

  // Card container with dynamic total height
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android elevation
    elevation: 3,
  },
  // Image section
  cardImage: {
    width: "100%",
    resizeMode: "cover",
  },
  // Bottom info bar
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  roleText: {
    fontSize: 12,
    color: "#666",
  },
  // Circular check
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircleSelected: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
    color: "#333",
  },
  createButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
