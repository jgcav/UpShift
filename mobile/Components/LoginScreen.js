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
} from "react-native";

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView behavior="padding" style={style.container}>
      <StatusBar barStyle="light-content" />
      <TextInput
        style={style.input}
        placeholder="Email"
        placeholderTextColor={"rgba(255,255,255,0.6)"}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={style.input}
        placeholder="Password"
        placeholderTextColor={"rgba(255,255,255,0.6)"}
        secureTextEntry
        returnKeyType="go"
      />
      <TouchableOpacity style={style.buttonContainer}>
        <Text style={style.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
const style = StyleSheet.create({
  container: {
      backgroundColor: "green"
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
    color: "white",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#0984E3",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
