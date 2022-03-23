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
    <View style={styles.container}>
      <Text>{currentUser && currentUser.email}</Text>
      <Text>{error && error}</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Button title="Logout" color="black" onPress={handleLogout} />
      </TouchableOpacity>
      <View style={styles.profileCard}>
        <Text style={styles.text}>
          Name: {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.text}>Gender: {profile.selectedGender}</Text>
        <Text style={styles.text}>Bike: {profile.bike}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#0984E3", flex: 1 },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 20,
  },
  profileCard: {
    backgroundColor: "#0984E3",
  },
  text: {
    color: "#fff",
    padding: 10,
  },
});
