import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import firebase from "../config/firebase.js";
import { getProfile } from "../utils/firebaseFuncs";
import { Text, Card, Icon, Button } from "@rneui/base";

const db = firebase.firestore();
export default function RequestCard({ profile, navigate, setInteracted }) {
  const { currentUser } = useAuth();
  const [distance, setDistance] = useState(1);
  function createChatRoom() {
    const chatRoomRef = doc(
      collection(db, `profiles/${currentUser.uid}/chatRooms`)
    );
    const Proms = [
      setDoc(chatRoomRef, {
        chatterId: profile.uid,
        roomId: chatRoomRef.id,
      }),
      setDoc(doc(db, `profiles/${profile.uid}/chatRooms/${chatRoomRef.id}`), {
        chatterId: currentUser.uid,
        roomId: chatRoomRef.id,
      }),
      updateDoc(doc(db, "profiles", `${profile.uid}`), {
        requests: arrayRemove(`${currentUser.uid}`),
      }),
      updateDoc(doc(db, "profiles", `${currentUser.uid}`), {
        requests: arrayRemove(`${profile.uid}`),
      }),
      updateDoc(doc(db, "profiles", `${currentUser.uid}`), {
        connected: arrayUnion(`${profile.uid}`),
      }),
      updateDoc(doc(db, "profiles", `${profile.uid}`), {
        connected: arrayUnion(`${currentUser.uid}`),
      }),
    ];
    Promise.all(Proms).then(() => {
      setInteracted(true);
    });
  }

  function deleteRequest() {
    const Proms = [
      updateDoc(doc(db, "profiles", `${profile.uid}`), {
        requests: arrayRemove(`${currentUser.uid}`),
      }),
      updateDoc(doc(db, "profiles", `${currentUser.uid}`), {
        requests: arrayRemove(`${profile.uid}`),
      }),
    ];
    Promise.all(Proms).then(() => {
      setInteracted(true);
    });
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    getProfile(currentUser.uid).then((user) => {
      let km = Math.floor(
        getDistanceFromLatLonInKm(
          user.location[0],
          user.location[1],
          profile.location[0],
          profile.location[1]
        )
      );
      if (km < 1) km = 1;
      setDistance(km);
    });
  }, []);

  return (
    <Card containerStyle={{}} wrapperStyle={{}} style={styles.containers}>
      <Card.Title
        style={{ fontSize: 20 }}
      >{`${profile.firstName} ${profile.lastName}`}</Card.Title>
      <Card.Divider />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: profile.img,
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text>{`${distance} km away`}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text} onPress={createChatRoom}>
            Accept
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.text} onPress={deleteRequest}>
            Decline
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#ffff",
  },

  imageContainer: {
    flex: 1.1,
    alignItems: "center",
    marginLeft: 8,
    justifyContent: "flex-end",
  },
  infoContainer: {
    flex: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 10,
  },
  logo: {
    marginVertical: 0,
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0,
    paddingHorizontal: 1,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#CFDDF6",
    marginRight: 5,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0,
    paddingHorizontal: 2,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#7379C6",
    marginRight: 2,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
