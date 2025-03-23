import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  Alert,
  StyleSheet,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

type Data = {
  id: number;
  eventname: string;
  eventimage: string;
  eventdescription?: string;
  status: string;
};

// ====== Sample event data ======
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
    eventname: 'Tech Conference 2023',
    eventimage: 'https://picsum.photos/400',
    eventdescription: 'Explore the latest in technology and innovation.',
    status: 'Upcoming',
  },
  {
    id: 4,
    eventname: 'Charity Run',
    eventimage: 'https://picsum.photos/500',
    eventdescription: 'Run for a cause and support local charities.',
    status: 'Ongoing',
  },
  {
    id: 5,
    eventname: 'Art Exhibition',
    eventimage: 'https://picsum.photos/600',
    eventdescription: 'Discover stunning artworks from talented artists.',
    status: 'Completed',
  },
  {
    id: 6,
    eventname: 'Food Festival',
    eventimage: 'https://picsum.photos/700',
    eventdescription: 'Savor delicious cuisines from around the world.',
    status: 'Upcoming',
  },
  {
    id: 7,
    eventname: 'Music Concert',
    eventimage: 'https://picsum.photos/800',
    eventdescription: 'Experience live performances from top artists.',
    status: 'Ongoing',
  },
  {
    id: 8,
    eventname: 'Startup Pitch Night',
    eventimage: 'https://picsum.photos/900',
    eventdescription: 'Witness innovative ideas from budding entrepreneurs.',
    status: 'Completed',
  },
  {
    id: 9,
    eventname: 'Yoga Retreat',
    eventimage: 'https://picsum.photos/1000',
    eventdescription: 'Relax and rejuvenate with a weekend of yoga and meditation.',
    status: 'Upcoming',
  },
  {
    id: 10,
    eventname: 'Film Festival',
    eventimage: 'https://picsum.photos/1100',
    eventdescription: 'Celebrate the art of cinema with screenings and discussions.',
    status: 'Ongoing',
  },
  {
    id: 11,
    eventname: 'Hackathon 2023',
    eventimage: 'https://picsum.photos/1200',
    eventdescription: 'Code, collaborate, and create innovative solutions.',
    status: 'Completed',
  },
  {
    id: 12,
    eventname: 'Wine Tasting',
    eventimage: 'https://picsum.photos/1300',
    eventdescription: 'Sample exquisite wines from renowned vineyards.',
    status: 'Upcoming',
  },
  {
    id: 13,
    eventname: 'Career Fair',
    eventimage: 'https://picsum.photos/1400',
    eventdescription: 'Connect with top employers and explore job opportunities.',
    status: 'Ongoing',
  },
  {
    id: 14,
    eventname: 'Book Launch',
    eventimage: 'https://picsum.photos/1500',
    eventdescription: 'Celebrate the release of a new bestseller.',
    status: 'Completed',
  },
  {
    id: 15,
    eventname: 'Comedy Night',
    eventimage: 'https://picsum.photos/1600',
    eventdescription: 'Laugh out loud with stand-up comedians.',
    status: 'Upcoming',
  },
  {
    id: 16,
    eventname: 'Science Fair',
    eventimage: 'https://picsum.photos/1700',
    eventdescription: 'Discover groundbreaking scientific projects.',
    status: 'Ongoing',
  },
  {
    id: 17,
    eventname: 'Fashion Show',
    eventimage: 'https://picsum.photos/1800',
    eventdescription: 'Witness the latest trends on the runway.',
    status: 'Completed',
  },
  {
    id: 18,
    eventname: 'Cooking Class',
    eventimage: 'https://picsum.photos/1900',
    eventdescription: 'Learn to cook gourmet dishes from expert chefs.',
    status: 'Upcoming',
  },
  {
    id: 19,
    eventname: 'Marathon',
    eventimage: 'https://picsum.photos/2000',
    eventdescription: 'Run through the city and challenge your limits.',
    status: 'Ongoing',
  },
  {
    id: 20,
    eventname: 'Photography Workshop',
    eventimage: 'https://picsum.photos/2100',
    eventdescription: 'Master the art of photography with professional guidance.',
    status: 'Completed',
  },
  {
    id: 21,
    eventname: 'Gaming Tournament',
    eventimage: 'https://picsum.photos/2200',
    eventdescription: 'Compete in thrilling gaming battles for exciting prizes.',
    status: 'Upcoming',
  },
  {
    id: 22,
    eventname: 'Dance Performance',
    eventimage: 'https://picsum.photos/2300',
    eventdescription: 'Enjoy mesmerizing dance routines by talented performers.',
    status: 'Ongoing',
  },
  {
    id: 23,
    eventname: 'Business Networking',
    eventimage: 'https://picsum.photos/2400',
    eventdescription: 'Connect with industry leaders and expand your network.',
    status: 'Completed',
  },
  {
    id: 24,
    eventname: 'Astronomy Night',
    eventimage: 'https://picsum.photos/2500',
    eventdescription: 'Explore the night sky and learn about the stars.',
    status: 'Upcoming',
  },
  {
    id: 25,
    eventname: 'Craft Fair',
    eventimage: 'https://picsum.photos/2600',
    eventdescription: 'Shop for unique handmade crafts and artworks.',
    status: 'Ongoing',
  },
  {
    id: 26,
    eventname: 'Ted Talk',
    eventimage: 'https://picsum.photos/2700',
    eventdescription: 'Get inspired by thought-provoking talks from experts.',
    status: 'Completed',
  },
  {
    id: 27,
    eventname: 'Cycling Race',
    eventimage: 'https://picsum.photos/2800',
    eventdescription: 'Pedal your way to victory in this exciting race.',
    status: 'Upcoming',
  },
  {
    id: 28,
    eventname: 'Poetry Slam',
    eventimage: 'https://picsum.photos/2900',
    eventdescription: 'Experience the power of spoken word poetry.',
    status: 'Ongoing',
  },
  {
    id: 29,
    eventname: 'Farmers Market',
    eventimage: 'https://picsum.photos/3000',
    eventdescription: 'Shop for fresh, organic produce and local goods.',
    status: 'Completed',
  },
  {
    id: 30,
    eventname: 'Virtual Reality Expo',
    eventimage: 'https://picsum.photos/3100',
    eventdescription: 'Immerse yourself in the world of VR and AR technologies.',
    status: 'Upcoming',
  },
];

