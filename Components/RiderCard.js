import React from "react";
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";

// remember to add users profile picture after line 12
export default function RiderCard({ rider, navigate }) {
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `images/${rider.uid}/profile.jpg`)).then(
      (url) => {
        setProfileUrl(url);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <Text>Loading..</Text>;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate("Rider Profile", { rider, profileUrl });
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: profileUrl,
          }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text>{`${rider.firstName} ${rider.lastName}`}</Text>
        <View style={styles.infoLower}>
          <Text style={styles.textLower}>1 mile</Text>
          <Text style={styles.textLower}>{`${rider.bike}`} </Text>
        </View>
      </View>
      <View style={styles.requestContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Message</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#299DF6",
  },
  imageContainer: {
    flex: 1.1,
  },
  infoContainer: {
    flex: 3,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  infoLower: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  textLower: {
    flex: 1,
    alignItems: "flex-end",
  },
  requestContainer: {
    flex: 1.5,
    justifyContent: "center",
  },
  logo: {
    marginVertical: 5,
    marginLeft: 5,
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 32,
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
