import { 
    View, Text, Image, TouchableOpacity, StatusBar, SafeAreaView, 
    useColorScheme, ScrollView, Alert, StyleSheet 
} from 'react-native';
import React from 'react';

type Data = {
    id: number;
    eventname: string;
    eventimage: string;
    eventdescription?: string;
    status: string;
};

const eventdata: Data[] = [
    {
        id: 1,
        eventname: 'Beach Party',
        eventimage: 'https://picsum.photos/200',
        eventdescription: 'Enjoy the sun, sand, and waves with friends!',
        status: 'Ongoing',
    },
    {
        id: 2,
        eventname: 'Mountain Trek',
        eventimage: 'https://picsum.photos/300',
        eventdescription: 'A thrilling adventure to the highest peaks.',
        status: 'Completed',
    },
    {
        id: 3,
        eventname: 'Food Festival',
        eventimage: 'https://picsum.photos/250',
        eventdescription: 'Taste delicious dishes from around the world!',
        status: 'Upcoming',
    },
    {
        id: 4,
        eventname: 'Tech Conference 2025',
        eventimage: 'https://picsum.photos/80',
        eventdescription: 'Explore the latest trends in technology.',
        status: 'Ongoing',
    },
    {
        id: 5,
        eventname: 'Music Concert',
        eventimage: 'https://picsum.photos/29',
        eventdescription: 'Live performances from your favorite artists.',
        status: 'Upcoming',
    },
    {
        id: 6,
        eventname: 'Art Exhibition',
        eventimage: 'https://picsum.photos/20',
        eventdescription: 'Discover beautiful artwork from local artists.',
        status: 'Completed',
    },
    {
        id: 7,
        eventname: 'Marathon Run',
        eventimage: 'https://picsum.photos/240',
        eventdescription: 'Challenge yourself in a 10K marathon race!',
        status: 'Ongoing',
    },
    {
        id: 8,
        eventname: 'Gaming Tournament',
        eventimage: 'https://picsum.photos/260',
        eventdescription: 'Compete with top players in eSports events.',
        status: 'Upcoming',
    },
    {
        id: 9,
        eventname: 'Camping Night',
        eventimage: 'https://picsum.photos/270',
        eventdescription: 'Enjoy a peaceful night under the stars.',
        status: 'Completed',
    },
    {
        id: 10,
        eventname: 'Charity Gala',
        eventimage: 'https://picsum.photos/290',
        eventdescription: 'An evening of giving back to the community.',
        status: 'Ongoing',
    },
];


export default function Profile({ route, navigation }: any) {
    const colorScheme = useColorScheme();
    const { id, name, image, description, username } = route.params;

    // Function to handle event press
    const handleEventPress = (event: Data) => {
        Alert.alert("Event Clicked", `You selected: ${event.eventname}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                backgroundColor="transparent" 
                translucent 
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
            />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    {/* Profile Header */}
                    <View style={styles.profileHeader}>
                        <Image source={{ uri: image }} style={styles.profileImage} />
                        
                        {/* Adjusted Name Container */}
                        <View style={styles.nameContainer}>
                            <Text style={styles.name} numberOfLines={3} adjustsFontSizeToFit>
                                {name}
                            </Text>
                            <Text style={styles.greeting} numberOfLines={2} adjustsFontSizeToFit>
                                {username}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editText}>EDIT</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Description */}
                    <Text style={styles.description}>"{description}"</Text>
                </View>

                {/* Events Section */}
                <View style={styles.eventSection}>
                    <Text style={styles.eventTitle}>Your Events</Text>
                    
                    {eventdata.map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => handleEventPress(item)}>
                            <View style={styles.eventCard}>
                                <Image source={{ uri: item.eventimage }} style={styles.eventImage} />
                                <Text style={styles.eventName}>{item.eventname}</Text>
                                <Text style={styles.eventDescription}>{item.eventdescription}</Text>
                                <Text style={[styles.eventStatus, { color: item.status === 'Ongoing' ? 'blue' : 'grey' }]}>
                                    {item.status}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    profileCard: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
        padding: 30,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 5,
    },
    nameContainer: {
        flex: 1, 
        marginLeft: 10,
        flexShrink: 1, 
    },
    name: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'left', 
    },
    greeting: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'left',
    },
    description: {
        fontSize: 16,
        marginTop: 15,
        textAlign: "center",
        color: '#555',
    },
    editButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    editText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    eventSection: {
        marginTop: 40,
        paddingHorizontal: 20,
    },
    eventTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30,
    },
    eventCard: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    eventImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    eventDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    eventStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
});

