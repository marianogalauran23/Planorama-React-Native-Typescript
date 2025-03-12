import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  ImageBackground,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
  Easing,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');


const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = 480;
const SPACING = 16;
const ITEM_CONTAINER_WIDTH = CARD_WIDTH + SPACING;

const belldarkicon = require("../assets/notificationDark.png");
const belllighticon = require("../assets/notificationLight.png");
const adddark = require("../assets/addIconDark.png");
const addlight = require("../assets/addIconLight.png");

// Define the type for an event item
type EventItem = {
  id: string;
  title: string;
  time: string;
  location: string;
  imageUrl: string;
  description?: string;
};

let events: EventItem[] = [
  {
    id: '1',
    title: "Divina's Birthday",
    time: '3:45 - 10:38 pm | Feb. 27 2025',
    location: 'Grande Restaurant, New York',
    imageUrl:
      'https://images.unsplash.com/photo-1734779205618-30ee0220f56f?q=80&w=2070&auto=format&fit=crop',
    description: 'Join us for a memorable and unforgettable event at our beautiful hotel.',
  },
  {
    id: '2',
    title: 'Corporate Dinner',
    time: '7:00 - 11:00 pm | Mar. 5 2025',
    location: 'Skyline Tower, LA',
    imageUrl:
      'https://images.unsplash.com/photo-1740328398503-20fe0f3ff00f?q=80&w=1974&auto=format&fit=crop',
    description: 'We invite you to our upcoming corporate event at our beautiful hotel.',
  },
  {
    id: '3',
    title: 'Wedding Reception',
    time: '5:00 - 11:00 pm | June 10 2025',
    location: 'Rosewood Hall, Chicago',
    imageUrl:
      'https://images.unsplash.com/photo-1740389029981-a891776cf0ad?q=80&w=1974&auto=format&fit=crop',
    description: 'Join us for a memorable and unforgettable event at our beautiful hotel.',
  },
  {
    id: '4',
    title: 'Birthday Party',
    time: '7:00 - 10:00 pm | April 25 2025',
    location: 'The Old Mill, Birmingham',
    imageUrl:
      'https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Join us for a memorable and unforgettable event at our beautiful hotel.',
  },
  {
    id: '5',
    title: 'Baby Shower',
    time: '4:00 - 7:00 pm | May 15 2025',
    location: 'The Cottage, Edinburgh',
    imageUrl:
      'https://images.unsplash.com/photo-1555961064-4bc7ec634bbc?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Join us for a memorable and unforgettable event at our beautiful hotel.',
  },
];

let personInfo = {
  id: 1,
  name: 'John Doe',
  image: 'https://thispersondoesnotexist.com/',
  description: 'Passionate and detail-oriented Computer Science student, currently in my final year. Experienced in Android development, React, and AI-driven solutions. Working on a text-to-speech and speech-to-text system for my thesis while developing an event management system with dynamic Firebase integration.',
  username: '@johndoe',
};

