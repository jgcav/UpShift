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
  Image,
  Button,
  Pressable,
} from "react-native";
import LoginScreen from "./LoginScreen";

export default function LandingScreen({navigation}) {
  return (
    <View style={style.container}>
      <View style={style.logoContainer}>
      <Image style={style.logo} source={require("../assets/bike_logo.png")} />
      <Text style={style.logoText}>UpShift</Text>
      <View style={style.buttonContainer}>
      <Pressable
        title="signUp"
        onPress={() => navigation.navigate("SignUp")}>
          <Text style={style.buttonText}>Sign Up</Text>
        </Pressable>
      <Pressable
        title="Login"
        onPress={() => navigation.navigate("Login")}>
          <Text style={style.buttonText}>Login</Text>
        </Pressable>
      <Pressable
        title="profile"
        onPress={() => navigation.navigate("ProfileMakerScreen")}>
          <Text style={style.buttonText}>Profile</Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0984E3",
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: "#FFF",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20
  },
  logoText2: {
    color: "#FFF",
    marginTop: 5,
    width: 160,
    textAlign: "center",
    opacity: 0.9,
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