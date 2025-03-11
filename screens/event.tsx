import {
    View,
    Button,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    StatusBar
 } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';


let eventinfo = {
    title: 'Event Title',
    description: 'Event Description',
    image: 'https://images.unsplash.com/photo-1738253145888-e8f1e20ab05b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
 };

export default function Event({route}: any){
    const { eventId, eventTitle, personName } = route.params;

    return (
        <View>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            
                <View>
                <Text style={styles.eventTitle}>{eventTitle}</Text>
                    <Text style={styles.eventDescription}>{personName}</Text>
                    <Button title="Register" onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    }} />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    eventTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 100,
        paddingLeft: 20
    },
    eventDescription: {
        fontSize: 18,
        color: 'white',
        paddingLeft: 20
    }
});