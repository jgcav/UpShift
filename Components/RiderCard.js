import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";

import firebase from "../config/firebase.js";
const db = firebase.firestore();
export default function RiderCard({ rider, navigate, setLoading, location }) {
  const [requested, setRequested] = useState(false);
  const [distance, setDistance] = useState(1);
  const { currentUser } = useAuth();

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    let km = Math.floor(
      getDistanceFromLatLonInKm(
        location[0],
        location[1],
        rider.location[0],
        rider.location[1]
      )
    );
    if (km < 1) km = 1;
    setDistance(km);
  }, []);

  function addRequest(uid, uid2, type) {
    const msgR = doc(db, "profiles", `${uid}`);
    updateDoc(msgR, { [type]: arrayUnion(`${uid2}`) }).catch((err) => {
      console.log(err);
    });
  }
  function remRequest(uid, uid2, type) {
    const msgR = doc(db, "profiles", `${uid}`);
    updateDoc(msgR, { [type]: arrayRemove(`${uid2}`) }).catch((err) => {
      console.log(err);
    });
  }

  function handlePress() {
    if (requested === false) {
      addRequest(rider.uid, currentUser.uid, "requests");
      addRequest(currentUser.uid, rider.uid, "requested");
    } else {
      remRequest(rider.uid, currentUser.uid, "requests");
      remRequest(currentUser.uid, rider.uid, "requested");
    }
    setRequested((currReq) => !currReq);
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate("Rider Profile", {
          rider,
          requested,
          setRequested,
          addRequest,
          remRequest,
          distance,
        });
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: rider.img,
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text>{`${rider.firstName} ${rider.lastName}`}</Text>
        <View style={styles.infoLower}>
          <Image
            style={styles.location}
            source={require("../images/Location.png")}
          />
          <Text style={styles.textLower}>{`${distance} Km`}</Text>
          <Image
            style={styles.bike}
            source={require("../images/motorbike-icon.png")}
          />
          <Text style={styles.textLower}>{`${rider.bike}`} </Text>
        </View>
      </View>
      <View style={styles.requestContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.text}>{requested ? "Requested" : "Connect"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#299DF6",
  },
  imageContainer: {
    flex: 1.1,
    alignItems: "center",
    marginLeft: 8,
    justifyContent: "flex-end",
  },
  infoContainer: {
    flex: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  infoLower: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  textLower: {
    flex: 1,
  },
  requestContainer: {
    flex: 2,
    justifyContent: "center",
  },
  logo: {
    marginVertical: 5,
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
  },
  location: {
    width: 15,
    height: 15,
    marginBottom: 3,
  },
  bike: {
    width: 17,
    height: 15,
    marginBottom: 3,
    marginRight: 2,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "black",
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
