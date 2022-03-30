import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
import { useIsFocused } from "@react-navigation/native";

const db = firebase.firestore();
export default function ChatListScreen({ navigation: { navigate } }) {
  const [chats, setChats] = useState([]);
  
  const isFocused = useIsFocused();
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
  }, [isFocused]);
  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigate("Message Requests");
        }}
      >
        <Text style={styles.text}>requested</Text>
      </TouchableOpacity>
      {chats.map((chat, index) => {
        return <ChatsCard chat={chat} navigate={navigate} key={chat.roomId} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "black",
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
