import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { AuthProvider } from "./contexts/AuthContext";
import { RoutePlanner } from "./Components/RoutePlanner";
import LoginScreen from "./Components/LoginScreen";
import SignUpScreen from "./Components/SignUpScreen";
import ProfileScreen from "./Components/ProfileScreen";
import ProfileMakerScreen from "./Components/ProfileMakerScreen";
import ChatScreen from "./Components/ChatScreen";
import ChatListScreen from "./Components/ChatListScreen";
import RiderFinderScreen from "./Components/RiderFinderScreen";
import RiderProfileScreen from "./Components/RiderProfileScreen";
import MessageRequestsScreen from "./Components/MessageRequestsScreen";
export default function App() {
  const [loading, setLoading] = useState(false);

  if (loading) return <RoutePlanner />;

  const Stack = createStackNavigator();
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="ProfileMaker"
            component={ProfileMakerScreen}
          ></Stack.Screen>
          <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
          <Stack.Screen
            name="ChatList"
            component={ChatListScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Rider Finder"
            component={RiderFinderScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Rider Profile"
            component={RiderProfileScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="Message Requests"
            component={MessageRequestsScreen}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
