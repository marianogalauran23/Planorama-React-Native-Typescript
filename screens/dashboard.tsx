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
  Easing, // added easing import
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.8; // 80% of screen width
const CARD_HEIGHT = 480;
const SPACING = 16;
const ITEM_CONTAINER_WIDTH = CARD_WIDTH + SPACING; // effective width per item

const events = [
  {
    id: '1',
    title: "Divina's Birthday",
    time: '3:45 - 10:38 pm | Feb. 27 2025',
    location: 'Grande Restaurant, New York',
    imageUrl:
      'https://images.unsplash.com/photo-1734779205618-30ee0220f56f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Corporate Dinner',
    time: '7:00 - 11:00 pm | Mar. 5 2025',
    location: 'Skyline Tower, LA',
    imageUrl:
      'https://images.unsplash.com/photo-1740328398503-20fe0f3ff00f?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Wedding Reception',
    time: '5:00 - 11:00 pm | June 10 2025',
    location: 'Rosewood Hall, Chicago',
    imageUrl:
      'https://images.unsplash.com/photo-1740389029981-a891776cf0ad?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Anniversary Party',
    time: '6:00 - 10:00 pm | Dec. 15 2025',
    location: 'Lakeview Pavilion, Boston',
    imageUrl:
      'https://images.unsplash.com/photo-1730035375813-88f7f26c3c82?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function Dashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgUri, setBgUri] = useState(events[0].imageUrl);
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const lastReportedIndexRef = useRef(activeIndex);

  // Faint haptics as the estimated center changes while scrolling.
  useEffect(() => {
    const listenerId = scrollX.addListener(({ value }) => {
      const newIndex = Math.round(value / ITEM_CONTAINER_WIDTH);
      if (
        newIndex !== lastReportedIndexRef.current &&
        newIndex >= 0 &&
        newIndex < events.length
      ) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        lastReportedIndexRef.current = newIndex;
      }
    });
    return () => scrollX.removeListener(listenerId);
  }, []);

  const onMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / ITEM_CONTAINER_WIDTH);
    setActiveIndex(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.inOut(Easing.ease), // added easing
        useNativeDriver: true,
      }),
    ]).start(() => {
      setBgUri(events[index].imageUrl);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease), // added easing
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <View>
        {/*This is where the header is*/}
      </View>
      {/* Background with fade transition */}
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: fadeAnim }]}>
        <ImageBackground
          source={{ uri: bgUri }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={25}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </Animated.View>

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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
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
          const darken = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 0, 0.4],
            extrapolate: 'clamp',
          });
          return (
            <View style={{ width: CARD_WIDTH, alignItems: 'center' }}>
              <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
                <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
                <Animated.View style={[styles.darkOverlay, { opacity: darken }]} />
                <BlurView intensity={50} style={styles.infoContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSub}>{item.time}</Text>
                  <Text style={styles.cardSub}>{item.location}</Text>
                </BlurView>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  card: {
    width: '100%', // Take up full width of the container
    marginTop: 160,
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
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    paddingLeft: 23,
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
});
