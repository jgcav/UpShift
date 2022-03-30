import React from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileInputs from "./ProfileInputs";

export default function ProfileMakerScreen({ navigation: { navigate } }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <ScrollView>
        <SafeAreaView>
          <ProfileInputs navigate={navigate} />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
