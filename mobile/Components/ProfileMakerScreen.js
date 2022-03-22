import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import ProfileInputs from "./ProfileInputs";

export default function ProfileMakerScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
      // keyboardVerticalOffset={10}
    >
      <ScrollView>
        <ProfileInputs />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#3498db",
    // alignItems: "center",
    flex: 1,
  },
});
