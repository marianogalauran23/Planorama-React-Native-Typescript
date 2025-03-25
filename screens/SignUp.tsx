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
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const Google = require('../assets/google.png');

export default function SignUp({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const keyboardHeight = useSharedValue(0);
    const colorScheme = useColorScheme();

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

    const handleSignUp = () => {
        if (!email || !username || !password || !confirmPassword) {
            Alert.alert("Error", "All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }
        navigation.replace('Authentication');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles.container, animatedStyle]}>
                <StatusBar backgroundColor="transparent" translucent />

                <LinearGradient 
                    colors={colorScheme === 'dark' ? ["#938465", "#bc6247"] : ["#A8CECE", "#B6B8CE"]} 
                    style={styles.gradientBackground}
                />

                <View style={styles.whiteBackground}>
                    <View style={[styles.whiteInnerBackground, { backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#F5F5F5' }]} />
                </View>

                <View style={styles.inner}>
                    <Text style={[styles.title, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>Sign Up</Text>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colorScheme === 'dark' ? "#63460C" : "#007BFF" }]}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.socialIcons}>
                        <TouchableOpacity>
                            <FontAwesome name="facebook" size={30} color="#1877F2" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={Google}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome name="apple" size={30} color="black" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                        <Text style={{ marginTop: 10, color: "#007BFF" }}>Already have an account? Log in</Text>
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
        height: "85%",
        bottom: 0,
    },
    whiteInnerBackground: {
        flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "#f5f5f5",
    },
    inner: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        bottom: 100,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 30,
    },
    label: {
        alignSelf: "flex-start",
        marginLeft: "12%",
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        width: "80%",
        height: 45,
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    button: {
        width: 180,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#007BFF",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    socialIcons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "60%",
        marginTop: 40,
        marginBottom: 20,
    },
    icon: {
        width: 30,
        height: 30,
    },
});