export default function Profile({ route, navigation }: any) {
  const colorScheme = useColorScheme();

  // Destructure parameters; fallback if needed
  const { id, name, image, description, username } = route.params || {};

  // Placeholder background image
  const backgroundSource = require('../assets/profileBackground.jpg');

  // Refresh Control
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  // Status bar
  useFocusEffect(
    useCallback(() => {
      StatusBar.setHidden(false);
      return () => StatusBar.setHidden(true);
    }, [])
  );

  // Logout function
  async function logout(navigation: any) {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogIn' }],
      });
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  }

  // Calculate event stats
  const totalEvents = eventdata.length;
  const completedCount = eventdata.filter(e => e.status.toLowerCase() === 'completed').length;
  const ongoingCount = eventdata.filter(e => e.status.toLowerCase() === 'ongoing').length;
  const upcomingCount = eventdata.filter(e => e.status.toLowerCase() === 'upcoming').length;

  return (
    <ImageBackground
      source={backgroundSource}
      style={styles.background}
      resizeMode="cover"
    >
      {/* 
        Bottom Blur Container:
        This absolutely positioned container covers ~60% of the screen at the bottom,
        with a BlurView + a 3-stop gradient for a smooth fade.
      */}
      <View style={styles.bottomBlurContainer}>
        <BlurView intensity={50} style={StyleSheet.absoluteFillObject} />
        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',    // Transparent at top
            'rgba(255,255,255,0.5)',  // Semi-transparent
            'rgba(255,255,255,1)',    // Opaque white at bottom
          ]}
          locations={[0, 0.7, 1]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>

      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          translucent
          //barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          barStyle={'light-content'}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
        >
          {/* ============== BLURRED PROFILE HEADER ============== */}
          <View style={styles.profileHeader}>
            {/* 
              The BlurView for the profile header itself. 
              We use absoluteFillObject so it covers the entire header area. 
            */}
            <BlurView intensity={40} style={StyleSheet.absoluteFillObject} />

            {/* 
              The actual content (photo, text, etc.) 
              goes on top of the blur inside this container.
            */}
            <View style={styles.profileHeaderContent}>
              {/* Profile Photo */}
              <Image source={require('../assets/KitConner.jpg')} style={styles.profileImage} />

              {/* Total Number of Events */}
              <Text style={styles.eventCount}>{totalEvents} Events</Text>

              {/* User's Name */}
              <Text style={styles.profileName}>{name || 'John Doe'}</Text>

              {/* Roles / Tags */}
              <View style={styles.roleContainer}>
                <Text style={styles.roleText}>Coach</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.roleText}>Architecture</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.roleText}>Personal Growth</Text>
              </View>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{completedCount}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{ongoingCount}</Text>
                  <Text style={styles.statLabel}>Ongoing</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>{upcomingCount}</Text>
                  <Text style={styles.statLabel}>Upcoming</Text>
                </View>
              </View>

              {/* Short Description */}
              <Text style={styles.description}>
                "{description || 'Short description about the user...'}"
              </Text>

              {/* Bottom Buttons (Edit & Logout) */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.editButton} onPress={() => Alert.alert("Edit Profile")}>
                  <Text style={styles.editText}>EDIT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={() => logout(navigation)}>
                  <Text style={styles.logoutText}>LOG OUT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* ============== END PROFILE HEADER ============== */}

          {/* ============== EVENTS SECTION ============== */}
          <BlurView intensity={20}>
          <View style={styles.eventSection}>
            <Text style={styles.eventTitle}>Your Events</Text>
            {eventdata.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => Alert.alert("Event Clicked", `You selected: ${item.eventname}`)}
              >
                <View style={styles.eventCard}>
                  <Image source={{ uri: item.eventimage }} style={styles.eventImage} />
                  <View style={styles.eventTextContainer}>
                    <Text style={styles.eventName}>{item.eventname}</Text>
                    <Text style={styles.eventDescription}>{item.eventdescription}</Text>
                    <Text style={styles.eventStatus}>{item.status}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          </BlurView>
          
          {/* ============== END EVENTS SECTION ============== */}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// ====== Styles ======
