import { View, Text, Image, TouchableOpacity, StatusBar, SafeAreaView, useColorScheme } from 'react-native';
import React from 'react';

export default function Profile({route}: any) {
    const colorScheme = useColorScheme();
    const { id, name, image, description, username } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar 
                backgroundColor="transparent" 
                translucent 
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
            />

            <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 200, marginTop: 50 }} />
                <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 37, fontWeight: 'bold', marginTop: 20 }}>{name}</Text>
                    <Text style={{ fontSize: 17, marginTop: 3 }}>{username}</Text>
                    <Text style={{ fontSize: 16, marginTop: 35, textAlign: "center" }}>"{description}"</Text>
                </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 20, borderRadius: 30, alignItems: 'center', marginTop: 40, marginHorizontal: 120 }}>
                <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', fontWeight: 'bold'}}>EDIT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
