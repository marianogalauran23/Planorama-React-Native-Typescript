import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { BlurView } from 'expo-blur';
import ImageColors from 'react-native-image-colors';

const { width, height } = Dimensions.get('window');

const BellIconLight = require('../assets/bellLight.png');
const BellIconDark = require('../assets/bellDark.png');

export default function Event({ route }: any) {
    const { eventId, eventTitle, personName, imageUrl, location, time } = route.params;
    const [dominantColor, setDominantColor] = useState('#000');
    const [isDark, setIsDark] = useState(true); // Default to dark mode

    useEffect(() => {
        async function getColors() {
            if (!imageUrl) return;

            const colors = await ImageColors.getColors(imageUrl, { fallback: '#000' });

            let extractedColor = '#000';

            if (colors.platform === 'android') {
                extractedColor = colors.dominant || '#000';
            } else if (colors.platform === 'ios') {
                extractedColor = colors.background || '#000';
            } else if (colors.platform === 'web') {
                extractedColor = colors.lightMuted || '#000';
            }

            setDominantColor(extractedColor);

            // Determine if background is dark or light
            const darkMode = isColorDark(extractedColor);
            setIsDark(darkMode);
        }

        getColors();
    }, [imageUrl]);

    // Function to check if color is dark or light
    function isColorDark(hex: string): boolean {
        if (!hex.startsWith('#') || hex.length !== 7) return true; // Assume dark if invalid

        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);

        // Relative luminance calculation
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        return luminance < 0.5; // Dark if luminance is below 0.5
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: dominantColor }]}>
            <StatusBar translucent backgroundColor="transparent" barStyle={isDark ? 'light-content' : 'dark-content'} />

            {/* Background with blur */}
            <Image source={{ uri: imageUrl }} style={styles.backgroundImage} blurRadius={50} />
            <View style={styles.darkOverlay}></View>
            <BlurView intensity={80} style={styles.blurView} />

            {/* Event Content */}
            <View style={styles.content}>
                <Image source={{ uri: imageUrl }} style={styles.eventImage} />

                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.eventTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>{eventTitle}</Text>
                    <Text style={[styles.eventDescription, { color: isDark ? '#FFFFFF' : '#000000' }]}>{location}</Text>
                </View>

                <Text style={[styles.time, { color: isDark ? '#FFFFFF' : '#000000' }]}>{time}</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#000000' }]}>Budget & Progress</Text>
                </TouchableOpacity>

                {/* Bell Icon */}
                <View style={styles.bellIconContainer}>
                    <TouchableOpacity>
                        <Image source={isDark ? BellIconDark : BellIconLight} style={styles.bellIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text>Hosted by {personName}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        backgroundColor: '#000',
    },
    backgroundImage: {
        position: 'absolute',

        width: width,
        height: height,
        resizeMode: 'cover',
    },
    blurView: {
        ...StyleSheet.absoluteFillObject,
    },

    darkOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
    content: {
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 20,
    },
    eventImage: {
        width: 300,
        height: 300,
        borderRadius: 15,
        marginBottom: 20,
    },
    eventTitle: {
        fontSize: 27,
        fontWeight: 'bold',
    },
    eventDescription: {
        fontSize: 18,
    },
    time: {
        fontSize: 16,
        marginTop: 27,
        marginBottom: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80,
        gap: 25,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.37)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 34,
    },
    buttonText: {
        fontSize: 16,
        padding: 16,
        fontWeight: 'bold',
    },
    bellIcon: {
        width: 30,
        height: 30,
    },
    bellIconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.26)',
        padding: 20,
        borderRadius: 40,
    },
    detailsContainer: {
        backgroundColor: 'rgb(243, 243, 243)',
        width: '100%',
        height: 300,
        alignItems: 'center',
        borderTopLeftRadius: 30, // Rounded top-left corner
        borderTopRightRadius: 30,
    },
});
