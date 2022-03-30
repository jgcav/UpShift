import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import getAge from "./ageCalculator";
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

          <Text style={styles.bio}>{rider.bio}</Text>
          <View style={styles.bike}>
            <Image
              style={styles.bikeImg}
              source={require("../images/motorbike-icon.png")}
            />
            <Text style={styles.bikeTxt}>{rider.bike}</Text>
          </View>

          <View style={styles.infoLower}>
            <Text style={styles.gender}>{rider.selectedGender}</Text>
            <View style={styles.locationContainer}>
              <Image
                style={styles.location}
                source={require("../images/Location.png")}
              />
              <Text style={styles.distance}>{`${distance}km`}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePressed}>
        <Text style={styles.text}>
          {updateRequest ? "Requested" : "Connect"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0984E3",
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
  },
  bike: {
    flexDirection: "row",
  },
  bikeTxt: {
    fontSize: 18,
  },
  infoLower: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gender: {
    fontSize: 18,
  },
  distance: {
    fontSize: 18,
  },
  locationContainer: {
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "black",
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
});
