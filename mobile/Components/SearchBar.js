import { useState } from "react";
import { View, TextInput } from "react-native";

export const SearchBar = ({ setSearchLocation, searchLocation }) => {
  const updateSearch = (searchLocation) => {
    setSearchLocation(searchLocation);
  };

  return (
    <View style={{ position: "absolute", top: 50, width: "100%" }}>
      <TextInput
        placeholder={"Search"}
        onChangeText={updateSearch}
        value={searchLocation}
        style={{
          borderRadius: 10,
          margin: 10,
          color: "#000",
          borderColor: "#666",
          backgroundColor: "#FFF",
          borderWidth: 1,
          height: 45,
          paddingHorizontal: 10,
          fontSize: 18,
        }}
        placeholderTextColor={"#666"}
      />
    </View>
  );
};
