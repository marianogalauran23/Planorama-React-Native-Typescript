import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

type Invitee = {
  id: number;
  name: string;
  role: string;
  uri: string;
  height: number;
};

const inviteesData: Invitee[] = [
  { id: 1, name: "Dr. Sarah Johnson", role: "Medicine Specialist", uri: "https://randomuser.me/api/portraits/women/26.jpg", height: 220 },
  { id: 2, name: "Bob Williams", role: "UI Designer", uri: "https://randomuser.me/api/portraits/men/36.jpg", height: 160 },
  { id: 3, name: "Charlie Chen", role: "Project Manager", uri: "https://randomuser.me/api/portraits/men/71.jpg", height: 280 },
  { id: 4, name: "Diana Wu", role: "Backend Engineer", uri: "https://randomuser.me/api/portraits/women/40.jpg", height: 200 },
  { id: 5, name: "Evan Smith", role: "DevOps Specialist", uri: "https://randomuser.me/api/portraits/men/31.jpg", height: 230 },
  { id: 6, name: "Fiona Davis", role: "Graphic Designer", uri: "https://randomuser.me/api/portraits/women/66.jpg", height: 180 },
  { id: 7, name: "George Brown", role: "Data Analyst", uri: "https://randomuser.me/api/portraits/men/55.jpg", height: 300 },
  { id: 8, name: "Hannah Lin", role: "Marketing Lead", uri: "https://randomuser.me/api/portraits/women/21.jpg", height: 150 },
  { id: 9, name: "Ian Gray", role: "Product Manager", uri: "https://randomuser.me/api/portraits/men/83.jpg", height: 260 },
  { id: 10, name: "Julia Martinez", role: "Frontend Developer", uri: "https://randomuser.me/api/portraits/women/32.jpg", height: 170 },
  { id: 11, name: "Kevin Adams", role: "Security Engineer", uri: "https://randomuser.me/api/portraits/men/22.jpg", height: 190 },
  { id: 12, name: "Lisa Park", role: "UX Researcher", uri: "https://randomuser.me/api/portraits/women/45.jpg", height: 210 },
  { id: 13, name: "Mike Thompson", role: "CTO", uri: "https://randomuser.me/api/portraits/men/67.jpg", height: 240 },
  { id: 14, name: "Nina Rodriguez", role: "HR Manager", uri: "https://randomuser.me/api/portraits/women/53.jpg", height: 165 },
  { id: 15, name: "Oscar Lee", role: "Full Stack Developer", uri: "https://randomuser.me/api/portraits/men/44.jpg", height: 275 },
  { id: 16, name: "Paula Wilson", role: "Content Strategist", uri: "https://randomuser.me/api/portraits/women/68.jpg", height: 155 },
  { id: 17, name: "Quincy Harris", role: "System Architect", uri: "https://randomuser.me/api/portraits/men/77.jpg", height: 290 },
  { id: 18, name: "Rachel Kim", role: "Mobile Developer", uri: "https://randomuser.me/api/portraits/women/29.jpg", height: 185 },
  { id: 19, name: "Steve Carter", role: "QA Engineer", uri: "https://randomuser.me/api/portraits/men/51.jpg", height: 195 },
  { id: 20, name: "Tina Nguyen", role: "Data Scientist", uri: "https://randomuser.me/api/portraits/women/37.jpg", height: 225 },
  { id: 21, name: "Umar Khan", role: "Database Admin", uri: "https://randomuser.me/api/portraits/men/63.jpg", height: 310 },
  { id: 22, name: "Victoria Scott", role: "Product Designer", uri: "https://randomuser.me/api/portraits/women/49.jpg", height: 175 },
  { id: 23, name: "Walter White", role: "Chemistry Teacher", uri: "https://randomuser.me/api/portraits/men/28.jpg", height: 285 },
  { id: 24, name: "Xena Lopez", role: "Legal Counsel", uri: "https://randomuser.me/api/portraits/women/72.jpg", height: 145 },
  { id: 25, name: "Yusuf Ahmed", role: "Network Engineer", uri: "https://randomuser.me/api/portraits/men/39.jpg", height: 265 },
  { id: 26, name: "Zoe Bennett", role: "CEO", uri: "https://randomuser.me/api/portraits/women/15.jpg", height: 135 },
  { id: 27, name: "Aaron Taylor", role: "DevOps Lead", uri: "https://randomuser.me/api/portraits/men/47.jpg", height: 295 },
  { id: 28, name: "Bella Clark", role: "UI/UX Designer", uri: "https://randomuser.me/api/portraits/women/58.jpg", height: 205 },
  { id: 29, name: "Cameron Young", role: "Scrum Master", uri: "https://randomuser.me/api/portraits/men/59.jpg", height: 215 },
  { id: 30, name: "Daisy Evans", role: "Technical Writer", uri: "https://randomuser.me/api/portraits/women/33.jpg", height: 245 },
  { id: 31, name: "Ethan Moore", role: "Cloud Architect", uri: "https://randomuser.me/api/portraits/men/25.jpg", height: 255 },
  { id: 32, name: "Freya Allen", role: "Social Media Manager", uri: "https://randomuser.me/api/portraits/women/19.jpg", height: 125 },
  { id: 33, name: "Gavin Hill", role: "iOS Developer", uri: "https://randomuser.me/api/portraits/men/42.jpg", height: 235 },
  { id: 34, name: "Holly Wright", role: "Customer Support", uri: "https://randomuser.me/api/portraits/women/27.jpg", height: 140 },
  { id: 35, name: "Ivan King", role: "Android Developer", uri: "https://randomuser.me/api/portraits/men/74.jpg", height: 250 },
  { id: 36, name: "Jasmine Hall", role: "Recruiter", uri: "https://randomuser.me/api/portraits/women/62.jpg", height: 130 },
  { id: 37, name: "Kyle Baker", role: "Game Developer", uri: "https://randomuser.me/api/portraits/men/35.jpg", height: 270 },
  { id: 38, name: "Luna Green", role: "AI Researcher", uri: "https://randomuser.me/api/portraits/women/48.jpg", height: 120 },
  { id: 39, name: "Mason Cooper", role: "Blockchain Developer", uri: "https://randomuser.me/api/portraits/men/57.jpg", height: 305 },
  { id: 40, name: "Nora Rivera", role: "Event Coordinator", uri: "https://randomuser.me/api/portraits/women/56.jpg", height: 110 },
  { id: 41, name: "Oliver Torres", role: "Sales Executive", uri: "https://randomuser.me/api/portraits/men/64.jpg", height: 320 },
  { id: 42, name: "Penelope Hughes", role: "Public Relations", uri: "https://randomuser.me/api/portraits/women/70.jpg", height: 115 },
  { id: 43, name: "Quinn Peterson", role: "Business Analyst", uri: "https://randomuser.me/api/portraits/men/78.jpg", height: 330 },
  { id: 44, name: "Riley Stewart", role: "Copywriter", uri: "https://randomuser.me/api/portraits/women/41.jpg", height: 105 },
  { id: 45, name: "Samuel Reed", role: "IT Support", uri: "https://randomuser.me/api/portraits/men/46.jpg", height: 340 },
  { id: 46, name: "Taylor Morgan", role: "SEO Specialist", uri: "https://randomuser.me/api/portraits/women/34.jpg", height: 100 },
  { id: 47, name: "Uma Coleman", role: "Financial Advisor", uri: "https://randomuser.me/api/portraits/women/59.jpg", height: 95 },
  { id: 48, name: "Victor Russell", role: "Operations Manager", uri: "https://randomuser.me/api/portraits/men/52.jpg", height: 350 },
  { id: 49, name: "Willow Bailey", role: "Brand Strategist", uri: "https://randomuser.me/api/portraits/women/63.jpg", height: 90 },
  { id: 50, name: "Xander Sanders", role: "Growth Hacker", uri: "https://randomuser.me/api/portraits/men/80.jpg", height: 360 }
];

