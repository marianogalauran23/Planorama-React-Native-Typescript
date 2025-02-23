import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Keyboard, 
    Image, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    StatusBar 
} from "react-native";
import { useState, useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export default function LogIn({ navigation }: any) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Shared value for smooth keyboard transition
    const keyboardHeight = useSharedValue(0);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener("keyboardDidShow", (event) => {
            keyboardHeight.value = withTiming(-event.endCoordinates.height / 2, { duration: 200 });
        });

        const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
            keyboardHeight.value = withTiming(0, { duration: 200 });
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    // Animated style for smooth transition of the whole screen
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: keyboardHeight.value }],
        };
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles.container, animatedStyle]}>
                {/* Show the status bar but make it transparent */}
                <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />

                {/* Gradient Background */}
                <LinearGradient 
                    colors={["#A8CECE", "#B6B8CE"]} 
                    style={styles.gradientBackground}
                />

                {/* White Background with rounded upper corners */}
                <View style={styles.whiteBackground}>
                    <View style={styles.whiteInnerBackground} />
                </View>

                {/* Overlay PNG Design */}
                <Image source={require("../assets/logo3d.png")} style={styles.designImage} />

                {/* Login Form */}
                <View style={styles.inner}>
                    <Text style={styles.title}>Planorama</Text>

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

                    <Text style={styles.signup}>No Account?</Text>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    gradientBackground: {
        position: "absolute",
        width: "100%",
        height: "40%", // Increased height slightly for a smoother transition
        top: 0,
    },
    whiteBackground: {
        position: "absolute",
        width: "100%",
        height: "70%",
        bottom: 0,
        backgroundColor: "transparent",
        overflow: "hidden",
    },
    whiteInnerBackground: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        borderTopLeftRadius: 40,  // Increased rounding
        borderTopRightRadius: 40, // Increased rounding
    },
    designImage: {
        position: "absolute",
        top: "10%", 
        zIndex: 1,
        width: 350,
        height: 350,
        resizeMode: "contain",
    },
    inner: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        bottom: 100, 
        zIndex: 2, 
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 70,
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
        backgroundColor: "#007BFF",
        width: 180,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    signup: {
        marginTop: 10,
        color: "#007BFF",
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
        textDecorationLine: "underline",
    },
});