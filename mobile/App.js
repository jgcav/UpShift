import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "./config/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import LoginScreen from "./Components/LoginScreen";
import SignUpScreen from "./Components/SignUpScreen";
import { AuthProvider } from "./contexts/AuthContext";
import "react-native-gesture-handler";
import ProfileScreen from "./Components/ProfileScreen";
import ProfileMakerScreen from "./Components/ProfileMakerScreen";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";


export default function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const db = firebase.firestore().collection("dev");

  useEffect(() => {
    db.get().then((snapshot) => {
      const data = [];

      snapshot.forEach((doc) => {
        const { name } = doc.data();

        data.push(name);
      });
      setData(data);
      ``;
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
        <MapView
          style={{ height: "50%", width: "100%" }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
        />
      </View>
    );

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

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    textAlign: "center",
    paddingTop: 50,
  },
});
