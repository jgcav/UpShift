import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import firebase from "../config/firebase.js";
import { useAuth } from "../contexts/AuthContext.js";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import RequestCard from "./RequestCard.js";

const db = firebase.firestore();
const storage = getStorage();
export default function MessageRequestsScreen({ navigation: { navigate } }) {
  const [profiles, setProfiles] = useState([]);
  const [profilesUrl, setProfilesUrl] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  function getProfile(id) {
    const ref = doc(db, "profiles", `${id}`);
    return getDoc(ref).then((snapshot) => {
      return snapshot.data();
    });
  }

  function getRequests() {
    const docRef = doc(db, "profiles", `${currentUser.uid}`);
    return getDoc(docRef).then((docSnap) => {
      return docSnap.data();
    });
  }
  useEffect(() => {
    getRequests()
      .then((IDs) => {
        const PromsProfiles = [];
        const PromsImages = [];
        IDs.requests.forEach((ID) => {
          PromsProfiles.push(getProfile(ID));
          PromsImages.push(
            getDownloadURL(ref(storage, `images/${ID}/profile.jpg`))
          );
        });
        return Promise.all([...PromsProfiles, PromsImages]);
      })
      .then((profiles) => {
        const PromsImages = profiles.pop();
        return Promise.all([...PromsImages, profiles]);
      })
      .then((urls) => {
        const profiles = urls.pop();
        setProfiles(profiles);
        setProfilesUrl(urls);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {profiles.map((profile, index) => {
        return (
          <RequestCard
            profile={profile}
            profileUrl={profilesUrl[index]}
            navigate={navigate}
            key={index}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0984E3",
    flex: 1,
  },
  loading: {
    width: 100,
    height: 100,
  },
});
// we are going to display a list of user cards as requests
// get harrisons profiles (because we know he has sent a request ) on a card
// get the profile pictures (separate promise)
