import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ProfileInputs() {
  const [selectedGender, setSelectedGender] = useState("male");

  return (
    // <KeyboardAvoidingView
    //   behavior="padding"
    //   keyboardVerticalOffset={10}
    //   style={style.container}
    // >
    <View style={style.container}>
      <Text style={style.title}>Create Your Profile</Text>
      <TextInput
        style={style.input}
        placeholder="First Name"
        placeholderTextColor={"white"}
      ></TextInput>
      <TextInput
        style={style.input}
        placeholder="Last Name"
        placeholderTextColor={"white"}
      ></TextInput>
      <Text>Date of Birth</Text>
      <View style={style.dateBlock}>
        <TextInput
          style={style.dateInput}
          placeholder="DD"
          placeholderTextColor={"white"}
          keyboardType="number-pad"
          maxLength={2}
          returnKeyType={"done"}
        ></TextInput>
        <TextInput
          style={style.dateInput}
          placeholder="MM"
          placeholderTextColor={"white"}
          keyboardType="number-pad"
          maxLength={2}
          returnKeyType={"done"}
        ></TextInput>
        <TextInput
          style={style.dateInput}
          placeholder="YYYY"
          placeholderTextColor={"white"}
          keyboardType="number-pad"
          maxLength={4}
          returnKeyType={"done"}
        ></TextInput>
      </View>
      <Picker
        selectedValue={selectedGender}
        onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
        mode="dropdown"
        style={style.dropdown}
      >
        <Picker.Item label="Choose Gender:" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <TextInput
        style={style.input}
        placeholder="Bike"
        placeholderTextColor={"white"}
      ></TextInput>
      <TouchableOpacity style={style.buttonContainer}>
        <Text style={style.buttonText}>CREATE</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1 },
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
    marginBottom: 10,
    marginRight: 10,
    textAlign: "center",
    color: "white",
    paddingHorizontal: 10,
  },
  dateBlock: {
    flexDirection: "row",
  },
  dropdown: {
    marginVertical: 10,
    width: 250,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#666",
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
