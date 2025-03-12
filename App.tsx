import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./screens/dashboard";
import LogIn from "./screens/login";
import Event from "./screens/event";
import Profile from "./screens/profile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen 
          name="LogIn" 
          component={LogIn} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Dashboard" 
        component={Dashboard} 
        options={{ headerShown: false }}
        />
        <Stack.Screen name="Event" 
        component={Event} 
        options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile"
        component={Profile}
        options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};