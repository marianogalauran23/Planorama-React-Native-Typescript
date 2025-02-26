import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageBackground,
} from 'react-native';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 250;
const CARD_HEIGHT = 350;
const SPACING = 16;

/** Sample Data */
const events = [
  {
    id: '1',
    title: "Divina's Birthday",
    imageUrl:
      'https://images.unsplash.com/photo-1734779205618-30ee0220f56f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Corporate Dinner',
    imageUrl:
      'https://images.unsplash.com/photo-1740328398503-20fe0f3ff00f?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Wedding Reception',
    imageUrl:
      'https://images.unsplash.com/photo-1740389029981-a891776cf0ad?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Anniversary Party',
    imageUrl:
      'https://images.unsplash.com/photo-1505845572827-856bb1144172?ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VsZWJyYXRpb24lMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.0.3',
  },
];

export default function Dashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  // This animated value will track horizontal scrolling
  const scrollX = useRef(new Animated.Value(0)).current;

  // When scrolling finishes, figure out which card is in the center
  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    // Each item is CARD_WIDTH + SPACING wide
    const index = Math.round(offset / (CARD_WIDTH + SPACING));
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Blurred background of the active (center) card */}
      <ImageBackground
        source={{ uri: events[activeIndex].imageUrl }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={20}
      >
        {/* Dark overlay for contrast */}
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Carousel of cards */}
      <Animated.FlatList
        data={events}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        // Each card is CARD_WIDTH + SPACING wide
        snapToInterval={CARD_WIDTH + SPACING}
        snapToAlignment="center"
        // Center the first item
        contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 2 }}
        // Capture scroll position
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item, index }) => {
          // We figure out how far each card is from the center to scale/darken
          const inputRange = [
            (index - 1) * (CARD_WIDTH + SPACING),
            index * (CARD_WIDTH + SPACING),
            (index + 1) * (CARD_WIDTH + SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: 'clamp',
          });

          const darken = scrollX.interpolate({
            inputRange,
            // 0 => no dark overlay, 0.5 => half-dark
            outputRange: [0.4, 0, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ width: CARD_WIDTH }}>
              <Animated.View
                style={[
                  styles.card,
                  {
                    transform: [{ scale }],
                  },
                ]}
              >
                <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
                {/* Dark overlay for side cards */}
                <Animated.View
                  style={[
                    styles.darkOverlay,
                    {
                      backgroundColor: 'rgba(0,0,0,1)',
                      opacity: darken,
                    },
                  ]}
                />
                {/* Info at the bottom */}
                <BlurView intensity={50} style={styles.infoContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
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
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    marginHorizontal: SPACING / 2,
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
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