export default function InviteesScreen({ navigation }: any) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredInvitees = inviteesData.filter(
    (invitee) =>
      invitee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invitee.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const leftColumn: Invitee[] = [];
  const rightColumn: Invitee[] = [];

  filteredInvitees.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });

  const INFO_SECTION_HEIGHT = 60;

  const renderCard = (item: Invitee) => {
    const isSelected = selectedIds.includes(item.id);
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
        <Image
          source={{ uri: item.uri }}
          style={[styles.cardImage, { height: item.height }]}
        />

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
          <View style={styles.column}>{leftColumn.map(renderCard)}</View>
          <View style={styles.column}>{rightColumn.map(renderCard)}</View>
        </View>
      </ScrollView>

      <BlurView tint="light" intensity={70} style={styles.footer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search invitees..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.footerText}>{selectedIds.length} Selected</Text>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.replace('Dashboard')}
        >
          <Text style={styles.createButtonText}>CREATE</Text>
        </TouchableOpacity>
      </BlurView>
    </SafeAreaView>
  );
}

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
    paddingBottom: 100,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },

  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    resizeMode: "cover",
  },
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
  },
  roleText: {
    fontSize: 12,
    color: "#666",
  },
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

  /* Footer */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    flexDirection: "row",
    alignItems: "center",
    padding: 26,
  },
  searchContainer: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: "#333",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 12,
  },
  createButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
