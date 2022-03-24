import React from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";

// remember to add users profile picture after line 12
export default function RiderCard({ rider, navigate }) {
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `images/${rider.uid}/profile.jpg`)).then(
      (url) => {
        console.log(url);
        setProfileUrl(url);
      }
    );
  }, []);

  return (
    <View
      onPress={() => {
        navigate("rider profile ");
      }}
    >
      <Image
        style={styles.logo}
        source={{
          uri: profileUrl,
        }}
      />
      <Text>{`${rider.firstName} ${rider.lastName}`}</Text>
      <Text>location : 1mile</Text>
      <Text>Bike: {`${rider.bike}`} </Text>
      <Button title="Message" color="black" onPress={() => {}} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