const styles = StyleSheet.create({
  /* Background & Container */
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },

  /* 
    Bottom Blur Container 
    (covering ~60% of screen at bottom, 
    with 3-stop gradient for a smoother fade)
  */
  bottomBlurContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },

  /* Blurred Profile Header */
  profileHeader: {
    marginHorizontal: 20,
    marginTop: 200,
    borderRadius: 30,
    overflow: 'hidden', // Important for containing the blur
  },
  profileHeaderContent: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
  },
  eventCount: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    marginBottom: 5,
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  roleText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  dot: {
    color: '#000',
    marginHorizontal: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  statBox: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statNumber: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
  },
  description: {
    fontSize: 15,
    color: '#000',
    fontStyle: 'italic',
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  /* Buttons at the bottom of the profile header */
  buttonRow: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'center', // Center them in the container
    alignItems: 'center',
    width: '80%', // Narrower container so they don't spread out too much
    alignSelf: 'center', // Center the container itself
    marginTop: 14,
  },
  
  editButton: {
    backgroundColor: '#7e57c2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10, // Adds space on left/right
  },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10,
  },  
  editText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  /* Events Section */
  eventSection: {
    marginTop: 30,
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 20,
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    alignSelf: 'center',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    // Shadows
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventTextContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDescription: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  eventStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#007AFF',
  },
});
