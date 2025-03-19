import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Keyboard, 
    Image, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    StatusBar, 
    useColorScheme,
    Alert 
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export default function LogIn({ navigation }: any) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const keyboardHeight = useSharedValue(0);
    const colorScheme = useColorScheme();
    const imageSource = colorScheme === 'dark' 
        ? require("../assets/logo3dDark.png") 
        : require("../assets/logo3d.png");

    // Authenticate biometrics on app start
    useEffect(() => {
        checkSavedLogin();
    }, []);

    // Keyboard animation
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

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: keyboardHeight.value }],
    }));

    // Check saved login and authenticate
    const checkSavedLogin = async () => {
        try {
            const savedUsername = await AsyncStorage.getItem("username");
            const savedPassword = await AsyncStorage.getItem("password");

            if (savedUsername && savedPassword) {
                handleBiometricAuth();
            }
        } catch (error) {
            console.error("Error checking saved login:", error);
        }
    };

    // Biometric authentication
    const handleBiometricAuth = async () => {
        try {
            const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();
            const supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

            if (!hasBiometricHardware || supportedBiometrics.length === 0) {
                return;
            }

            const biometricAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate with Face ID or Fingerprint",
                disableDeviceFallback: true,
                cancelLabel: "Cancel"
            });

            if (biometricAuth.success) {
                navigation.navigate("Dashboard");
            }
        } catch (error) {
            console.error("Biometric authentication error:", error);
        }
    };

    // Handle normal login and save credentials
    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Username and password cannot be empty.");
            return;
        }

        try {
            await AsyncStorage.setItem("username", username);
            await AsyncStorage.setItem("password", password);
            navigation.navigate("Dashboard");
        } catch (error) {
            console.error("Error saving login:", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles.container, animatedStyle]}>
                <StatusBar 
                    backgroundColor="transparent" 
                    translucent 
                    barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
                />

                <LinearGradient 
                    colors={colorScheme === 'dark' ? ["#938465", "#bc6247"] : ["#A8CECE", "#B6B8CE"]} 
                    style={styles.gradientBackground}
                />

                <View style={styles.whiteBackground}>
                    <View style={[styles.whiteInnerBackground, { backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#F5F5F5' }]} />
                </View>

                <Image source={imageSource} style={styles.designImage} />

                <View style={styles.inner}>
                    <Text style={[styles.title, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>Planorama</Text>

                    <Text style={[styles.label, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>Username</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#FFFFFF', color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={[styles.label, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>Password</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#FFFFFF', color: colorScheme === 'dark' ? '#FFFFFF' : '#000000', marginBottom: 70 }]}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colorScheme === 'dark' ? "#63460C" : "#007BFF" }]}
                        onPress={handleLogin}
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
        alignItems: "center",
        justifyContent: "center",
    },
    gradientBackground: {
        position: "absolute",
        width: "100%",
        height: "40%",
        top: 0,
    },
    whiteBackground: {
        position: "absolute",
        width: "100%",
        height: "70%",
        bottom: 0,
    },
    whiteInnerBackground: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "#f5f5f5",
    },
    designImage: {
        position: "absolute",
        top: "10%",
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
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 50,
    },
    label: {
        alignSelf: "flex-start",
        marginLeft: "10%",
        marginBottom: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        width: "80%",
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    button: {
        width: 180,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        backgroundColor: "#007BFF",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});