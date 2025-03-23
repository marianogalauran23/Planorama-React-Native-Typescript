import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SectionList,
  Animated,
  Easing,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

type NotificationItem = {
  id: number;
  title: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  type: 'info' | 'warning' | 'error' | 'invitation';
};

// Sample data with varying timestamps
const initialData: NotificationItem[] = [
  {
    id: 1,
    title: 'Event Created',
    body: 'Your event "Tech Conference 2023" has been successfully created.',
    timestamp: new Date(), // Today
    isRead: false,
    type: 'info',
  },
  {
    id: 2,
    title: 'Event Reminder',
    body: 'Your event "Networking Night" is starting in 2 hours.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
    isRead: false,
    type: 'warning',
  },
  {
    id: 3,
    title: 'Event Update',
    body: 'The venue for "Annual Gala Dinner" has been changed to Grand Ballroom.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: true,
    type: 'info',
  },
  {
    id: 4,
    title: 'Event Cancelled',
    body: 'The event "Summer Music Festival" has been cancelled.',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    isRead: false,
    type: 'error',
  },
  {
    id: 5,
    title: 'Invitation Received',
    body: 'You have been invited to collaborate on "Charity Run 2023".',
    timestamp: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), // 40 days ago
    isRead: false,
    type: 'invitation',
  },
  {
    id: 6,
    title: 'RSVP Confirmed',
    body: 'John Doe confirmed for "Product Launch Event".',
    timestamp: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000), // ~1+ year ago
    isRead: false,
    type: 'info',
  },
  {
    id: 7,
    title: 'Event Feedback Request',
    body: 'Please provide feedback for "Tech Conference 2023".',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 8,
    title: 'Event Registration Closed',
    body: 'Registration for "Workshop on AI" is now closed.',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    isRead: false,
    type: 'warning',
  },
  {
    id: 9,
    title: 'Event Payment Received',
    body: 'Payment for "Annual Conference" has been processed.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    isRead: true,
    type: 'info',
  },
  {
    id: 10,
    title: 'Invitation Declined',
    body: 'Jane Smith declined the invitation to "Networking Night".',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    isRead: false,
    type: 'invitation',
  },
  {
    id: 11,
    title: 'Event Schedule Updated',
    body: 'The schedule for "Tech Summit 2023" has been updated.',
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 12,
    title: 'Event Capacity Reached',
    body: 'The event "Startup Pitch Night" has reached its maximum capacity.',
    timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
    isRead: false,
    type: 'warning',
  },
  {
    id: 13,
    title: 'Event Speaker Confirmed',
    body: 'Dr. Emily Carter confirmed as a speaker for "Innovation Conference".',
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 14,
    title: 'Event Postponed',
    body: 'The event "Design Thinking Workshop" has been postponed.',
    timestamp: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 days ago
    isRead: false,
    type: 'error',
  },
  {
    id: 15,
    title: 'Invitation Expired',
    body: 'Your invitation to "Leadership Summit" has expired.',
    timestamp: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000), // 50 days ago
    isRead: false,
    type: 'invitation',
  },
  {
    id: 16,
    title: 'Event Feedback Received',
    body: 'You have received new feedback for "Annual Gala Dinner".',
    timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 17,
    title: 'Event Registration Opened',
    body: 'Registration for "Data Science Bootcamp" is now open.',
    timestamp: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000), // 70 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 18,
    title: 'Event Reminder',
    body: 'Your event "Career Fair 2023" is starting tomorrow.',
    timestamp: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000), // 80 days ago
    isRead: false,
    type: 'warning',
  },
  {
    id: 19,
    title: 'Event Sponsorship Confirmed',
    body: 'TechCorp confirmed sponsorship for "Innovation Conference".',
    timestamp: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 20,
    title: 'Event Error',
    body: 'An error occurred during registration for "Workshop on AI".',
    timestamp: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000), // 100 days ago
    isRead: false,
    type: 'error',
  },
  {
    id: 21,
    title: 'Invitation Accepted',
    body: 'Sarah Lee accepted the invitation to "Product Launch Event".',
    timestamp: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
    isRead: false,
    type: 'invitation',
  },
  {
    id: 22,
    title: 'Event Reminder',
    body: 'Your event "Annual Conference" is starting in 1 hour.',
    timestamp: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000), // 150 days ago
    isRead: false,
    type: 'warning',
  },
  {
    id: 23,
    title: 'Event Feedback Summary',
    body: 'Here’s a summary of feedback for "Tech Conference 2023".',
    timestamp: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 180 days ago
    isRead: true,
    type: 'info',
  },
  {
    id: 24,
    title: 'Event Registration Error',
    body: 'An error occurred during registration for "Charity Run 2023".',
    timestamp: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000), // 200 days ago
    isRead: false,
    type: 'error',
  },
  {
    id: 25,
    title: 'Invitation Sent',
    body: 'Invitations for "Leadership Summit" have been sent.',
    timestamp: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000), // 220 days ago
    isRead: false,
    type: 'invitation',
  },
  {
    id: 26,
    title: 'Event Created',
    body: 'Your event "Virtual Reality Expo" has been created.',
    timestamp: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000), // 240 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 27,
    title: 'Event Reminder',
    body: 'Your event "Gaming Tournament" is starting soon.',
    timestamp: new Date(Date.now() - 260 * 24 * 60 * 60 * 1000), // 260 days ago
    isRead: false,
    type: 'warning',
  },
  {
    id: 28,
    title: 'Event Update',
    body: 'The schedule for "Ted Talk" has been updated.',
    timestamp: new Date(Date.now() - 280 * 24 * 60 * 60 * 1000), // 280 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 29,
    title: 'Event Cancelled',
    body: 'The event "Farmers Market" has been cancelled.',
    timestamp: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000), // 300 days ago
    isRead: false,
    type: 'error',
  },
  {
    id: 30,
    title: 'Invitation Received',
    body: 'You have been invited to "Poetry Slam".',
    timestamp: new Date(Date.now() - 320 * 24 * 60 * 60 * 1000), // 320 days ago
    isRead: false,
    type: 'invitation',
  },
  {
    id: 31,
    title: 'RSVP Confirmed',
    body: 'Alex Johnson confirmed for "Cycling Race".',
    timestamp: new Date(Date.now() - 340 * 24 * 60 * 60 * 1000), // 340 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 32,
    title: 'Event Feedback Request',
    body: 'Please provide feedback for "Cooking Class".',
    timestamp: new Date(Date.now() - 360 * 24 * 60 * 60 * 1000), // 360 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 33,
    title: 'Event Registration Closed',
    body: 'Registration for "Fashion Show" is now closed.',
    timestamp: new Date(Date.now() - 380 * 24 * 60 * 60 * 1000), // 380 days ago
    isRead: false,
    type: 'warning',
  },
  {
    id: 34,
    title: 'Event Payment Received',
    body: 'Payment for "Science Fair" has been processed.',
    timestamp: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000), // 400 days ago
    isRead: true,
    type: 'info',
  },
  {
    id: 35,
    title: 'Invitation Declined',
    body: 'Michael Brown declined the invitation to "Comedy Night".',
    timestamp: new Date(Date.now() - 420 * 24 * 60 * 60 * 1000), // 420 days ago
    isRead: false,
    type: 'invitation',
  },
  {
    id: 36,
    title: 'Event Schedule Updated',
    body: 'The schedule for "Book Launch" has been updated.',
    timestamp: new Date(Date.now() - 440 * 24 * 60 * 60 * 1000), // 440 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 37,
    title: 'Event Capacity Reached',
    body: 'The event "Wine Tasting" has reached its maximum capacity.',
    timestamp: new Date(Date.now() - 460 * 24 * 60 * 60 * 1000), // 460 days ago
    isRead: false,
    type: 'warning',
  },
  {
    id: 38,
    title: 'Event Speaker Confirmed',
    body: 'Dr. Sarah Lee confirmed as a speaker for "Hackathon 2023".',
    timestamp: new Date(Date.now() - 480 * 24 * 60 * 60 * 1000), // 480 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 39,
    title: 'Event Postponed',
    body: 'The event "Yoga Retreat" has been postponed.',
    timestamp: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000), // 500 days ago
    isRead: false,
    type: 'error',
  },
  {
    id: 40,
    title: 'Invitation Expired',
    body: 'Your invitation to "Film Festival" has expired.',
    timestamp: new Date(Date.now() - 520 * 24 * 60 * 60 * 1000), // 520 days ago
    isRead: false,
    type: 'invitation',
  },
  {
    id: 41,
    title: 'Event Feedback Received',
    body: 'You have received new feedback for "Music Concert".',
    timestamp: new Date(Date.now() - 540 * 24 * 60 * 60 * 1000), // 540 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 42,
    title: 'Event Registration Opened',
    body: 'Registration for "Art Exhibition" is now open.',
    timestamp: new Date(Date.now() - 560 * 24 * 60 * 60 * 1000), // 560 days ago
    isRead: false,
    type: 'info',
  },
  {
    id: 43,
    title: 'Event Reminder',
    body: 'Your event "Food Festival" is starting tomorrow.',
    timestamp: new Date(Date.now() - 580 * 24 * 60 * 60 * 1000), // 580 days ago
    isRead: false,
    type: 'warning',
  },
];

