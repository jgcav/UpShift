import React, { useEffect, useState } from "react";

import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import ChatsCard from "./ChatsCard";
import { collection, getDocs } from "firebase/firestore";
import firebase from "../config/firebase";
import { useIsFocused } from "@react-navigation/native";

const db = firebase.firestore();
export default function ChatListScreen({ navigation: { navigate } }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    });
  }, [isFocused]);

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

  return (
    <ScrollView>
      <Text style={styles.text}>Messages</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigate("Message Requests");
        }}
      >
        <Text style={styles.texts}>Requests</Text>
      </TouchableOpacity>
      {chats.map((chat, index) => {
        return <ChatsCard chat={chat} navigate={navigate} key={chat.roomId} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 7,
    elevation: 3,
    backgroundColor: "powderblue",
    marginRight: 5,
  },
  text: {
    paddingVertical: 25,
    paddingHorizontal: 9,
    fontSize: 40,
    // lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    backgroundColor: "#ffff",
  },
  texts: {
    alignItems: "flex-end",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  loading: {
    width: 100,
    height: 100,
  },
});
