import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Platform,
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
      });
      setLoading(false);
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
      <View>
        <Text>loading</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/harley-davidson.jpg")}
        style={{ width: width, height: height * 0.25 }}
      >
        <Text
          style={{
            marginLeft: 30,
            marginTop: Platform.OS === "ios" ? 35 : 15,
            marginBottom: Platform.OS === "ios" ? 35 : 30,
            fontWeight: "500",
            fontStyle: "italic",
          }}
          h1
        >
          UpShift
        </Text>
        <ProfileCard age={age} profile={profile} />
      </ImageBackground>

      {/* <View style={styles.menue}>
        <Button
          style={{ margin: 10, width: 150 }}
          title="Logout"
          onPress={handleLogout}
        />
        <Button
          style={{ margin: 10, width: 150 }}
          title="Find Rider"
          onPress={() => {
            navigate("Rider Finder");
          }}
        />
        <Button
          style={{ margin: 10, width: 150 }}
          title="Chat"
          onPress={() => {
            navigate("ChatList");
          }}
        />
      </View>

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
      /> */}

      <View style={styles.spacer}></View>
      <Card
        containerStyle={{
          padding: 0,
          paddingBottom: 10,
          marginBottom: 10,
          borderRadius: 10,
        }}
      >
        <View style={styles.routes_container}>
          <UserRoutes navigate={navigate} routes={routes} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  routes_container: {
    marginBottom: 0,
  },
  menue: {
    padding: 10,
    marginTop: 55,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
