import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Dashboard({ navigation }: any) {
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        
        {/* Navbar positioned at the bottom */}
        <View style={styles.navbar}>
          <Text>This is Where the Navigation Bar</Text>
        </View>
  
        <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navbar: {
      position: 'absolute',
      height: 100,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      
      // Add border radius only on top
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  
      // Border on top for separation
      borderTopWidth: 1,
      borderTopColor: '#ccc',
  
      // Shadow for elevation effect
      elevation: 10, // Android
      shadowColor: '#000', // iOS
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
});
