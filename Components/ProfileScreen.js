import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  List,
  ScrollView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../config/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { fetchCurrLocation } from "../Components/api";

export default function ProfileScreen({ navigation: { navigate } }) {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState({});
  const [profile, setProfile] = useState({});
  const [routes, setRoutes] = useState({});
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
    return getDoc(ref).then((snapshot) => {
      return snapshot.data();
    });
  }

  function getRoutes() {
    const userId = currentUser.uid;
    const ref = collection(db, "profiles", `${userId}`, "routes");
    let routeInfo = [];
    return getDocs(ref).then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        routeInfo.push({ id, ...data });
      });
      return routeInfo;
    });
  }

  useEffect(() => {
    fetchCurrLocation().then((data) => {
      setUserLocation(data);
    });
  }, []);

  useEffect(() => {
    getProfile().then((data) => {
      setProfile(data);
    });
  }, []);

  useEffect(() => {
    getRoutes().then((data) => {
      setRoutes(data);
    });
  }, [routes]);

  function displaySavedRoutes() {
    const savedRoutes = [];
    for (let i = 0; i < routes.length; i++) {
      savedRoutes.push(
        <Button
          key={i}
          title={routes[i].id}
          color="black"
          onPress={() =>
            navigate("SavedRoutes", { location: routes[i].myRoute })
          }
        />
      );
    }
    return savedRoutes;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>{currentUser && currentUser.email}</Text>
        <Text>{error && error}</Text>
        <TouchableOpacity style={styles.buttonContainer}>
          <Button title="Logout" color="black" onPress={handleLogout} />
        </TouchableOpacity>
        <Text>Your Profile</Text>
        <View style={styles.profileCard}>
          <Text style={styles.text}>
            Name: {profile.firstName} {profile.lastName}
          </Text>
          <Text style={styles.text}>Gender: {profile.selectedGender}</Text>
          <Text style={styles.text}>Bike: {profile.bike}</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Button
              title="Plan Route"
              color="black"
              onPress={() =>
                navigate("RoutePlanner", { location: userLocation })
              }
            />
          </TouchableOpacity>
        </View>
        <Text>Saved Routes</Text>
        <View>{displaySavedRoutes()}</View>
      </ScrollView>
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
