import React, { useState, useRef, useEffect } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, 
    TouchableWithoutFeedback, Keyboard, StatusBar, BackHandler, 
    Animated, Easing, KeyboardEvent
} from "react-native";

export default function Authentication({ navigation }: any) {
    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const inputRefs = useRef<Array<TextInput | null>>([]);
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const keyboardShow = (event: KeyboardEvent) => {
            Animated.timing(translateY, {
                toValue: -event.endCoordinates.height / 2,
                duration: 200,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        };

        const keyboardHide = () => {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 200,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        };

        const showListener = Keyboard.addListener("keyboardWillShow", keyboardShow);
        const hideListener = Keyboard.addListener("keyboardWillHide", keyboardHide);

        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);

        return () => {
            showListener.remove();
            hideListener.remove();
            backHandler.remove();
        };
    }, []);

    const handleOTPChange = (text: string, index: number) => {
        let newOtp = [...otp];
        if (text) {
            newOtp[index] = text;
            setOtp(newOtp);
            if (index < 4) {
                inputRefs.current[index + 1]?.focus();
            }
        } else {
            newOtp[index] = "";
            setOtp(newOtp);
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const go = () => {
        navigation.replace("LogIn");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <StatusBar barStyle={"dark-content"} />
                <Animated.View style={[styles.innerContainer, { transform: [{ translateY }] }]}>
                    <Text style={styles.title}>Verify your email</Text>
                    <Text style={styles.subtitle}>Check your email address for the OTP Code</Text>

                    <View style={styles.otpContainer}>
                        {otp.map((value, index) => (
                            <TextInput
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                style={styles.otpBox}
                                keyboardType="numeric"
                                maxLength={1}
                                value={value}
                                onChangeText={(text) => handleOTPChange(text, index)}
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { opacity: otp.join("").length === 5 ? 1 : 0.5 }]}
                        disabled={otp.join("").length !== 5}
                        onPress={go}
                    >
                        <Text style={styles.buttonText}>CONTINUE</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    innerContainer: {
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 30,
        textAlign: "center",
    },
    otpContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 30,
    },
    otpBox: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        textAlign: "center",
        fontSize: 18,
    },
    button: {
        backgroundColor: "#A8CECE",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
