import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Button } from "@rneui/base";
import { useAuth } from "../contexts/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import { getRoutes } from "../utils/firebaseFuncs";
import { fetchCurrLocation } from "./api";
import { UserRoutes } from "./UserRoutes";
import { Text } from "@rneui/base";
import getAge from "./ageCalculator";

export default function ProfileScreen({ navigation: { navigate } }) {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState({});

  const isFocused = useIsFocused();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = currentUser.uid;

  useEffect(() => {
    if (currentUser !== null) {
      getRoutes(currentUser.uid).then((data) => {
        setRoutes(data);
      });
      //       getProfile(currentUser.uid).then((data) => {
      //         const dobString = new Date(data.DOB.seconds * 1000);
      //         const calcAge = getAge(dobString);
      //         setAge(calcAge);
      //         setProfile(data);
      //       });
      setLoading(false);
    }
  }, [isFocused]);

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

  if (loading)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );

  return (
<<<<<<< HEAD
    <ScrollView>
      <Text>{error && error}</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Button title="Logout" color="black" onPress={handleLogout} />
      </TouchableOpacity>

      <ProfileCard age={age} profile={profile} />
      <View>
        <TouchableOpacity style={styles.buttonContainer}>
=======
    <View>
      <SafeAreaView>
        <Text
          style={{
            marginLeft: 30,
            marginTop: 15,
            fontWeight: "500",
            fontStyle: "italic",
          }}
          h1
        >
          UpShift
        </Text>

        <View style={styles.menue}>
          {/* // <ProfileCard age={age} profile={profile} /> */}
          <Button
            style={{ margin: 10, width: 150 }}
            title="Logout"
            onPress={handleLogout}
          />
>>>>>>> a383837aa1bbc399f3c44ba5aeb21d11129b98d3
          <Button
            style={{ margin: 10, width: 150 }}
            title="Find Rider"
            onPress={() => {
              navigate("Rider Finder");
            }}
          />
<<<<<<< HEAD
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Button
            title="Chat"
            color="black"
            onPress={() => {
              navigate("ChatList");
            }}
          />
        </TouchableOpacity>
      </View>
=======
        </View>
>>>>>>> a383837aa1bbc399f3c44ba5aeb21d11129b98d3

        <View style={styles.container}>
          <Button
            containerStyle={{ marginLeft: 30 }}
            buttonStyle={{
              borderRadius: 30,
              width: 185,
              padding: 15,
            }}
            title="Plan Route  "
            onPress={() =>
              navigate("RoutePlanner", {
                location: userLocation,
              })
            }
            icon={{ name: "east", color: "white" }}
            iconRight
          />

          <SafeAreaView style={styles.routes_container}>
            <UserRoutes navigate={navigate} routes={routes} />
          </SafeAreaView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 485,
    height: 400,
  },
  routes_container: {
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    marginTop: 20,
  },
  menue: {
    padding: 10,
    marginTop: 55,
    flexDirection: "row",
  },
});
