import React, { useState, useEffect } from "react";
import { Button, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
export default function ProfileScreen({ navigation: { navigate } }) {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({});
  const db = firebase.firestore();

  const handleLogout = () => {
    setError("");

    logout()
      .then(() => {
        navigate("Login");
      })
      .catch(() => {
        setError("Failed to log out");
      });
  };

  function getProfile() {
    const userId = currentUser.uid;
    const ref = doc(db, "profiles", `${userId}`);
    // console.log(userId, "uid")
    return getDoc(ref).then((snapshot) => {
      // console.log(snapshot.data(), "snapshot")
      return snapshot.data();
    });
  }

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
    });
  }, []);
  console.log(profile, "PROFILE");

  return (
    <View>
      <Text>{currentUser && currentUser.email}</Text>
      <Text>{error && error}</Text>
      <TouchableOpacity style={style.buttonContainer}>
        <Button title="logout" color="black" onPress={handleLogout} />
      </TouchableOpacity>
      <Text>{profile.bike}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#0984E3",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
