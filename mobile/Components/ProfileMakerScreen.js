import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ProfileMakerScreen() {
  const [selectedGender, setSelectedGender] = useState("male");

  return (
    // <ScrollView>
    <View style={style.container}>
      <Text>ProfileScreen</Text>
      <TextInput
        style={style.input}
        placeholder="First Name"
        placeholderTextColor={"black"}
      ></TextInput>
      <TextInput
        style={style.input}
        placeholder="Last Name"
        placeholderTextColor={"black"}
      ></TextInput>
      <Text>Date of Birth</Text>
      <View style={style.dateBlock}>
        <TextInput
          style={style.dateInput}
          placeholder="DD"
          placeholderTextColor={"black"}
          keyboardType="number-pad"
          maxLength={2}
          returnKeyType={ "done" }
        ></TextInput>
        <TextInput
          style={style.dateInput}
          placeholder="MM"
          placeholderTextColor={"black"}
          keyboardType="number-pad"
          maxLength={2}
          returnKeyType={ "done" }
        ></TextInput>
        <TextInput
          style={style.dateInput}
          placeholder="YYYY"
          placeholderTextColor={"black"}
          keyboardType="number-pad"
          maxLength={4}
          returnKeyType={ "done" }
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
          placeholderTextColor={"black"}
        ></TextInput>
    </View>
  
  );
}

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "red",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
    paddingHorizontal: 10,
  },
  dateInput: {
    height: 40,
    width: 60,
    backgroundColor: "red",
    marginBottom: 20,
    marginRight: 10,
    textAlign: "center",
    color: "black",
    paddingHorizontal: 10,
  },
  dateBlock: {
    flexDirection: "row",
  },
  dropdown: {
    marginVertical: 30,
    width: 250,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#666",
  },
});
