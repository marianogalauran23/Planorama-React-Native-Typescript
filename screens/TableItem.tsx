import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TableItemProps = {
    id: number;
    type: string;
};

export default function TableItem({ id, type }: TableItemProps) {
    return (
        <View style={styles.tableContainer}>
            <Text style={styles.tableText}>{type} Table #{id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tableContainer: {
        width: 150,
        height: 50,
        backgroundColor: "#007AFF",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    tableText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
