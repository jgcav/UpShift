import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Touchable,
  KeyboardAvoidingView,
  StatusBar,
  Button,
} from "react-native";

export default function LandingScreen({ navigation }) {
  return (
    <View>
      <Button
        title="signUp"
        onPress={() => navigation.navigate("SignUpScreen")}
      />
      <Button
        title="login"
        onPress={() => navigation.navigate("LoginScreen")}
      />
      <Button
        title="profile"
        onPress={() => navigation.navigate("ProfileMakerScreen")}
      />
    </View>
  );
}
