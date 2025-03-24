import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import MasonryList from "react-native-masonry-list"; // Make sure to add the custom declaration file
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

export default function InviteesScreen() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Transform data if needed. MasonryList uses each item's `uri`, and optionally `width` and `height`.
  // Here we assume the images will be laid out in 2 columns with spacing.
  const masonryData = inviteesData.map((item) => ({
    ...item,
    // You can optionally add width here if needed, e.g.:
    // width: (Dimensions.get('window').width - 32) / 2,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Invite People</Text>
      </View>
      <MasonryList
        images={masonryData}
        columns={2}
        spacing={8}
        style={styles.masonryList}
        imageContainerStyle={styles.imageContainer}
        onPressImage={(item) => toggleSelect(item.id)}
        customImageComponent={(props) => (
          <TouchableOpacity onPress={() => toggleSelect(props.data.id)}>
            <Image
              source={{ uri: props.source.uri }}
              style={[
                props.style,
                selectedIds.includes(props.data.id) && styles.selectedBorder,
              ]}
            />
          </TouchableOpacity>
        )}
      />
      <BlurView tint="light" intensity={70} style={styles.footer}>
        <Text style={styles.footerText}>
          {selectedIds.length} Selected
        </Text>
        <TouchableOpacity style={styles.createButton} onPress={() => alert(`Invited ${selectedIds.length} people!`)}>
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
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  masonryList: {
    flex: 1,
    marginHorizontal: 8,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
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
