import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import firebase from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";

import RequestCard from "./RequestCard.js";

const db = firebase.firestore();

export default function MessageRequestsScreen({
  navigation: { navigate },
  route,
}) {
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

  if (loading)
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Image
          style={styles.loading}
          source={require("../images/GREY-GEAR-LOADING.gif")}
        />
      </View>
    );
  if (interacted) {
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {profiles.map((profile, index) => {
        return (
          <RequestCard
            profile={profile}
            navigate={navigate}
            setInteracted={setInteracted}
            key={index}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    width: 100,
    height: 100,
  },
});
