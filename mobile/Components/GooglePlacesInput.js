import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const axios = require("axios");
const key = "AIzaSyB9qaNzvpNBy-fFRSdbm7FEUHgkVEhvmvw";

const GooglePlacesInput = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isShowing, setIsShowing] = useState(false);

  const searchLocation = async (text) => {
    setSearchKeyword({ searchKeyword: text });
    axios
      .request({
        method: "get",
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchKeyword}&types=geocode&key=${key}`,
      })
      .then((response) => {
        console.log(response.data.predictions);
        setSearchResults(response.data.predictions);
        setIsShowing(true);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <TextInput
          placeholder="Search"
          returnKeyType="search"
          style={styles.searchBox}
          placeholderTextColor="#000"
          onChangeText={(text) => searchLocation(text)}
          value={searchKeyword}
        />

        {isShowing && (
          <FlatList
            data={searchResults}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => {
                    setSearchKeyword(item.description);
                    setIsShowing(false);
                  }}
                >
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
            style={styles.searchResultsContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default GooglePlacesInput;

const styles = StyleSheet.create({
  autocompleteContainer: {
    zIndex: 1,
  },

  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
  },

  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft: 15,
  },

  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: "#aaa",
    color: "#000",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    paddingLeft: 15,
  },

  container: {
    flex: 1,
    alignItems: "center",
  },
});
