import React from "react";
<<<<<<< HEAD
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
=======
import { Text, View } from "react-native";

export default function ProfileMakerScreen() {
  return (
    <View>
      <Text>ProfileMakerScreen</Text>
    </View>
  );
}
>>>>>>> fffc6e56b6149d985d3d1858991c716350fd9c01
