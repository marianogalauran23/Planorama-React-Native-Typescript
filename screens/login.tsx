import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TextInput, Keyboard, Platform, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function LogIn({ navigation }: any) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Shared value for smooth keyboard transition
    const keyboardHeight = useSharedValue(0);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
            keyboardHeight.value = withTiming(event.endCoordinates.height, { duration: 200 });
        });

        const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
            keyboardHeight.value = withTiming(0, { duration: 200 });
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    // Animated style for smooth transition
    const animatedStyle = useAnimatedStyle(() => {
        return {
            marginBottom: keyboardHeight.value,
        };
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles.container, animatedStyle]}>
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

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Dashboard")}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    inner: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 100,
    },
    label: {
        alignSelf: "flex-start",
        marginLeft: "10%",
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        width: "80%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007BFF", // Blue color
        width: 180, // Button width
        height: 50, // Button height
        borderRadius: 25, // Circular shape
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        elevation: 5, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
