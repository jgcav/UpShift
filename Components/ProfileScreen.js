import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function ProfileScreen({ navigation: { navigate } }) {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({});
  const db = firebase.firestore();
  const userId = currentUser.uid;
  const [profilePicture, setProfilePicture] = useState();

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
    const ref = doc(db, "profiles", `${userId}`);
    return getDoc(ref).then((snapshot) => {
      return snapshot.data();
    });
  }

  function getProfilePicture() {
    const storage = getStorage();
    const pathReference = ref(storage, `images/${userId}/profile.jpg`);
    return getDownloadURL(pathReference).then((url) => {
      return url;
    });
  }

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
    });
    getProfilePicture().then((url) => {
      setProfilePicture(url);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{currentUser && currentUser.email}</Text>
      <Text>{error && error}</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Button title="Logout" color="black" onPress={handleLogout} />
      </TouchableOpacity>
      <Text style={styles.title}>Your Profile</Text>
      <View style={styles.profileCard}>
        <Text style={styles.text}>
          Name: {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.text}>Gender: {profile.selectedGender}</Text>
        <Text style={styles.text}>Bike: {profile.bike}</Text>
        <Image
          style={styles.profilePic}
          source={{
            uri: profilePicture,
          }}
        />
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
    fontSize: 20,
    color: "#fff",
    padding: 10,
  },
  profilePic: {
    width: 250,
    height: 250,
    margin: 10,
    alignSelf: "center",
    borderRadius: 40,
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});
