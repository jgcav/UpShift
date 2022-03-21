import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

export default function ProfileMakerScreen() {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <TextInput
        style={style.input}
        placeholder="First Name"
        placeholderTextColor={"black"}
      ></TextInput>
      <TextInput
        style={style.input}
        placeholder="Last Name"
        placeholderTextColor={"black"}
      ></TextInput>
      <TextInput
        style={style.input}
        placeholder="Date of Birth"
        placeholderTextColor={"black"}
      ></TextInput>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    backgroundColor: "red",
    marginBottom: 20,
    color: "black",
    paddingHorizontal: 10,
  },
});
