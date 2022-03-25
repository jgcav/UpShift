import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import firebase from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";
import { connectStorageEmulator } from "@firebase/storage";

const db = firebase.firestore();
export default function MessageRequestsScreen() {
  const [profiles, setProfiles] = useState([]);
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
      const proms = [];
      docSnap.data().requests.forEach((eID) => {
        proms.push(getProfile(eID));
      });
      return proms;
    });
  }
  useEffect(() => {
    getRequests()
      .then((proms) => {
        return Promise.all(proms);
      })
      .then((profiles) => {
        setProfiles(profiles);
      });
  }, []);
  return (
    <View>
      <Text>MessageRequests</Text>
    </View>
  );
}
// we are going to display a list of user cards as requests
//array of requests from the MR T profile
// get harrisons profiles (because we know he has sent a request ) on a card
// get the profile pictures (separate promise)
