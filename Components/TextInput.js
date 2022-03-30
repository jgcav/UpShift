import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";


export default function TextInput({ ...props }) {
  return (
      
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor="#2f4f4f"
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
