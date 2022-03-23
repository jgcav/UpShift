import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./Components/LandingScreen";
import { RoutePlanner } from "./Components/RoutePlanner";

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) return <RoutePlanner />;

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
