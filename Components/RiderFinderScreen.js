import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { collection, getDocs, query, limit } from "firebase/firestore";
import firebase from "../config/firebase.js";
import RiderCard from "./RiderCard";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.js";

const db = firebase.firestore();

export default function RiderFinder({ navigation: { navigate } }) {
  const [riders, setRiders] = useState([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  function getRider() {
    const q = query(collection(db, "profiles"), limit(10));

    return getDocs(q).then((snapshot) => {
      const profiles = [];
      snapshot.docs.slice(0).forEach((doc) => {
        if (doc.data().uid !== currentUser.uid) {
          profiles.push(doc.data());
        }
      });
      return profiles;
    });
  }

  useEffect(() => {
    getRider().then((profiles) => {
      setRiders(profiles);
      setLoading(false);
    });
  }, []);
  if (loading)
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: "#0984E3",
          flex: 1,
        }}
      >
        <Image
          style={styles.loading}
          source={require("../images/GREY-GEAR-LOADING.gif")}
        />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      {riders.map((rider, index) => {
        return (
          <RiderCard
            rider={rider}
            navigate={navigate}
            setLoading={setLoading}
            key={index}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0984E3",
    flex: 1,
  },
  loading: {
    width: 100,
    height: 100,
  },
});
