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

export default function LoginScreen({ navigation: { navigate } }) {
  const [email, setEmail] = useState("ttt@ttt.com");
  const [password, setPassword] = useState("Password");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setError("");
    setLoading(true);
    login(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setLoading(false);
        navigate("Profile");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") setError("User Does not exist");
        else if (err.code === "auth/invalid-email") setError("Invalid Email");
        else if (err.code === "auth/wrong-password")
          setError("Incorrect Email/Password");
        else setError("Failed to Sign in");
      });
  }

  return (
    <View behavior="padding" style={style.container}>
      <StatusBar barStyle="light-content" />
      <TextInput
        style={style.input}
        placeholder="Email"
        placeholderTextColor={"rgba(255,255,255,0.6)"}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        autoCorrect={false}
      />
      <TextInput
        style={style.input}
        placeholder="Password"
        placeholderTextColor={"rgba(255,255,255,0.6)"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text>{error && error}</Text>
      <TouchableOpacity style={style.buttonContainer}>
        <Button title="LOGIN" color="white" onPress={handleSubmit} />
      </TouchableOpacity>
      <Text>
        Already have an account?{" "}
        <Text
          style={style.textHighlight}
          onPress={() => {
            navigate("SignUp");
          }}
        >
          Sign Up
        </Text>
        <Text
          style={style.textHighlight}
          onPress={() => {
            navigate("ProfileMaker");
          }}
        >
          ProfileMaker
        </Text>
      </Text>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0984E3",
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
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  textHighlight: {
    color: "white",
    textDecorationLine: "underline",
  },
});
