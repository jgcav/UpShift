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
import getAge from "./ageCalculator";

export default function ProfileInputs({ navigate }) {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [region, setRegion] = useState("");
  const [age, setAge] = useState(0);
  const [bike, onChangeBike] = useState("");
  const [bio, onChangeBio] = useState("");
  const [date, setDate] = useState(new Date());
  const [firstNameAbsent, setFirstNameAbsent] = useState(null);
  const [lastNameAbsent, setLastNameAbsent] = useState(null);
  const [genderAbsent, setGenderAbsent] = useState(null);
  const [regionAbsent, setRegionAbsent] = useState(null);
  const [bikeAbsent, setBikeAbsent] = useState(null);
  const [tooYoung, setTooYoung] = useState(null);

  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

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
  const genders = ["Male", "Female", "Other"];

  function postProfile(profile) {
    return setDoc(doc(db, "profiles", `${user.uid}`), profile).catch((err) => {
      console.log(err);
    });
  }

  const onPress = () => {
    if (!firstName) {
      setFirstNameAbsent(true);
    }
    if (!lastName) {
      setLastNameAbsent(true);
    }
    if (!selectedGender) {
      setGenderAbsent(true);
    }
    if (!region) {
      setRegionAbsent(true);
    }
    if (!bike) {
      setBikeAbsent(true);
    }
    if (age < 18) {
      setTooYoung(true);
    } else {
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
    }
    console.log(age, "< age");
    console.log(tooYoung, "< too young?");
    console.log(firstNameAbsent, "<firstname absent?");
    console.log(lastNameAbsent, "<lastname absent?");
    console.log(genderAbsent, "<gender absent?");
    console.log(regionAbsent, "<region absent?");
    console.log(bikeAbsent, "<bike absent?");
  };

  return (
    <View style={styles.container}>
      {/* Title  */}
      <Text style={styles.title}>Create Your Profile</Text>
      <Text style={styles.starMessage}>Required Fields (*)</Text>
      {/* First Name */}
      <TextInput
        style={
          firstNameAbsent
            ? {
                height: 40,
                width: 300,
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                marginBottom: 20,
                textAlign: "center",
                color: "black",
                paddingHorizontal: 10,
                borderColor: "red",
                borderWidth: 2,
              }
            : {
                height: 40,
                width: 300,
                backgroundColor: "rgba(255,255,255,0.2)",
                marginBottom: 20,
                textAlign: "center",
                color: "black",
                paddingHorizontal: 10,
              }
        }
        placeholder="First Name"
        placeholderTextColor={"white"}
        onChangeText={onChangeFirstName}
        /*setFirstNameAbsent(false) tried but prevented*/
      ></TextInput>
      {/* Last Name */}
      <TextInput
        style={
          lastNameAbsent
            ? {
                height: 40,
                width: 300,
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                marginBottom: 20,
                textAlign: "center",
                color: "black",
                paddingHorizontal: 10,
                borderColor: "red",
                borderWidth: 2,
              }
            : {
                height: 40,
                width: 300,
                backgroundColor: "rgba(255,255,255,0.2)",
                marginBottom: 20,
                textAlign: "center",
                color: "black",
                paddingHorizontal: 10,
              }
        }
        placeholder="Last Name"
        placeholderTextColor={"white"}
        onChangeText={onChangeLastName}
      ></TextInput>
      {/* DOB Picker */}
      <View>
        <DatePicker
          setDate={setDate}
          date={date}
          tooYoung={tooYoung}
          getAge={getAge}
          setAge={setAge}
          age={age}
          setTooYoung={setTooYoung}
        />
      </View>
      {/* Gender Picker */}
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
          buttonStyle={
            genderAbsent
              ? {
                  width: "70%",
                  height: 40,
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                  borderRadius: 8,
                }
              : {
                  width: "70%",
                  height: 40,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 8,
                }
          }
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
      {/* Region Picker */}
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
          buttonStyle={
            regionAbsent
              ? {
                  width: "70%",
                  height: 40,
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                  borderRadius: 8,
                }
              : {
                  width: "70%",
                  height: 40,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 8,
                }
          }
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
        style={
          lastNameAbsent
            ? {
                height: 40,
                width: 300,
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                marginBottom: 20,
                textAlign: "center",
                color: "black",
                paddingHorizontal: 10,
                borderColor: "red",
                borderWidth: 2,
              }
            : {
                height: 40,
                width: 300,
                backgroundColor: "rgba(255,255,255,0.2)",
                marginBottom: 20,
                textAlign: "center",
                color: "black",
                paddingHorizontal: 10,
              }
        }
        placeholder="Bike"
        placeholderTextColor={"white"}
        onChangeText={onChangeBike}
        maxLength={12}
      ></TextInput>
      <TextInput
        style={styles.bio}
        placeholder="Bio (Max 240 Characters)"
        placeholderTextColor={"white"}
        multiline
        maxLength={240}
        onChangeText={onChangeBio}
      ></TextInput>
      {firstNameAbsent || lastNameAbsent ? (
        <Text style={styles.warningMessage}>
          Please Fill All Required Fields (*)
        </Text>
      ) : (
        <Text></Text>
      )}
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
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
  bio: {
    height: 160,
    width: 300,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
    paddingHorizontal: 10,
  },
  warningMessage: {
    color: "red",
  },
  starMessage: {
    color: "white",
    marginBottom: 3,
    fontSize: 11,
  },
});
