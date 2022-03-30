import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Message({ message, uid }) {
  return (
    <View
      style={
        message.uid === uid ? styles.containerSender : styles.containerReceiver
      }
    >
      <View style={styles.spacer}></View>
      <View
        style={
          message.uid === uid
            ? styles.containerMsgSender
            : styles.containerMsgReceiver
        }
      >
        <Text style={{ color: "black" }}>{message.message}</Text>
        {/* <Text>{`${message.firstName} ${message.lastName} ${message.timestamp}`}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSender: {
    marginVertical: 5,
    flexDirection: "row",
  },
  containerReceiver: {
    marginVertical: 5,
    flexDirection: "row-reverse",
  },
  spacer: {
    flex: 1,
  },
  containerMsgSender: {
    backgroundColor: "#0099F4",
    borderRadius: 20,
    padding: 10,
    marginLeft: 40,
    marginRight: 20,
  },
  containerMsgReceiver: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
    marginLeft: 20,
    marginRight: 40,
  },
});
