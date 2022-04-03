import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform,
  Image,
  StatusBar,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import { fetchCurrLocation } from "./api";
import getAge from "./ageCalculator";
import {
  getProfile,
  getRoutes,
  getProfilePicture,
  updateProfileLocation,
} from "../utils/firebaseFuncs";

import { UserRoutes } from "./UserRoutes";
import { Text, Card, Icon, Button } from "@rneui/base";
import { ProfileCard } from "./ProfileCard";

export default function ProfileScreen({ navigation: { navigate } }) {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState({});
  const [age, setAge] = useState(undefined);
  const [profile, setProfile] = useState({});
  const isFocused = useIsFocused();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    if (currentUser !== null) {
      getRoutes(currentUser.uid).then((data) => {
        setRoutes(data);
      });
      getProfile(currentUser.uid).then((data) => {
        const dobString = new Date(data.DOB.seconds * 1000);
        const calcAge = getAge(dobString);
        setAge(calcAge);
        setProfile(data);
        setLoading(false);
      });

      fetchCurrLocation().then((data) => {
        setUserLocation(data);
        const currLocation = {
          location: [userLocation.lat, userLocation.lng],
        };
        updateProfileLocation(currentUser.uid, currLocation);
      });
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Image
          style={styles.loading}
          source={require("../images/GREY-GEAR-LOADING.gif")}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={require("../assets/harley-davidson.jpg")}
        style={{ width: width, height: height * 0.25 }}
      >
        <Text
          style={{
            marginLeft: 30,
            marginTop: Platform.OS === "ios" ? 35 : 15,
            marginBottom: Platform.OS === "ios" ? 35 : 15,
            fontWeight: "500",
            fontStyle: "italic",
          }}
          h1
        >
          UpShift
        </Text>
        <ProfileCard age={age} profile={profile} />
      </ImageBackground>

      <View style={styles.spacer}></View>
      <Card
        containerStyle={{
          padding: 0,
          paddingBottom: 10,
          marginBottom: 4,
          borderRadius: 10,
        }}
      >
        {routes.length !== 0 ? (
          <View style={styles.routes_container}>
            <UserRoutes navigate={navigate} routes={routes} />
          </View>
        ) : (
          <Text
            onPress={() =>
              navigate("RoutePlanner", {
                location: userLocation,
              })
            }
            style={styles.createRoute}
          >
            Create Your First Route ...
          </Text>
        )}
      </Card>
      <View style={styles.menue}>
        <Button
          buttonStyle={{
            borderRadius: 0,
            width: width * 0.25,
            height: 50,
            padding: 0,
            backgroundColor: "#888888",
          }}
          containerStyle={{
            borderRadius: 0,
            width: width * 0.25,
            padding: 0,
          }}
          onPress={() =>
            navigate("RoutePlanner", {
              location: userLocation,
            })
          }
          icon={{ name: "map", type: "feather" }}
        />

        <Button
          buttonStyle={{
            borderRadius: 0,
            width: width * 0.25,
            height: 50,
            padding: 0,
            backgroundColor: "#888888",
          }}
          containerStyle={{
            borderRadius: 0,
            width: width * 0.25,
            borderLeftWidth: 1,
          }}
          onPress={() => {
            navigate("ChatList");
          }}
          icon={{ name: "message-circle", type: "feather" }}
        />
        <Button
          buttonStyle={{
            borderRadius: 0,
            width: width * 0.25,
            height: 50,
            padding: 0,
            backgroundColor: "#888888",
          }}
          containerStyle={{
            borderRadius: 0,
            width: width * 0.25,
            padding: 0,
            borderLeftWidth: 1,
          }}
          onPress={() => {
            navigate("Rider Finder");
          }}
          icon={{ name: "user-plus", type: "feather" }}
        />
        <Button
          buttonStyle={{
            borderRadius: 0,
            width: width * 0.25,
            height: 50,
            padding: 0,
            backgroundColor: "#888888",
          }}
          containerStyle={{
            borderRadius: 0,
            width: width * 0.25,
            padding: 0,
            borderLeftWidth: 1,
          }}
          onPress={handleLogout}
          icon={{ name: "log-out", type: "feather" }}
        />
      </View>
    </View>
  );
}
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Platform.OS === "ios" ? 0 : 0,
  },
  spacer: {
    flex: 1,
  },
  routes_container: {
    marginBottom: 0,
  },
  menue: {
    marginTop: 0,
    flexDirection: "row",
    width: width,
  },
  createRoute: { padding: 20, alignSelf: "center" },
  loading: {
    width: 100,
    height: 100,
  },
});
