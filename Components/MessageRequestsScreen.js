import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import firebase from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";

import RequestCard from "./RequestCard.js";

const db = firebase.firestore();

export default function MessageRequestsScreen({
  navigation: { navigate },
  route,
}) {
  const { setNewChat } = route.params;
  const [profiles, setProfiles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const { currentUser } = useAuth();

  function getProfile(id) {
    const ref = doc(db, "profiles", `${id}`);
    return getDoc(ref).then((snapshot) => {
      return snapshot.data();
    });
  }

  function getRequests() {
    const docRef = doc(db, "profiles", `${currentUser.uid}`);
    return getDoc(docRef).then((docSnap) => {
      return docSnap.data();
    });
  }
  useEffect(() => {
    getRequests()
      .then((IDs) => {
        const PromsProfiles = [];

        IDs.requests.forEach((ID) => {
          PromsProfiles.push(getProfile(ID));
        });
        return Promise.all(PromsProfiles);
      })
      .then((profiles) => {
        setProfiles(profiles);

        setLoading(false);
      });
  }, [interacted]);

  if (loading) {
    return <Text>loading...</Text>;
  }
  if (interacted) {
  }

  return (
    <ScrollView style={styles.container}>
      {profiles.map((profile, index) => {
        return (
          <RequestCard
            profile={profile}
           
            navigate={navigate}
            setInteracted={setInteracted}
            setNewChat={setNewChat}
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
// we are going to display a list of user cards as requests
// get harrisons profiles (because we know he has sent a request ) on a card
// get the profile pictures (separate promise)
