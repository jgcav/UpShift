import React, { useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import ChatsCard from "./ChatsCard";
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
export default function ChatListScreen({ navigation: { navigate } }) {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();
  function getChats() {
    const docsRef = collection(
      db,
      "profiles",
      `${currentUser.uid}`,
      "chatRooms"
    );
    return getDocs(docsRef).then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return doc.data();
      });
    });
  }
  useEffect(() => {
    getChats().then((rooms) => {
      setChats(rooms);
    });
  }, []);
  return (
    <View>
      {chats.map((chat, index) => {
        return <ChatsCard chat={chat} navigate={navigate} key={chat.roomId} />;
      })}
    </View>
  );
}