export default function Dashboard({ navigation }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgUri, setBgUri] = useState(events[0].imageUrl);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false); // Track scrolling state
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const lastReportedIndexRef = useRef(activeIndex);

  useEffect(() => {
    const listenerId = scrollX.addListener(({ value }) => {
      const newIndex = Math.round(value / ITEM_CONTAINER_WIDTH);
      if (newIndex !== lastReportedIndexRef.current && newIndex >= 0 && newIndex < events.length) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        lastReportedIndexRef.current = newIndex;
      }
    });
    return () => scrollX.removeListener(listenerId);
  }, []);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / ITEM_CONTAINER_WIDTH);
    setActiveIndex(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsScrolling(false); // Scrolling has ended

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setBgUri(events[index].imageUrl);
      setIsDarkBackground(index % 2 === 0); // Simulated light/dark background switch
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  };

  const handleHeaderPress = () => {
    console.log('Header Pressed!');
    navigation.navigate("Profile", {id: personInfo.id,
      name: personInfo.name,
      image: personInfo.image,
      description: personInfo.description,
      username: personInfo.username,
    });
  };

  const handleBellPress = () => {
    console.log('Bell Icon Pressed!');
  };

  const handleAddPress = () => {
    console.log('Add Container Pressed!');
  };

  const handleCardPress = (item: EventItem) => {
  if (!isScrolling) {
    navigation.navigate("Event", {
      eventId: item.id,  // Passing event ID
      eventTitle: item.title,
      personName: personInfo.name, // Passing event title
      imageUrl: item.imageUrl,
      location: item.location,
      time: item.time,// Passing person's name
      description: item.description ?? 'No Description', // Passing event's location
    });
    console.log('Card Pressed:', item.title);
  }
};

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: fadeAnim }]}>
        <ImageBackground source={{ uri: bgUri }} style={StyleSheet.absoluteFillObject} blurRadius={25}>
          <View style={styles.overlay} />
        </ImageBackground>
      </Animated.View>

      {/* Header with BlurView */}
      <TouchableOpacity onPress={handleHeaderPress}>
        <BlurView intensity={50} style={styles.header}>
          <Image source={{ uri: personInfo.image }} style={styles.profilepic} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.greetingText, { color: isDarkBackground ? '#fff' : '#333' }]}>
              {isDarkBackground ? 'Good Evening!' : 'Good Morning!'}
            </Text>
            <Text style={[styles.nameText, { color: isDarkBackground ? '#ccc' : '#444' }]}>
              {personInfo.name}
            </Text>
          </View>
          <TouchableOpacity onPress={handleBellPress}>
            <Image source={isDarkBackground ? belldarkicon : belllighticon} style={styles.notification} />
          </TouchableOpacity>
        </BlurView>
      </TouchableOpacity>

      <Animated.FlatList
        data={events}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={ITEM_CONTAINER_WIDTH}
        snapToAlignment="center"
        contentContainerStyle={{
          paddingHorizontal: (width - CARD_WIDTH) / 2,
        }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        onScrollBeginDrag={() => setIsScrolling(true)} // Scrolling started
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_CONTAINER_WIDTH,
            index * ITEM_CONTAINER_WIDTH,
            (index + 1) * ITEM_CONTAINER_WIDTH,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: 'clamp',
          });

          const rotateY = scrollX.interpolate({
            inputRange,
            outputRange: ['-5deg', '0deg', '5deg'],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              onPress={() => handleCardPress(item)}
              activeOpacity={isScrolling ? 1 : 0.7} // Disable opacity change during scroll
            >
              <View style={{ width: CARD_WIDTH, alignItems: 'center' }}>
                <Animated.View style={[styles.card, { transform: [{ scale }, { rotateY }] }]}>
                  <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
                  <BlurView intensity={50} style={styles.infoContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSub}>{item.time}</Text>
                    <Text style={styles.cardSub}>{item.location}</Text>
                  </BlurView>
                </Animated.View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Add Button */}
      <View style={styles.circularContainer}>
        <TouchableOpacity onPress={handleAddPress} style={styles.blurBackground}>
          <BlurView intensity={20} style={styles.blurBackground}>
            <Image source={isDarkBackground ? adddark : addlight} style={styles.icon} />
          </BlurView>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 120 }, // Added padding to push content down
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  card: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardSub: {
    color: '#ddd',
    marginTop: 2,
    fontSize: 14,
  },
  header: {
    width: width * 0.9,
    alignSelf: 'center', // Center the header
    flexDirection: 'row',
    alignItems: 'center',
    padding: 23,
    bottom: 40,
    borderRadius: 27,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  profilepic: {
    width: 50,
    height: 50,
    marginEnd: 18,
    borderRadius: 25,
  },
  greetingText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameText: {
    fontSize: 14,
    color: '#555',
  },
  notification: {
    width: 24,
    height: 24,
    marginEnd: 8,
  },
  circularContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 75, // Adds space from the bottom
  },
  blurBackground: {
    width: 70, // Increased size
    height: 70,
    borderRadius: 40, // Keeps it circular
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
  },
  icon: {
    width: 25, // Adjusted to match new container size
    height: 25,
  },
});