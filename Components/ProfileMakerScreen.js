import React from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import ProfileInputs from "./ProfileInputs";

export default function ProfileMakerScreen({ navigation: { navigate } }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <ScrollView>
        <ProfileInputs navigate={navigate} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#CFDDF6",
    flex: 1,
  },
});
