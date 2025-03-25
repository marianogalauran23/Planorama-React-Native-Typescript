import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

export default function ProgressScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Arrange the Chairs", completed: false },
    { id: 2, text: "Print out the Invitations", completed: false },
    { id: 3, text: "Pick up the Birthday Cake", completed: false },
    { id: 4, text: "Confirm Invitees", completed: false },
    { id: 5, text: "Plan the venue look", completed: false },
  ]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = completedTasks / tasks.length;

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Progress</Text>

          <Calendar
            onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
            markedDates={{ [selectedDate]: { selected: true, marked: true } }}
            theme={{
              selectedDayBackgroundColor: "#6A5AE0",
              todayTextColor: "#6A5AE0",
            }}
          />

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Expenses</Text>
            <BarChart
              data={{
                labels: ["Food", "Venue", "Decor", "Clothing"],
                datasets: [{ data: [30000, 45000, 10000, 2000] }],
              }}
              width={screenWidth - 40} // Adjust width dynamically
              height={200}
              yAxisLabel="₱"
              yAxisSuffix="K"
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(106, 90, 224, ${opacity})`,
              }}
              style={{ borderRadius: 10 }}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.card, styles.progressCard]}>
              <Svg height="100" width="100" viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="45" stroke="#E0E0E0" strokeWidth="10" fill="none" />
                <Circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#6A5AE0"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${progress * 282} ${282}`}
                  strokeLinecap="round"
                  transform="rotate(-90, 50, 50)"
                />
              </Svg>
              <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
              <Text style={styles.sectionTitle}>Progress</Text>
            </View>

            <View style={[styles.card, styles.reminderCard]}>
              <Text style={styles.reminderTitle}>Reminders</Text>
              <Text style={styles.reminderItem}>• Don't forget the birthday cake</Text>
            </View>
          </View>

          <View style={[styles.card, styles.taskContainer]}>
            <Text style={styles.sectionTitle}>Tasks for Today</Text>
            {tasks.map((task) => (
              <TouchableOpacity key={task.id} onPress={() => toggleTask(task.id)} style={styles.taskItem}>
                <Text style={[styles.taskText, task.completed && styles.taskDone]}>
                  {task.completed ? "✓" : "○"} {task.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F5F5" },
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 10, marginVertical: 12 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  progressCard: { alignItems: "center", width: "48%", paddingVertical: 20 },
  progressText: { fontSize: 24, fontWeight: "bold", color: "#6A5AE0", marginTop: 10 },
  reminderCard: { width: "48%", padding: 20 },
  reminderTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  reminderItem: { fontSize: 16, color: "#333" },
  taskContainer: { paddingVertical: 15, paddingHorizontal: 20 },
  taskItem: { paddingVertical: 12 },
  taskText: { fontSize: 18 },
  taskDone: { textDecorationLine: "line-through", color: "gray" },
});

