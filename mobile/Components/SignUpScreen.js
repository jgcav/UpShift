import React, { useRef, useState } from "react";
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
import { useAuth } from "../contexts/AuthContext";

export default function SignUpScreen({ navigation: { navigate } }) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmRef = useRef("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("pressed");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      console.log("Passwords do not match");
      return setError("Passwords do not match");
    }
    setError("");
    setLoading(true);
    console.log(
      emailRef.current
      // passwordRef.current,
      // passwordConfirmRef.current
    );
    signup(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        navigate("Profile");
      })
      .catch(() => {
        setError("Failed to set-up account");
        console.log("Failed to set-up account");
      });
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={style.container}>
      <StatusBar barStyle="light-content" />
      <TextInput
        ref={emailRef}
        style={style.input}
        placeholder="Email"
        placeholderTextColor={"rgba(255,255,255,0.6)"}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        ref={passwordRef}
        style={style.input}
        placeholder="Password"
        placeholderTextColor={"rgba(255,255,255,0.6)"}
        secureTextEntry
      />
      <TextInput
        ref={passwordConfirmRef}
        style={style.input}
        placeholder="Confirm Password"
        placeholderTextColor={"rgba(255,255,255,0.6)"}
        secureTextEntry
        returnKeyType="go"
      />
      <TouchableOpacity style={style.buttonContainer}>
        <Button title="SIGN UP" color="white" onPress={handleSubmit} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
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
