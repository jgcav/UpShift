import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "./config/firebase";

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
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{data}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
