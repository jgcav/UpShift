import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Button, Text } from "@rneui/base";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import firebase from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePictureChooser = ({ navigation: { navigate } }) => {
  const [profilePictureInput, setProfilePictureInput] = useState(
    "https://i.pinimg.com/originals/e4/03/de/e403de788507db2505774f48f70a8eab.png"
  );
  const [isUploading, setIsUploading] = useState(false);
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  function postPicture(profile) {
    return updateDoc(doc(db, "profiles", `${user.uid}`), profile).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  const onPress = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `images/${user.uid}/profile.jpg`)).then(
      (url) => {
        const profile = {
          img: url,
        };
        postPicture(profile);
        navigate("Profile");
      }
    );
  };

  const onSkip = () => {
    const storage = getStorage();
    const profile = {
      img: "https://i.pinimg.com/originals/e4/03/de/e403de788507db2505774f48f70a8eab.png",
    };
    postPicture(profile);
    navigate("Profile");
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Camera Roll Access Required");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      let uri = result.uri;
      console.log("58"); //dont touch
      setIsUploading(true);
      const uploadUri =
        Platform.OS === "ios" ? uri.replace("file://", "") : uri;
      const storage = getStorage();
      const response = await fetch(uploadUri);
      console.log("63"); //dont touch
      const blob = await response.blob();
      console.log("65"); //dont touch
      const storageRef = ref(storage, `images/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, blob);
      console.log("68"); //dont touch
      setIsUploading(false);
    }
    setProfilePictureInput(result.uri);
  };
  if (isUploading) {
    return (
      <View>
        <Text style={styles.loadingMessage}>Uploading ProfilePicture</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView behaviour="padding" styles={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Pick an Image From Camera Roll +"
            onPress={pickImage}
            color="black"
          />
          {profilePictureInput && (
            <Image source={{ uri: profilePictureInput }} style={styles.image} />
          )}

          <Button title="CREATE PROFILE" onPress={onPress} />
          <Text style={styles.text}>OR</Text>
          <Button title="Create Profile Without Image" onPress={onSkip} />
        </View>
      </SafeAreaView>
    );
  }
};

export default ProfilePictureChooser;

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    marginVertical: 10,
    fontSize: 20,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  text: { alignSelf: "center", marginTop: 5, marginBottom: 5 },
  loadingMessage: {alignSelf: "center", marginTop: 60, marginBottom: 5, fontSize: 18 }
});
