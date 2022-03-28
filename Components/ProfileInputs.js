import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export default function ProfileInputs({ navigate }) {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [profilePictureInput, setProfilePictureInput] = useState("not changed");
  const [date, onChangeDate] = useState("2000-01-01");
  const [selectedGender, setSelectedGender] = useState("");
  const [region, setRegion] = useState("");
  const genders = ["Male", "Female", "Other"];
  const regions = [
    "Scotland",
    "North East",
    "North West",
    "Yorkshire & Humberside",
    "East Midlands",
    "West Midlands",
    "East of England",
    "London",
    "South East",
    "South West",
    "Wales",
    "Northern Ireland",
    "Isle of Man",
  ];
  const [bike, onChangeBike] = useState("");
  const [bio, onChangeBio] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  function postProfile(profile) {
    return setDoc(doc(db, "profiles", `${user.uid}`), profile).catch((err) => {
      console.log(err);
    });
  }

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

  const onPress = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `images/${user.uid}/profile.jpg`)).then(
      (url) => {
        const random = Math.floor(Math.random() * (10000 + 1));
        const profile = {
          firstName,
          lastName,
          selectedGender,
          region,
          bike,
          uid: user.uid,
          img: url,
          bio,
          random,
          DOB: new Date(2000, 1, 1),
          age: "0",
        };
        postProfile(profile);
        navigate("Profile");
      }
    );
  };

  if (isUploading) {
    return (
      <View>
        <Text style={styles.loadingMessage}>Uploading ProfilePicture</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor={"white"}
          onChangeText={onChangeFirstName}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={"white"}
          onChangeText={onChangeLastName}
        ></TextInput>
        <View styles={styles.container}>
          <Button
            title="Pick an Image From Camera Roll +"
            onPress={pickImage}
            color="white"
          />
          {profilePictureInput && (
            <Image source={{ uri: profilePictureInput }} style={styles.image} />
          )}
        </View>
        <Text>Date of Birth</Text>
        <View style={styles.dateBlock}>
          <TextInput
            style={styles.dateInput}
            placeholder="DD"
            placeholderTextColor={"white"}
            keyboardType="number-pad"
            maxLength={2}
            returnKeyType={"done"}
          ></TextInput>
          <TextInput
            style={styles.dateInput}
            placeholder="MM"
            placeholderTextColor={"white"}
            keyboardType="number-pad"
            maxLength={2}
            returnKeyType={"done"}
          ></TextInput>
          <TextInput
            style={styles.dateInput}
            placeholder="YYYY"
            placeholderTextColor={"white"}
            keyboardType="number-pad"
            maxLength={4}
            returnKeyType={"done"}
          ></TextInput>
        </View>
        <View style={styles.dropdown}>
          <SelectDropdown
            data={genders}
            onSelect={(selectedItem, index) => {
              setSelectedGender(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            defaultButtonText={"Select Gender"}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>
        <View style={styles.dropdown}>
          <SelectDropdown
            data={regions}
            onSelect={(selectedItem, index) => {
              setRegion(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            defaultButtonText={"Select Region"}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Bike"
          placeholderTextColor={"white"}
          onChangeText={onChangeBike}
        ></TextInput>
        <TextInput
          style={styles.bio}
          placeholder="Bio (max 4 lines)"
          placeholderTextColor={"white"}
          multiline
          numberOfLines={4}
          onChangeText={onChangeBio}
        ></TextInput>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <Text style={styles.buttonText}>CREATE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
    paddingHorizontal: 10,
  },
  bio: {
    height: 160,
    width: 300,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    padding: 10,
    textAlign: "center",
  },
  dateInput: {
    height: 40,
    width: 60,
    backgroundColor: "rgba(255,255,255,0.2)",
    margin: 10,
    textAlign: "center",
    color: "white",
    paddingHorizontal: 10,
  },
  dateBlock: {
    flexDirection: "row",
  },

  dropdown: {
    padding: 10,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  dropdown2BtnStyle: {
    width: "70%",
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: { backgroundColor: "rgba(255,255,255,0.2)" },
  dropdown2RowStyle: {
    backgroundColor: "rgba(255,255,255,1)",
    borderBottomColor: "#C5C5C5",
  },
  dropdown2RowTxtStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },

  buttonContainer: {
    backgroundColor: "#0984e3",
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 300,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  loadingMessage: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    padding: 20,
    textAlign: "center",
    marginTop: 100,
  },
});