// Group notifications by time into fixed categories.
function groupNotifications(notifications: NotificationItem[]) {
  const now = new Date();
  const groups: { [key: string]: NotificationItem[] } = {};

  notifications.forEach((item) => {
    const diffMs = now.getTime() - new Date(item.timestamp).getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    let groupKey = '';
    if (diffDays < 1) {
      groupKey = 'Today';
    } else if (diffDays < 2) {
      groupKey = 'Yesterday';
    } else if (diffDays < 7) {
      groupKey = 'This Week';
    } else if (diffDays < 30) {
      groupKey = 'This Month';
    } else if (diffDays < 365) {
      groupKey = 'This Year';
    } else {
      groupKey = 'Older';
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
  });

  const sections = Object.keys(groups).map((key) => ({
    title: key,
    data: groups[key],
  }));

  // Sort sections by desired order.
  const order = ['Today', 'Yesterday', 'This Week', 'This Month', 'This Year', 'Older'];
  sections.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));

  return sections;
}

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialData);

  // For keeping only one swipeable open at a time.
  const currentlyOpenSwipeable = useRef<Swipeable | null>(null);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('dark-content');
      return () => StatusBar.setHidden(true);
    }, [])
  );

  const deleteNotification = (id: number) => {
    setNotifications((current) => current.filter((n) => n.id !== id));
  };

  const markReadOrAccept = (item: NotificationItem) => {
    if (item.type === 'invitation') {
      console.log(`Accepted invitation #${item.id}`);
      // Additional accept logic here.
    } else {
      console.log(`Marked notification #${item.id} as read`);
      setNotifications((current) =>
        current.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
      );
    }
  };

  // Left swipe: Delete
  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    item: NotificationItem
  ) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View style={[styles.swipeActionContainer, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={['#ff3b30', 'rgba(255,59,48,0)']}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={styles.gradientAction}
        >
          <Text style={styles.swipeActionText}>Delete</Text>
        </LinearGradient>
      </Animated.View>
    );
  };

  // Right swipe: Accept (if invitation) or Mark Read
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    item: NotificationItem
  ) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1],
      extrapolate: 'clamp',
    });
    const label = item.type === 'invitation' ? 'Accept' : 'Mark Read';
    return (
      <Animated.View style={[styles.swipeActionContainer, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={['#34c759', 'rgba(52,199,89,0)']}
          start={[1, 0.5]}
          end={[0, 0.5]}
          style={styles.gradientAction}
        >
          <Text style={styles.swipeActionText}>{label}</Text>
        </LinearGradient>
      </Animated.View>
    );
  };

  const onSwipeableLeftOpen = (item: NotificationItem, swipeableRef: Swipeable | null) => {
    swipeableRef?.close();
    deleteNotification(item.id);
  };

  const onSwipeableRightOpen = (item: NotificationItem, swipeableRef: Swipeable | null) => {
    swipeableRef?.close();
    markReadOrAccept(item);
  };

  const updateSwipeableRef = (ref: Swipeable | null) => {
    if (currentlyOpenSwipeable.current && currentlyOpenSwipeable.current !== ref) {
      currentlyOpenSwipeable.current.close();
    }
    currentlyOpenSwipeable.current = ref;
  };

  const renderItem = ({ item }: { item: NotificationItem }) => {
    return (
      <Swipeable
        ref={(ref) => updateSwipeableRef(ref)}
        renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item)}
        onSwipeableLeftOpen={() => onSwipeableLeftOpen(item, currentlyOpenSwipeable.current)}
        renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
        onSwipeableRightOpen={() => onSwipeableRightOpen(item, currentlyOpenSwipeable.current)}
      >
        <View style={styles.card}>
          <BlurView intensity={50} tint="light" style={styles.blurContainer}>
            <TouchableOpacity style={styles.cardContent}>
              <Text style={[styles.title, item.isRead && styles.readTitle]}>{item.title}</Text>
              <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
              <Text style={styles.timestamp}>{item.timestamp.toLocaleString()}</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Swipeable>
    );
  };

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const sections = groupNotifications(notifications);

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Notification</Text>
        </View>
        <TouchableOpacity style={styles.clearAllButton} onPress={clearAll}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 10,
  },
  headerContainer: {
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginTop: 12,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  clearAllButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#007aff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 15,
    marginTop: -30,
    marginBottom: 10,
  },
  clearAllText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    padding: 12,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#e0e0e0',
    color: '#333',
    borderRadius: 8,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  blurContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  readTitle: {
    color: '#999',
  },
  body: {
    fontSize: 14,
    color: '#444',
    marginTop: 6,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: '#555',
    marginTop: 8,
  },
  swipeActionContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientAction: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeActionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});
