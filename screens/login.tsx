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
    useColorScheme 
} from "react-native";
import { useState, useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export default function LogIn({ navigation }: any) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Shared value for smooth keyboard transition
    const keyboardHeight = useSharedValue(0);

    const colorScheme = useColorScheme();

    // Determine the image source based on the color scheme
    const imageSource = colorScheme === 'dark' 
        ? require("../assets/logo3dDark.png") 
        : require("../assets/logo3d.png");

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
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: keyboardHeight.value }],
    }));

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles.container, animatedStyle]}>
                {/* Show the status bar but make it transparent */}
                <StatusBar 
                    backgroundColor="transparent" 
                    translucent 
                    barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
                />

                {/* Gradient Background */}
                <LinearGradient 
                    colors={colorScheme === 'dark' ? ["#938465", "#bc6247"] : ["#A8CECE", "#B6B8CE"]} 
                    style={styles.gradientBackground}
                />

                {/* White Background with rounded upper corners */}
                <View style={styles.whiteBackground}>
                    <View style={[styles.whiteInnerBackground, { backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#F5F5F5' }]} />
                </View>

                {/* Overlay PNG Design */}
                <Image source={imageSource} style={styles.designImage} />

                {/* Login Form */}
                <View style={styles.inner}>
                    <Text style={[styles.title, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>Planorama</Text>

                    <Text style={[styles.label, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>Username</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#FFFFFF', color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}
                        placeholder=""
                        placeholderTextColor={colorScheme === 'dark' ? '#AAAAAA' : '#888888'}
                        value={username}
                        onChangeText={setUsername}
                    />

                    <Text style={[styles.label, { color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}>Password</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#333333' : '#FFFFFF', color: colorScheme === 'dark' ? '#FFFFFF' : '#000000' }]}
                        placeholder=""
                        placeholderTextColor={colorScheme === 'dark' ? '#AAAAAA' : '#888888'}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colorScheme === 'dark' ? "#63460C" : "#007BFF" }]}
                        onPress={() => navigation.navigate("Dashboard")}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <Text style={[styles.signup, { color: colorScheme === 'dark' ? "#E1D6C0" : "#007BFF" }]}>
                        No Account?
                    </Text>
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
        borderTopLeftRadius: 40,  
        borderTopRightRadius: 40, 
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
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
        textDecorationLine: "underline",
    },
});
