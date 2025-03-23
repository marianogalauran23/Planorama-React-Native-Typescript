import { View, Text, StatusBar, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

export default function AddEvent({ navigation }: any) {
  useEffect(() => {
    StatusBar.setHidden(false);
    StatusBar.setBarStyle("dark-content");

    return () => {
      StatusBar.setHidden(true); // Hide again when leaving
      StatusBar.setBarStyle("light-content"); // Reset to default
    };
  }, []);

  return (
    <View>
      <StatusBar backgroundColor="white" />
      <Text>Add Event Screen</Text>
      <View>
        <Text>Create an event</Text>
        <Text>Step 1 of 2: Event Details</Text>
      </View>
      <View>
        <Text>Event Name</Text>
        <TextInput></TextInput>
        <View>
          <Text>Budget</Text>
          <TextInput></TextInput>
          <Text>Date</Text>
          <TextInput></TextInput>
        </View>
        <Text>Location</Text>
        <TextInput></TextInput>

        <Text>Description</Text>
        <TextInput></TextInput>

        <TouchableOpacity>
          <Text>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
