import React from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileInputs from "./ProfileInputs";

export default function ProfileMakerScreen({ navigation: { navigate } }) {
  const { height, width } = Dimensions.get("window");
  return (
    <ImageBackground
      source={require("../assets/bike3.png")}
      style={{ width: width, height: height }}
    >
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={style.container}
        >
          <SafeAreaView>
            <ProfileInputs navigate={navigate} />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
