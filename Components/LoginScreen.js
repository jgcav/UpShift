import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { Text, Card, Icon, Button } from "@rneui/base";
import LoginLogo from "./LoginLogo";
import TextInput from "./TextInput.js";

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
  const { height, width } = Dimensions.get("window");

  return (
    <ImageBackground
      source={require("../assets/logInPhoto.jpg")}
      style={{ width: width, height: height }}
    >
      <View behavior="padding" style={style.container}>
        <StatusBar barStyle="light-content" />
        <LoginLogo />
        <TextInput
          style={style.input}
          placeholder="Email address"
          placeholderTextColor={"#a9a9a9"}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
        />
        <TextInput
          style={style.input}
          placeholder="Password"
          placeholderTextColor={"#a9a9a9"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text>{error && error}</Text>
        <Button
          title="Login"
          buttonStyle={{
            borderRadius: 0,
            width: 200,
            height: 35,
            padding: 0,
            backgroundColor: "#7379C6",
          }}
          containerStyle={{
            borderRadius: 0,
            width: 202,
            height: 37,
            padding: 0,
            borderWidth: 1,
          }}
          onPress={handleSubmit}
        />
        <Text style={{ color: "white" }}>
          Don't have an account?{"  "}
          <Text
            style={style.textHighlight}
            onPress={() => {
              navigate("SignUp");
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    backgroundColor: "#FFFF",
    margin: 0,
    padding: 0,
    color: "black",
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: "#CFDDF6",
    paddingVertical: 10,
    marginBottom: 20,
    width: "50%",
    marginVertical: 10,
    fontSize: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  textHighlight: {
    marginTop: 24,
    fontWeight: "bold",
    color: "#D1E8EB",
    textDecorationLine: "underline",
  },
});
