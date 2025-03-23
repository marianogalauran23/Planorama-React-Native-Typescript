import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Linking
} from 'react-native';
import { BlurView } from 'expo-blur';
import ImageColors from 'react-native-image-colors';

const { width, height } = Dimensions.get('window');

const BellIconLight = require('../assets/bellLight.png');
const BellIconDark = require('../assets/bellDark.png');

type Invitees = {
    id: number;
    name: string;
    profile: string;
    contactno: string;
};

const placeholder: Invitees[] = [
    {
        id: 1,
        name: 'Divina, John Jordan',
        profile: 'https://randomuser.me/api/portraits/men/1.jpg',
        contactno: '1234567890',
    },
    {
        id: 2,
        name: 'Ugalde, Ednest Lyner',
        profile: 'https://randomuser.me/api/portraits/women/1.jpg',
        contactno: '1234567890',
    },
    {
        id: 3,
        name: 'Eborde, Christian',
        profile: 'https://randomuser.me/api/portraits/men/2.jpg',
        contactno: '1234567890',
    },
];

let inviteesNumber = placeholder.length;

export default function Event({ route, navigation }: any) {
    const { eventTitle, personName, imageUrl, location, time , description, id} = route.params;
    const [dominantColor, setDominantColor] = useState('#000');
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        async function getColors() {
            if (!imageUrl) return;
    
            const colors = await ImageColors.getColors(imageUrl, { fallback: '#000' });
    
            let extractedColor = '#000'; // Default color
            if (colors.platform === 'android') {
                extractedColor = colors.dominant || '#000';
            } else if (colors.platform === 'ios' && 'background' in colors) {
                extractedColor = colors.background || '#000';
            } else if (colors.platform === 'web') {
                extractedColor = colors.lightVibrant || '#000';
            }
    
            setDominantColor(extractedColor);
            setIsDark(isColorDark(extractedColor));
        }
        getColors();
    }, [imageUrl]);
    
    function isColorDark(hex: string): boolean {
        if (!hex.startsWith('#') || hex.length !== 7) return true;
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
    }

    function editPress(){
        navigation.navigate("Progress");
    }

    const callInvitee = (phoneNumber: string) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    return (
        <View style={[styles.container, { backgroundColor: dominantColor }]}>
            <StatusBar 
                    backgroundColor="transparent" 
                    translucent 
                    barStyle={'light-content'} 
                />
            <Image source={{ uri: imageUrl }} style={styles.backgroundImage} blurRadius={50} />
            <View style={styles.darkOverlay} />
            <BlurView intensity={80} style={styles.blurView} />

            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                <View style={styles.content}>
                    <Image source={{ uri: imageUrl }} style={styles.eventImage} />
                    <Text style={[styles.eventTitle, { color: isDark ? '#FFF' : '#000' }]}>{eventTitle}</Text>
                    <Text style={[styles.eventDescription, { color: isDark ? '#FFF' : '#000' }]}>{location}</Text>
                    <Text style={[styles.time, { color: isDark ? '#FFF' : '#000' }]}>{time}</Text>
                    <Text style={[styles.Description, { color:'#FFF' }]}>"{description}"</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={editPress}>
                        <Text style={[styles.buttonText, { color: isDark ? '#FFF' : '#000' }]}>Budget & Progress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bellIconContainer}>
                        <Image source={isDark ? BellIconDark : BellIconLight} style={styles.bellIcon} />
                    </TouchableOpacity>
                </View>

                {/* Invitees */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.sectionTitle}>Invitees</Text>
                    <Text style={styles.inviteesno}>{inviteesNumber} Invitees</Text>
                    {placeholder.map((item) => (
                        <View key={item.id} style={styles.inviteeCard}>
                            <Image source={{ uri: item.profile }} style={styles.inviteeImage} />
                            <View style={styles.inviteeInfo}>
                                <Text style={styles.inviteeName}>{item.name}</Text>
                                <Text style={styles.inviteeContact}>{item.contactno}</Text>
                            </View>
                            <TouchableOpacity onPress={() => callInvitee(item.contactno)} style={styles.callButton}>
                                <Image source={require('../assets/call.png')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 20, borderRadius: 30, alignItems: 'center', marginTop: 40, marginBottom: 30 }}>
                        <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Edit</Text>
                    </TouchableOpacity>
                    <Text style={styles.hostedBy}>Event ID: {id}</Text>
                    <Text style={[styles.hostedBy, { marginTop: 0 }]}>Hosted by {personName}</Text>
                </View>
            </ScrollView>
        </View>
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
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 20,
        flex: 1,
    },
    eventImage: {
        width: 300,
        height: 300,
        borderRadius: 15,
        marginBottom: 20,
    },
    eventTitle: {
        fontSize: 32,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    eventDescription: {
        fontSize: 18,
        textAlign: 'center',
        color: 'rgba(196, 196, 196, 0.7)',
    },
    Description: {
        fontSize: 17,
        padding: 13,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 60,
    },
    time: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 70,
        gap: 25,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.37)',
        paddingVertical: 27,
        paddingHorizontal: 20,
        borderRadius: 34,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bellIconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.26)',
        padding: 20,
        borderRadius: 40,
    },
    bellIcon: {
        width: 30,
        height: 30,
    },
    detailsContainer: {
        backgroundColor: 'rgb(243, 243, 243)',
        width: '100%',
        padding: 40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    sectionTitle: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },

    inviteesno: {
        marginBottom: 30,
    },

    inviteeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 6,
        borderRadius: 30,
        elevation: 3,
    },
    inviteeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    inviteeInfo: {
        flex: 1,
    },
    inviteeName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inviteeContact: {
        fontSize: 14,
        color: 'gray',
    },
    callButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 30,
    },
    hostedBy: {
        marginTop: 20,
        fontSize: 10,
    },
});

