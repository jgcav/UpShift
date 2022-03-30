import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, } from "react-native";
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
import { Text, Card, Icon, Button } from "@rneui/base";


const db = firebase.firestore();
export default function RequestCard({
 
  profile,
  navigate,
  setInteracted,
 
}) {
  const { currentUser } = useAuth();

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

  return (
        <Card containerStyle={{}} wrapperStyle={{}} style={styles.containers}>
          <Card.Title >{`${profile.firstName} ${profile.lastName}`}</Card.Title>
<Card.Divider/>
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
        <Text>{`${profile.firstName} ${profile.lastName}`}</Text>
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
  containers: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "white",

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
  },
  logo: {
    marginVertical: 5,
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#CFDDF6",
    marginRight: 5,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#7379C6",
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
