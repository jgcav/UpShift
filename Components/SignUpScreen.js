import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import TextInput from "./TextInput.js";
import { Button, color } from "@rneui/base";

export default function SignUpScreen({ navigation: { navigate } }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    setError("");
    setLoading(true);
    signup(email, password)
      .then(() => {
        setLoading(false);
        navigate("ProfileMaker");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/email-already-in-use")
          setError("Email already in use");
        else if (err.code === "auth/invalid-email") setError("Invalid Email");
        else if (err.code === "auth/weak-password")
          setError("Weak Password: 6 characters minimum");
        else setError("Failed to set up account");
      });
  }
  const { height, width } = Dimensions.get("window");

  return (
    <ImageBackground
      source={require("../assets/bike6.jpg")}
      style={{ width: width, height: height }}
    >
      <View behavior="padding" style={style.container}>
        <StatusBar barStyle="light-content" />
        <TextInput
          style={style.input}
          placeholder="Email"
          placeholderTextColor={"#a9a9a9"}
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
        <TextInput
          style={style.input}
          placeholder="Confirm Password"
          placeholderTextColor={"#a9a9a9"}
          secureTextEntry
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          returnKeyType="go"
        />
        <Text style={{color:"white"}}>{error && error}</Text>

        <Button
          title="Sign Up"
          buttonStyle={{
            borderRadius: 0,
            width: 200,
            height: 35,
            padding: 0,
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
          Already have an account?{" "}
          <Text
            style={style.textHighlight}
            onPress={() => {
              navigate("Login");
            }}
          >
            Login
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
    height: 40,
    width: 300,
    marginBottom: 20,
    color: "black",
    paddingHorizontal: 10,
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: "powderblue",
    paddingVertical: 10,
    marginBottom: 20,
    width: "50%",
    marginVertical: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#CFDDF6",
    fontWeight: "bold",
  },
  textHighlight: {
    marginTop: 24,
    fontWeight: "bold",
    color: "#D1E8EB",
    textDecorationLine: "underline",
  },
  alreadyHaveAccount: {
    color: "white",
  },
});
