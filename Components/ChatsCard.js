import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebase from "../config/firebase";

const db = firebase.firestore();
export default function ChatsCard({ chat, navigate }) {
  const [userProfile, setUserProfile] = useState({});
  const [profileUrl, setProfileUrl] = useState("");

  function getProfile() {
    const docRef = doc(db, "profiles", `${chat.chatterId}`);

    return getDoc(docRef)
      .then((docSnap) => {
        const { firstName, lastName } = docSnap.data();
        return { firstName, lastName };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProfile().then((profile) => {
      setUserProfile(profile);
    });
    // const storage = getStorage();
    // getDownloadURL(ref(storage, `images/${userProfile.uid}/profile.jpg`)).then(
    //   (url) => {
    //     setProfileUrl(url);
    //   }
    // );
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate("Chat", { roomId: chat.roomId });
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
        <Text>{`${userProfile.firstName} ${userProfile.lastName}`}</Text>
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
  logo: {
    marginVertical: 5,
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
  },
});
