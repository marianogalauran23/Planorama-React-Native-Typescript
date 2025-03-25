import React, { useRef } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

const { width } = Dimensions.get("window");

export default function Edit() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View style={styles.container}>
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={["25%", "50%"]}>
        <View style={styles.sheetContainer}>
          <View style={styles.indicator} />
          <Text style={styles.sheetTitle}>Select a Table</Text>
          <View style={styles.row}>
            <Image
              source={require("../assets/table1.png")}
              style={styles.tableImage}
            />
            <Image
              source={require("../assets/table2.png")}
              style={styles.tableImage}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  sheetContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
  indicator: {
    width: 50,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#ccc",
    marginBottom: 15,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  tableImage: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: "contain",
    marginHorizontal: 10,
  },
});
