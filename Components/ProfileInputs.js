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
import DatePicker from "./DatePicker";

export default function ProfileInputs({ navigate }) {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
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
  const [date, setDate] = useState(new Date());

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  function postProfile(profile) {
    return setDoc(doc(db, "profiles", `${user.uid}`), profile).catch((err) => {
      console.log(err);
    });
  }

  const onPress = () => {
    const profile = {
      firstName,
      lastName,
      selectedGender,
      region,
      bike,
      uid: user.uid,
      bio,
      DOB: date,
    };
    postProfile(profile);
    navigate("ProfilePictureChooser");
  };

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
      <Text>Date of Birth</Text>
      <View>
        <DatePicker setDate={setDate} date={date} />
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
        placeholder="Bio (Max 240 Characters)"
        placeholderTextColor={"white"}
        multiline
        maxLength={240}
        onChangeText={onChangeBio}
      ></TextInput>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
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
