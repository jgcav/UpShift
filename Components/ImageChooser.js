import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageChooser({ profilePicture, setProfilePicture }) {
  const pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((result) => {
      console.log(result);
      if (!result.cancelled) {
        setProfilePicture(result.uri);
      }
    });
  };

  return (
    <View styles={styles.container}>
      <Button
        title="Pick an Image From Camera Roll +"
        onPress={pickImage}
        color="white"
      />
      {profilePicture && (
        <Image source={{ uri: profilePicture }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: 200, height: 200, margin: 10, alignSelf: "center" },
});
