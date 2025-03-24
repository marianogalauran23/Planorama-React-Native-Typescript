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

type Invitee = {
  id: number;
  name: string;
  uri: string;
  height: number;
};

const inviteesData: Invitee[] = [
  {
    id: 1,
    name: "Alice Johnson",
    uri: "https://randomuser.me/api/portraits/women/26.jpg",
    height: 220,
  },
  {
    id: 2,
    name: "Bob Williams",
    uri: "https://randomuser.me/api/portraits/men/36.jpg",
    height: 160,
  },
  {
    id: 3,
    name: "Charlie Chen",
    uri: "https://randomuser.me/api/portraits/men/71.jpg",
    height: 280,
  },
  {
    id: 4,
    name: "Diana Wu",
    uri: "https://randomuser.me/api/portraits/women/40.jpg",
    height: 200,
  },
  {
    id: 5,
    name: "Evan Smith",
    uri: "https://randomuser.me/api/portraits/men/31.jpg",
    height: 230,
  },
  {
    id: 6,
    name: "Fiona Davis",
    uri: "https://randomuser.me/api/portraits/women/66.jpg",
    height: 180,
  },
  {
    id: 7,
    name: "George Brown",
    uri: "https://randomuser.me/api/portraits/men/55.jpg",
    height: 300,
  },
  {
    id: 8,
    name: "Hannah Lin",
    uri: "https://randomuser.me/api/portraits/women/21.jpg",
    height: 150,
  },
  {
    id: 9,
    name: "Ian Gray",
    uri: "https://randomuser.me/api/portraits/men/83.jpg",
    height: 260,
  },
];

export default function InviteesScreen({navigation}: any) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Distribute items into two columns for a simple staggered layout.
  const leftColumn: Invitee[] = [];
  const rightColumn: Invitee[] = [];

  inviteesData.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Invite People</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.columnsContainer}>
          <View style={styles.column}>
            {leftColumn.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleSelect(item.id)}
                style={[
                  styles.imageContainer,
                  selectedIds.includes(item.id) && styles.selectedBorder,
                ]}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={[styles.image, { height: item.height }]}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.column}>
            {rightColumn.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleSelect(item.id)}
                style={[
                  styles.imageContainer,
                  selectedIds.includes(item.id) && styles.selectedBorder,
                ]}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={[styles.image, { height: item.height }]}
                />
              </TouchableOpacity>
            ))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    padding: 8,
    paddingBottom: 100, // ensure footer space
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginVertical: 12,
  },
  imageContainer: {
    marginBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    borderRadius: 12,
  },
  selectedBorder: {
    borderWidth: 4,
    borderColor: "#4A90E2",
  },
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
