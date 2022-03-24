import React, { useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import firebase from "../config/firebase";

const db = firebase.firestore();
export default function ChatsCard({ chat, navigate }) {
  const [userProfile, setUserProfile] = useState({});

  function getProfile() {
    const docRef = doc(db, "profiles", `${chat.chatterId}`);

    return getDoc(docRef)
      .then((docSnap) => {
        const { firstName, lastName } = docSnap.data();
        return { firstName, lastName };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProfile().then((profile) => {
      console.log(profile);
      setUserProfile(profile);
    });
  }, []);

  return (
    <View>
      <Text
        onPress={() => {
          navigate("Chat", { roomId: chat.roomId });
        }}
      >
        {`${userProfile.firstName} ${userProfile.lastName}`}
      </Text>
    </View>
  );
}
