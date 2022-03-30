import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text, Card, Icon, Button } from "@rneui/base";
import { getDoc, doc } from "firebase/firestore";
import firebase from "../config/firebase";
import { getProfile } from "../utils/firebaseFuncs";

const db = firebase.firestore();

export default function ChatsCard({ chat, navigate }) {
  const [userProfile, setUserProfile] = useState({});
  const [recent, setRecent] = useState({
    uid: "",
    message: "",
    timestamp: "",
    last: "",
  });

  function getRecentMsg() {
    const docRef = doc(db, "rooms", `${chat.roomId}`);
    return getDoc(docRef)
      .then((docSnap) => {
        return docSnap.data();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const Proms = [getProfile(chat.chatterId), getRecentMsg()];
    Promise.all(Proms).then(([profile, m]) => {
      setUserProfile(profile);
      if (m !== undefined) {
        const d = new Date(16487358270000);
        const yearD = d.getFullYear();
        const monthD = d.getMonth();
        const dayD = d.getDate();
        const ts = new Date(m.timestamp.seconds * 1000);
        const year = ts.getFullYear();
        const month = ts.getMonth();
        const day = ts.getDate();
        const hour = ts.getHours();
        const minute = ts.getMinutes();
        console.log(year, yearD, month, monthD, day, dayD);
        if (year === yearD && month === monthD && day === dayD) {
          m.last = `${("0" + hour).slice(-2)}:${("0" + minute).slice(-2)}`;
          console.log("1");
        } else if (year === yearD) {
          m.last = `${("0" + (month + 1)).slice(-2)}-${("0" + day).slice(-2)}`;
        } else {
          m.last = `${("0" + year).slice(-2)}-${("0" + (month + 1)).slice(
            -2
          )}-${("0" + day).slice(-2)}`;
        }
        if (m.message.length > 20) {
          m.message = m.message.substring(0, 20);
        }
        setRecent(m);
      }
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigate("Chat", { roomId: chat.roomId });
      }}
    >
      <Card
        // style={styles.container}
        containerStyle={{
          margin: 0,
          padding: 0,
          paddingVertical: 10,
          borderBottomWidth: 3,
        }}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logo}
              source={{
                uri: userProfile.img,
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Card.Title
              style={{ textAlign: "left" }}
            >{`${userProfile.firstName} ${userProfile.lastName}`}</Card.Title>
            <View style={styles.recentContainer}>
              <Text style={{ paddingRight: 10 }}>
                {recent.message === "" ? "Send a Message!" : recent.message}
              </Text>
              <Text>{recent.last === "" ? "" : recent.last}</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  recentContainer: {
    flexDirection: "row",
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
});
