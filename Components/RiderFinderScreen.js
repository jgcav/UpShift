import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import firebase from "../config/firebase.js";
import RiderCard from "./RiderCard";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.js";

const db = firebase.firestore();

export default function RiderFinder({ navigation: { navigate } }) {
  const [riders, setRiders] = useState([]);
  const { currentUser } = useAuth();

  function getRider() {
    const q = collection(db, "profiles");

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
      console.log(profiles, "in pro");
      setRiders(profiles);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {riders.map((rider, index) => {
        return <RiderCard rider={rider} navigate={navigate} key={index} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
