import React, { useState, useEffect } from "react";
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import Message from "./Message";
import io from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";
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
const socket = io("http://localhost:3000");

const db = firebase.firestore();

export default function ChatScreen({ route }) {
  const roomId = route.params.roomId;
  const [currentMessage, setCurrentMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const { currentUser } = useAuth();

  function getMessages() {
    const q = query(
      collection(db, "rooms", `${roomId}`, "messages"),
      orderBy("timestamp", "desc"),
      limit(12)
    );

    return getDocs(q)
      .then((snapshot) => {
        const messages = snapshot.docs
          .slice(0)
          .reverse()
          .map((doc) => {
            const message = { ...doc.data() };
            console.log(doc.data());
            const d = new Date(
              Number(
                "" +
                  message.timestamp.seconds +
                  message.timestamp.nanoseconds / 1000000
              )
            );
            const msg = {
              message: message.message,
              firstName: message.firstName,
              lastName: message.lastName,
              timestamp: `${("0" + d.getHours()).slice(-2)}:${(
                "0" + d.getMinutes()
              ).slice(-2)}`,
            };
            return msg;
          });
        return messages;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function postMessage(content) {
    return addDoc(collection(db, `rooms/${roomId}/messages`), content).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  function getProfile() {
    const docRef = doc(db, "profiles", `${currentUser.uid}`);

    return getDoc(docRef)
      .then((docSnap) => {
        console.log(docSnap);
        const { firstName, lastName } = docSnap.data();
        return { firstName, lastName };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    socket.emit("join room", roomId);
    getProfile().then((profile) => {
      setUserProfile(profile);
    });
    getMessages().then((msgs) => {
      setChat(msgs);
    });
  }, []);

  useEffect(() => {
    function messageListener(message) {
      const d = new Date(message.timestamp);
      message.timestamp = `${("0" + d.getHours()).slice(-2)}:${(
        "0" + d.getMinutes()
      ).slice(-2)}`;
      setChat((currChat) => [...currChat, message]);
    }
    socket.on("chat message", messageListener);
    return () => {
      socket.off("chat message", messageListener);
    };
  }, [socket]);

  function handleSubmit() {
    const content = {
      message: currentMessage,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      roomId: roomId,
      timestamp: new Date(),
    };
    socket.emit("chat message", content);
    postMessage(content);
    setCurrentMessage("");
  }

  return (
    <View style={styles.container}>
      {chat.map((message, index) => {
        return <Message key={index} message={message} />;
      })}

      <View style={styles.messageField}>
        <TextInput
          placeholder="Enter Your Message Here..."
          placeholderTextColor={"black"}
          value={currentMessage}
          onChangeText={setCurrentMessage}
        ></TextInput>
        <Button title="submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageField: {
    alignItems: "center",
    textAlign: "center",
    position: "absolute",
    bottom: 0,
  },
});
