import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import getAge from "./ageCalculator";
import { Text, Button } from "@rneui/base";

export default function RiderProfileScreen({ route }) {
  const { height, width } = Dimensions.get("window");
  const { currentUser } = useAuth();
  const { rider, requested, setRequested, addRequest, remRequest, distance } =
    route.params;
  const [updateRequest, setUpdateRequest] = useState(requested);

  function handlePressed() {
    if (updateRequest === false) {
      addRequest(rider.uid, currentUser.uid, "requests");
      addRequest(currentUser.uid, rider.uid, "requested");
    } else {
      remRequest(rider.uid, currentUser.uid, "requests");
      remRequest(currentUser.uid, rider.uid, "requested");
    }
    setUpdateRequest((currReq) => !currReq);
    setRequested((currReq) => !currReq);
  }
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: rider.img,
          }}
        />
      </View>
      <View style={styles.info}>
        <ScrollView>
          <View style={styles.infoTop}>
            <Text
              style={styles.name}
            >{`${rider.firstName} ${rider.lastName}`}</Text>
            <Text style={styles.age}>
              {getAge(new Date(rider.DOB.seconds * 1000))}
            </Text>
          </View>
          <View style={styles.line}></View>
          <Text style={styles.gender}>{rider.selectedGender}</Text>
          <View style={styles.bike}>
            <Image
              style={styles.bikeImg}
              source={require("../images/motorbike-icon.png")}
            />
            <Text style={styles.bikeTxt}>{rider.bike}</Text>
          </View>
          <View style={styles.infoLower}>
            <View style={styles.locationContainer}>
              <Image
                style={styles.location}
                source={require("../images/Location.png")}
              />
              <Text style={styles.distance}>{`${distance}km`}</Text>
            </View>
            <Button
              style={styles.buttonContainer}
              onPress={handlePressed}
              title={updateRequest ? "Requested" : "Connect"}
            ></Button>
          </View>
          <Text style={styles.bio}>{rider.bio}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imgContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  logo: {
    justifyContent: "center",
    width: width,
    height: width,
  },
  info: {
    flex: 1,
    paddingHorizontal: width * 0.025,
  },
  infoTop: {
    flexDirection: "row",
  },
  name: {
    fontSize: 40,
    textAlign: "left",
    flex: 4,
  },
  age: {
    fontSize: 40,
    textAlign: "right",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
  },
  bio: {
    flex: 1,
    fontSize: 22,
    marginTop: 25,
  },
  bike: {
    flexDirection: "row",
    marginBottom: 5,
    marginRight: 2,
  },
  bikeTxt: {
    fontSize: 18,
    marginBottom: 5,
  },
  infoLower: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gender: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
  },
  distance: {
    fontSize: 18,
  },
  locationContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    alignItems: "flex-end",
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  location: {
    width: 20,
    height: 20,
    marginTop: 3,
  },
  bikeImg: {
    width: 23,
    height: 20,
    marginTop: 3,
    marginRight: 2,
  },
  line: {
    borderBottomWidth: 1,
  },
});
