import React, { useState, useEffect } from "react";
import { Text, TextInput, StyleSheet, View, Button } from "react-native";
import Message from "./Message";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export default function ChatScreen() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    function messageListener(message) {
      setChat((currChat) => [...currChat, message]);
    }
    socket.on("chat message", messageListener);
    return () => {
      socket.off("chat message", messageListener);
    };
  }, [socket]);

  function handleSubmit() {

    socket.emit("chat message", currentMessage)
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
