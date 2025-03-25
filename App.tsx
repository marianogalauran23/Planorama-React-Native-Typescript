import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./screens/dashboard";
import LogIn from "./screens/login";
import Event from "./screens/event";
import Profile from "./screens/profile";
import AddingEvent from "./screens/addingEvent";
import Progress from "./screens/progress";
import Notification from "./screens/notification";
import Invitees from "./screens/invitingUsers";
import SignUp from "./screens/SignUp";
import Authentication from "./screens/otp";
import Edit from "./screens/Edit";

type RootStackParamList = {
  LogIn: undefined;
  SignUp: undefined;
  Authentication: undefined;
  Dashboard: undefined;
  Notification: undefined;
  Event: undefined;
  Edit: undefined;
  Progress: undefined;
  Profile: undefined;
  "Creating Event": undefined;
  Invitees: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Authentication" component={Authentication} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: true }} />
        <Stack.Screen name="Event" component={Event} options={{ headerShown: false }} />
        <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }} />
        <Stack.Screen name="Progress" component={Progress} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Creating Event" component={AddingEvent} options={{ headerShown: false }} />
        <Stack.Screen name="Invitees" component={Invitees} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
