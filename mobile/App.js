import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "./config/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./Components/LandingScreen";
import { RoutePlanner } from "./Components/RoutePlanner";
const db = firebase.firestore().collection("dev");

export default function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   db.get().then((snapshot) => {
  //     const data = [];
  //     snapshot.forEach((doc) => {
  //       const { name } = doc.data();
  //       data.push(name);
  //     });
  //     setData(data);
  //     // setLoading(false);
  //   });
  // }, []);

  if (loading) return <RoutePlanner />;
  // return (
  //   <View>
  //     <Text>Loading...</Text>
  //   </View>
  // );

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
