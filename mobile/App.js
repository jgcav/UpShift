import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./Components/LandingScreen";
import { RoutePlanner } from "./Components/RoutePlanner";


import LoginScreen from "./Components/LoginScreen";
import SignUpScreen from "./Components/SignUpScreen";
import { AuthProvider } from "./contexts/AuthContext";
import "react-native-gesture-handler";
import ProfileScreen from "./Components/ProfileScreen";
import ProfileMakerScreen from "./Components/ProfileMakerScreen";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";


export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) return <RoutePlanner />;

  const Stack = createStackNavigator();
  return (

    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen }options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUpScreen}options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="Profile" component={ProfileScreen}options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen
            name="ProfileMaker"
            component={ProfileMakerScreen}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>

  );
}
