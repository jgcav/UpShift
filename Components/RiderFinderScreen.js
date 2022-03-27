import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import {
  collection,
  getDocs,
  query,
  limit,
  getDoc,
  doc,
} from "firebase/firestore";
import firebase from "../config/firebase.js";
import RiderCard from "./RiderCard";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.js";

const db = firebase.firestore();

export default function RiderFinder({ navigation: { navigate } }) {
  const [riders, setRiders] = useState([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  function getRiders() {
    const Proms = [
      getDocs(query(collection(db, "profiles"), limit(10))),
      getDoc(doc(db, `profiles/${currentUser.uid}`)),
    ];
    return Promise.all(Proms).then(([snapshot, docSnap]) => {
      let profiles = snapshot.docs.map((doc) => {
        return doc.data();
      });
      const { connected } = docSnap.data();
      profiles = profiles.filter((profile) => !connected.includes(profile.uid));
      return profiles;
    });
  }

  useEffect(() => {
    getRiders().then((profiles) => {
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
