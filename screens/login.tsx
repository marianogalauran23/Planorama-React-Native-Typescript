import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";

export default function LogIn({ navigation }: any) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Moves UI up when keyboard appears
            style={styles.container}
        >
            {/* Dismiss keyboard when tapping outside */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.title}>Planorama</Text>
                    <StatusBar style="auto" />

                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />


                    <Button title="Login" onPress={() => navigation.navigate("Dashboard")} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    inner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        margin: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 150,
    },

    label: {
        alignSelf: "flex-start", // Aligns label to the left
        marginLeft: "10%",       // Adds some left spacing
        marginBottom: 10,         // Creates space below the label
        fontSize: 16,            // Slightly larger font for clarity
        fontWeight: "bold",      // Makes labels stand out
    },

    input: {
        width: "80%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 10,  // Space between input fields
    },
});
