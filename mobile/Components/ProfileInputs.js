import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import ImageChooser from "./ImageChooser";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProfileInputs() {
  const [selectedGender, setSelectedGender] = useState("");
  const genders = ["Male", "Female", "Other"];
  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={"white"}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor={"white"}
      ></TextInput>
      <ImageChooser
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
      />
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
          defaultButtonText={"Select gender"}
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
      ></TextInput>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>CREATE</Text>
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
});
